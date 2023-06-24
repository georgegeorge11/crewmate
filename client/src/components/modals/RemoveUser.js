import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';

const RemoveUser = ({ open, handleRemoveClose, getProjects, userSelected, projectSelected }) => {
    const token = useSelector((state) => state.token);

    const removeUserFromTeam = async () => {
        if (useSelector) {
            axios({
                method: 'DELETE',
                url: `http://localhost:5000/projects/project/${projectSelected._id}/members/${userSelected._id}`,
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                toast.success('User removed successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                handleRemoveClose();
                getProjects();
            })
                .catch((err) => console.log(err));
        }
    }
    return (
        <Modal open={open} onClose={handleRemoveClose} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Delete Team</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete the user {userSelected && userSelected.fullName}?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={handleRemoveClose}>
                    <Icon name="remove" /> No
                </Button>
                <Button color="green"
                    onClick={removeUserFromTeam}
                >
                    <Icon name="checkmark" /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default RemoveUser