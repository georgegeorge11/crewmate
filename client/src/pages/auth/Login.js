import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Input } from 'semantic-ui-react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { setLogin } from '../../actions';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = async (username, password) => {
        axios
            .post("http://localhost:5000/login", {
                username: username,
                password: password,
            })
            .then((response) => {
                const loggedInResponse = response.data;

                if (loggedInResponse) {
                    dispatch(
                        setLogin({
                            user: loggedInResponse.user,
                            token: loggedInResponse.token,
                            userId: loggedInResponse.user._id
                        })
                    );
                    toast.success('Login succesfully !', {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    setTimeout(() => navigate("/dashboard"), 1000)
                }


            })
            .catch((error) => {
                console.log(error);
                toast.error('Password or username are incorrect!')
            });
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        await login(username, password);

    }

    return (
        <div className='login-form'>
            <Grid centered
                verticalAlign='middle'
                columns={1}
                style={{ height: '90%' }}
            >
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 400 }}>
                        <Header as='h1' color='black' textAlign='center'>
                            {' '}Crewmate
                        </Header>
                        <Form onSubmit={handleLogin}>
                            <Header as='h3' color='blue' textAlign='center'>
                                {' '}Welcome Back
                            </Header>
                            <div className='form'>
                                <Input
                                    size='large'
                                    type='text'
                                    name={username}
                                    icon='user'
                                    iconPosition='left' placeholder='Username' onChange={(e) => setUsername(e.target.value)} style={{ width: '100%' }} />
                                <Input
                                    size='large'
                                    type='password'
                                    name={password}
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password' onChange={(e) => setPassword(e.target.value)} style={{ width: '100%' }} />
                            </div>
                            <Button
                                type="submit"
                                primary
                                fluid
                                size='large'>Login</Button>

                            <Header as='h4'> Don't have an account? <Link to='/register'>Register here</Link></Header>
                        </Form>
                        <ToastContainer />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default Login