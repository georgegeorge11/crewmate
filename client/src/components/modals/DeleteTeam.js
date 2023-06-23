import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react'

const DeleteTeam = ({ open, handleDeleteClose, getTeams, teamSelected }) => {
    const token = useSelector((state) => state.token);
    const deleteTeam = async () => {
        if (teamSelected) {
            axios({
                method: 'DELETE',
                url: `http://localhost:5000/teams/team/${teamSelected._id}`,
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                toast.success('Team deleted successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                handleDeleteClose();
                getTeams();
            })
                .catch((err) => console.log(err));
        }
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
                    onClick={deleteTeam}
                >
                    <Icon name="checkmark" /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteTeam