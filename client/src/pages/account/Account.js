import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Grid, Header, Icon, Input } from 'semantic-ui-react';
import { updateUser } from '../../actions/functions';
import { ToastContainer } from 'react-toastify';
import { setLogin, setUser } from '../../actions';
const Account = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [fullName, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            setFullname(user.fullName);
            setUsername(user.username);
            setEmail(user.email);
            setPassword(user.password)
            setRole(user.role);
        }
    }, [user]);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(user, fullName, username, password, email, role, token, dispatch, setLogin);
    };

    return (
        <Grid centered>
            <Grid.Column mobile={16} tablet={10} computer={6} style={{ marginTop: '4rem' }}>
                <Header textAlign="center" size="huge">
                    Account Information
                </Header>
                <Form onSubmit={handleSubmit} style={{ marginTop: '4rem' }}>
                    <Form.Field>
                        <label style={{ fontSize: '30px', marginBottom: '1.5rem' }}>Name</label>
                        <Input
                            type="text"
                            name="name"
                            value={fullName}
                            onChange={(e) => setFullname(e.target.value)}
                            size="huge"
                            fluid
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ fontSize: '30px', marginBottom: '1.5rem' }}>Username</label>
                        <Input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            size="huge"
                            fluid
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ fontSize: '30px', marginBottom: '1.5rem' }}>Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="huge"
                            fluid
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ fontSize: '30px', marginBottom: '1.5rem' }}>Password</label>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="huge"
                            fluid
                            icon={
                                <Icon
                                    name={showPassword ? 'eye slash' : 'eye'}
                                    link
                                    onClick={handleTogglePassword}
                                />
                            }
                        />
                    </Form.Field>
                    <Button primary fluid size="huge" type="submit" >
                        <Header style={{ color: "white" }}>Save</Header>
                    </Button>
                </Form>
                <ToastContainer />
            </Grid.Column>
        </Grid>
    );
};

export default Account;
