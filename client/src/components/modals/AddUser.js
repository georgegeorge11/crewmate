import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Dropdown, Form, Icon, Input, Modal } from 'semantic-ui-react';
import { createUser } from '../../actions/functions';

const AddUser = ({ open, close, getUsers }) => {
    const token = useSelector((state) => state.token);
    const [fullName, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const roleOptions = [
        { key: 'admin', text: 'Admin', value: 'admin' },
        { key: 'manager', text: 'Manager', value: 'manager' },
        { key: 'user', text: 'Employee', value: 'employee' },
    ];
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleCreate = async (e) => {
        e.preventDefault();
        await createUser(fullName, username, email, password, role, token, getUsers, close);
    }
    return (
        <Modal open={open} onClose={close} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Add User</Modal.Header>
            <Modal.Content>

                <Form onSubmit={handleCreate}>
                    <div className="form">
                        <Input
                            size="large"
                            fluid
                            type="text"
                            name={fullName}
                            placeholder="Full Name"
                            style={{ width: '100%' }}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                        <Input
                            size="large"
                            fluid
                            type="text"
                            name={username}
                            placeholder="Username"
                            style={{ width: '100%' }}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            size="large"
                            type="email"
                            name={email}
                            fluid
                            placeholder="Email"
                            style={{ width: '100%' }}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Form.Field>

                            <Dropdown
                                fluid
                                selection
                                name={role}
                                options={roleOptions}
                                placeholder='Select Role'
                                onChange={(e, { value }) => setRole(value)}
                            />
                        </Form.Field>
                        <Input
                            size="large"
                            type={showPassword ? 'text' : 'password'}
                            name={password}
                            placeholder="Password"
                            style={{ width: '100%' }}
                            onChange={(e) => setPassword(e.target.value)}
                            fluid
                            icon={
                                <Icon
                                    name={showPassword ? 'eye slash' : 'eye'}
                                    link
                                    onClick={handleTogglePassword}
                                />
                            }
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="submit" primary size="large">
                            Create
                        </Button>
                        <Button color="red" size="large" onClick={close}>
                            Close
                        </Button>
                    </div>

                </Form>

            </Modal.Content>
        </Modal>
    )
}

export default AddUser