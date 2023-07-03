import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Dropdown, Form, Input, Modal } from 'semantic-ui-react';
import { updateUser } from '../../actions/functions';


const EditUser = ({ open, close, getUsers, user }) => {
    const token = useSelector((state) => state.token);
    const [fullName, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    useEffect(() => {
        if (user) {
            setFullname(user.fullName);
            setUsername(user.username);
            setEmail(user.email);
            setPassword(user.password)
            setRole(user.role);
        }
    }, [user]);
    const roleOptions = [
        { key: 'admin', text: 'Admin', value: 'admin' },
        { key: 'manager', text: 'Manager', value: 'manager' },
        { key: 'user', text: 'Employee', value: 'employee' },
    ];
    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateUser(user, fullName, username, password, email, role, token, getUsers, close);
    }
    return (
        <Modal open={open} onClose={close} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Edit User Information</Modal.Header>
            <Modal.Content>
                {user && (
                    <Form onSubmit={handleUpdate}>
                        <div className="form">
                            <Input
                                size="large"
                                type="text"
                                value={fullName}
                                placeholder="Full Name"
                                style={{ width: '100%' }}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                            <Input
                                size="large"
                                type="text"
                                value={username}
                                placeholder="Username"
                                style={{ width: '100%' }}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Input
                                size="large"
                                type="email"
                                value={email}
                                placeholder="Email"
                                style={{ width: '100%' }}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Form.Field>

                                <Dropdown
                                    fluid
                                    selection
                                    options={roleOptions}
                                    value={role}
                                    onChange={(e, { value }) => setRole(value)}
                                />
                            </Form.Field>
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

export default EditUser