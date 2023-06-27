import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { deleteProject } from '../../actions/functions';

const DeleteProject = ({ open, close, getProjects, projectSelected }) => {
    const token = useSelector((state) => state.token);
    const handleDelete = async (e) => {
        e.preventDefault();
        await deleteProject(token, projectSelected, close, getProjects);

    }

    return (
        <Modal open={open} onClose={close} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Delete Project</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete the project <b>{projectSelected && projectSelected.name}</b>?</p>
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

export default DeleteProject