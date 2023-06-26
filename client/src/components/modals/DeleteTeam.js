import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react'
import { deleteTeam } from '../../actions/functions';

const DeleteTeam = ({ open, handleDeleteClose, getTeams, teamSelected }) => {
    const token = useSelector((state) => state.token);
    const handleDelete = async (e) => {
        e.preventDefault();
        await deleteTeam(teamSelected, token, handleDeleteClose, getTeams)

    }
    return (
        <Modal open={open} onClose={handleDeleteClose} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Delete Team</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete the team {teamSelected && teamSelected.name}?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={handleDeleteClose}>
                    <Icon name="remove" /> No
                </Button>
                <Button color="green"
                    onClick={handleDelete}
                >
                    <Icon name="checkmark" /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteTeam