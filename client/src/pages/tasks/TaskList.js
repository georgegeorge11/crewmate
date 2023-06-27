import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Card, Header, List } from 'semantic-ui-react';
import { cardStyle } from '../../components/cardStyle';

const TasksList = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [tasks, setTasks] = useState([]);


    const getTasks = async () => {

        axios({
            method: "GET",
            url: `http://localhost:5000/tasks/userTask/${user._id}`,
            headers: { Authorization: `Bearer ${token}` }
        }
        ).then((response) => {

            setTasks(response.data);
        }).catch((err) => console.log(err));
    }
    useEffect(() => {
        getTasks();
        // eslint-disable-next-line
    }, []);

    const renderTasks = () => {
        if (tasks.length) {
            return tasks.map(task =>
                <List.Item key={task._id}>
                    <List.Icon name='tasks' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header>{task.title}</List.Header>
                        <List.Description >{task.description}</List.Description>
                    </List.Content>
                </List.Item>

            )
        }
        return <div>
            <h3>You currently do not have any issues assigned to you.</h3>
        </div>
    }

    return (
        <Card style={cardStyle}>
            <Card.Content>
                <Card.Header><Header as='h1'>Welcome back, {user.fullName} !</Header></Card.Header>
                <Card.Meta>Tasks</Card.Meta>
                <Card.Description>Tasks Assigned to you:</Card.Description>
                <List divided relaxed style={{ overflowY: 'scroll', height: '150px' }}>
                    {renderTasks()}
                </List>
            </Card.Content>
        </Card>
    )
}

export default TasksList