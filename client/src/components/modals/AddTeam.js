import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Form, Input, Modal } from 'semantic-ui-react'
import { createTeam } from '../../actions/functions'

const AddTeam = ({ open, handleClose, getTeams }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')


    const handleAddTeam = async (e) => {
        e.preventDefault();
        await createTeam(name, description, user, token, getTeams, handleClose);
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