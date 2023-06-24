import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Card, Container, Grid, Header, Icon, Tab } from 'semantic-ui-react';

const ProjectTasks = ({ tasks }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [users, setUsers] = useState([]);
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
        getUsers();
        // eslint-disable-next-line
    }, []);

    if (!tasks) {
        return <div>{ }</div>
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });
        return formattedDate;
    };
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
                                    <Header as='h4' color='grey'>
                                        Due Date : {formatDate(task.dueDate)}
                                    </Header>
                                    <Card.Content extra style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>

                                        {task.assignee === user._id && <div>
                                            <span
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <Icon name="edit" color="blue" size="big" />
                                            </span>
                                        </div>}
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

export default ProjectTasks;