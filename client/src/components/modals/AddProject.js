import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Form, Input, Modal } from 'semantic-ui-react';

const AddProject = ({ open, handleClose, getProjects }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const teamId = useSelector((state) => state.team);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());
    const createProject = async (name, description,startDate,endDate) => {
        axios
            .post(
                'http://localhost:5000/projects/createProject',
                {
                    name: name,
                    description: description,
                    teamId: teamId,
                    leaderId: user._id,
                    startDate: startDate,
                    endDate: endDate
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                console.log(response.data);
                toast.success('Project created successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setName('');
                setDescription('');
                setStartDate('');
                setEndDate('');
                handleClose();
                getProjects();
            })
            .catch((err) => console.log(err));
    }

    const handleAddProject = async (e) => {
        e.preventDefault();
        await createProject(name, description,startDate,endDate);
    }


    return (
        <Modal
            style={{ width: '500px', height: 'auto' }}
            open={open}
            onClose={handleClose}
        >
            <Modal.Header>
                Create new project
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form
                        onSubmit={handleAddProject}
                    >
                        <div className="form">
                            <Input
                                size="large"
                                type="text"
                                name={name}
                                placeholder="Title"
                                style={{ width: '100%' }}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                size="large"
                                type="text"
                                name={description}
                                placeholder="Description"
                                style={{ width: '100%' }}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Input
                                size="large"
                                type="date"
                                name={startDate}
                                placeholder="Start Date"
                                style={{ width: '100%' }}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <Input
                                size="large"
                                type="date"
                                name={endDate}
                                placeholder="End Date"
                                style={{ width: '100%' }}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="submit" primary size="large">
                                Create
                            </Button>

                            <Button color="red" size="large"
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                        </div>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default AddProject;