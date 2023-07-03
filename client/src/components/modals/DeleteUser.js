import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { deleteUser } from '../../actions/functions';

const DeleteUser = ({ open, close, getUsers, user }) => {
    const token = useSelector((state) => state.token);
    const handleDelete = async (e) => {
        e.preventDefault();
        await deleteUser(user, token, getUsers, close);

    }
    return (
        <Modal open={open} onClose={close} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Delete User</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete the user <b>{user && user.fullName}</b>?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={close}>
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

export default DeleteUser