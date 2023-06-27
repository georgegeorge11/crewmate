import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import { updateProject } from '../../actions/functions';

const EditProject = ({ open, close, getProjects, projectSelected,teamSelected }) => {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    useEffect(() => {
        if (projectSelected) {

            setName(projectSelected.name);
            setDescription(projectSelected.description);
            setStartDate(formatDate(projectSelected.startDate));
            setEndDate(formatDate(projectSelected.endDate));
        }
    }, [projectSelected]);


    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateProject(name, description, startDate, endDate, user,teamSelected, projectSelected, token, close, getProjects);
    }
    return (
        <Modal open={open} onClose={close} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Edit Project</Modal.Header>
            <Modal.Content>
                {projectSelected && (
                    <Form onSubmit={handleUpdate}>
                        <div className="form">
                            <Input
                                size="large"
                                type="text"
                                value={name}
                                placeholder="Title"
                                style={{ width: '100%' }}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.TextArea
                                rows={3}
                                value={description}
                                placeholder="Description"
                                style={{ width: '100%' }}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Input
                                size="large"
                                type="date"
                                value={startDate}
                                placeholder="Start Date"
                                style={{ width: '100%' }}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <Input
                                size="large"
                                type="date"
                                value={endDate}
                                placeholder="End Date"
                                style={{ width: '100%' }}
                                onChange={(e) => setEndDate(e.target.value)}
                            />

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="submit" primary size="large">
                                Update
                            </Button>
                            <Button color="red" size="large" onClick={close}>
                                Close
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Content>
        </Modal>
    )
}

export default EditProject