import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Card, Container, Grid, Header, Icon, Segment, Tab } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';


const ViewProject = () => {
    const user = useSelector((state) => state.user);
    const [project, setProject] = useState({});
    const token = useSelector((state) => state.token);
    const projectID = useSelector((state) => state.project);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const getProject = async () => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/projects/project/${projectID}`,
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setProject(response.data);
        })
            .catch((err) => console.log(err));
    }
    const getProjectTasks = async () => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/tasks/projectTasks/${projectID}`,
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setTasks(response.data);
        })
            .catch((err) => console.log(err));
    }
    const getUsers = async () => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/users`,
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setUsers(response.data);
        })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getProject();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getProjectTasks();
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, []);


    const renderProject = () => {
        if (!project) {
            return <div>Loading...</div>
        }
        return (
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            <Header as='h1'>
                                {project.name}
                            </Header></Card.Header>
                        <Card.Description>
                            {project.description}
                        </Card.Description>

                    </Card.Content>
                </Card>
            </Card.Group>
        )
    }

    const renderProjectTasks = () => {
        if (!tasks) {
            return <div>{ }</div>
        }
        const panes = tasks.map(task => {

            return {
                menuItem: task.title, render: () => {
                    return <Tab.Pane>
                        <Container>
                            <Grid>
                                <Grid.Row style={{ marginTop: '1em' }}>
                                    <Grid.Column>
                                        <Header as='h1'>
                                            <Icon name='tasks' />
                                            <Header.Content>{task.title}</Header.Content>

                                        </Header>
                                        <Header as='h3' color='grey'>
                                            {task.description}
                                        </Header>
                                        <Header as='h4' color='grey'>
                                            Status: {task.status}
                                        </Header>
                                        <Header as='h4' color='grey'>
                                            Priority: {task.priority}
                                        </Header>
                                        <Header as='h4' color='grey'>
                                            Assignee: {users.map((user) => user._id === task.assignee ? user.fullName : null)}
                                        </Header>
                                        <Card.Content extra style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>

                                            {task.assignee === user._id ? <div>
                                                <span
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <Icon name="edit" color="blue" size="big" />
                                                </span>

                                            </div> : null}
                                        </Card.Content>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Tab.Pane>
                }
            }
        })
        return <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
    }



    return (
        <Grid columns='equal' style={{ marginLeft: '9em', marginRight: '2em' }}>
            <Grid.Row style={{ display: 'flex', gap: '10px', marginTop: '2em' }}>
                <Grid.Column width={5}>
                    {renderProject()}
                </Grid.Column>
                {user.role === "manager" ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        size="large"
                        style={{ width: '250px' }}>
                        <Icon
                            name="add"
                            size="large" />
                        Add task
                    </Button>
                </div> : null}

            </Grid.Row>
            <Grid.Row stretched>
                <Grid.Column>
                    <Segment>
                        <Header as='h1'>Open Tasks</Header>
                        {renderProjectTasks()}
                        <ToastContainer />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default ViewProject;