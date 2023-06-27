import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import { updateTeam } from '../../actions/functions';

const EditTeam = ({ open, close, getTeams, teamSelected }) => {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (teamSelected) {
            setName(teamSelected.name);
            setDescription(teamSelected.description);
        }
    }, [teamSelected]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateTeam(name, description, token, teamSelected, getTeams, user, close);
    };

    return (
        <Modal open={open} onClose={close} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Edit Team</Modal.Header>
            <Modal.Content>
                {teamSelected && (
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
    );
};

export default EditTeam;
