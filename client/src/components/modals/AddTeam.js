import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Form, Input, Modal } from 'semantic-ui-react'

const AddTeam = ({ open, handleClose, getTeams }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const createTeam = async (name, description) => {
        axios
            .post(
                'http://localhost:5000/teams/createTeam',
                {
                    name: name,
                    description: description,
                    leaderId: user._id,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                console.log(response.data);
                toast.success('Team created successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setName('');
                setDescription('');
                handleClose();
                getTeams();
            })
            .catch((err) => console.log(err));
    }

    const handleAddTeam = async (e) => {
        e.preventDefault();
        await createTeam(name, description);
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
                        onSubmit={handleAddTeam}
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

export default AddTeam;