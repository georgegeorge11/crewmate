import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { removeUserFromTeam } from '../../actions/functions';

const RemoveUserFromTeam = ({ open, close, getTeams, userId, teamId }) => {
    const token = useSelector((state) => state.token);
    const handleRemove = async (e) => {
        e.preventDefault();
        await removeUserFromTeam(userId, teamId, token, close, getTeams);
    }
    return (
        <Modal open={open} onClose={close} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Remove user</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to remove the user <b>{userId && userId.fullName}</b> from the team?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={close}>
                    <Icon name="remove" /> No
                </Button>
                <Button color="green"
                    onClick={handleRemove}
                >
                    <Icon name="checkmark" /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default RemoveUserFromTeam