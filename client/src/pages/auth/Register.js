import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Input } from 'semantic-ui-react'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const register = async (fullname, username, password) => {
        axios
            .post('http://localhost:5000/register', {
                fullName: fullname,
                username: username,
                password: password,
                email: email
            })
            .then((response) => {
                const savedUser = response.data;
                console.log(savedUser);
                toast.success('Register succesfully !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                setFullname('');
                setUsername('');
                setPassword('');
                setEmail('');
                setConfirmPassword('');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords does not match !', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            await register(fullname, username, password, email);
        }
    };
    return (
        <div className='login-form'>
            <Grid centered
                verticalAlign='middle'
                columns={1}
                style={{ height: '100%' }}
            >
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 400 }}>
                        <Header as='h1' color='black' textAlign='center'>
                            {' '}Crewmate
                        </Header>
                        <Form onSubmit={handleRegister} >
                            <Header as='h3' color='blue' textAlign='center'>
                                {' '}Create account
                            </Header>
                            <div className='form' >
                                <Input
                                    size='large'
                                    type='text'
                                    name={fullname}
                                    icon='user'
                                    iconPosition='left'
                                    color='black'
                                    placeholder='Fullname'
                                    onChange={(e) => setFullname(e.target.value)} style={{ width: '100%' }} />
                                <Input
                                    size='large'
                                    type='text'
                                    name={username}
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    onChange={(e) => setUsername(e.target.value)} style={{ width: '100%' }} />
                                <Input
                                    size='large'
                                    type='email'
                                    name={email}
                                    icon='at'
                                    iconPosition='left'
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} />
                                <Input
                                    size='large'
                                    type='password'
                                    name={password}
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)} style={{ width: '100%' }} />
                                <Input
                                    size='large'
                                    type='password'
                                    name={confirmPassword}
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirm Password'
                                    onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%' }} />
                            </div>
                            <Button
                                type="submit"
                                primary
                                fluid
                                size='large'>Register</Button>
                            <ToastContainer />
                            <Header as='h4'> Already have an account? <Link to='/login'>Login here</Link></Header>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Register