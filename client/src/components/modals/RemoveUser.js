
import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { removeUserFromProject } from '../../actions/functions';

const RemoveUser = ({ open, handleRemoveClose, getProjects, userSelected, projectSelected }) => {
    const token = useSelector((state) => state.token);

    const handleRemove = async (e) => {
        e.preventDefault();
        await removeUserFromProject(userSelected, projectSelected, token, handleRemoveClose, getProjects);
    }
    return (
        <Modal open={open} onClose={handleRemoveClose} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Remove user</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete the user {userSelected && userSelected.fullName}?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={handleRemoveClose}>
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

export default RemoveUser