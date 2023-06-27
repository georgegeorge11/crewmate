import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { deleteTask } from '../../actions/functions';

const DeleteTask = ({ open, close, task, getTasks }) => {
    const token = useSelector((state) => state.token);
    const handleDelete = async (e) => {
        e.preventDefault();
        await deleteTask(task, getTasks, token, close);

    }
    return (
        <Modal open={open} onClose={close} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Delete Team</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete the task <b>{task && task.title}</b>?</p>
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

export default DeleteTask