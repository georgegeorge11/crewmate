import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Card, Grid, Header, Icon } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import ProjectTasks from '../tasks/ProjectTasks';
import AddTask from '../../components/modals/AddTask';


const ViewProject = () => {
    const user = useSelector((state) => state.user);
    const [project, setProject] = useState({});
    const token = useSelector((state) => state.token);
    const [tasks, setTasks] = useState([]);
    const projectID = useSelector((state) => state.project);
    const [addTask, setAddTask] = useState(false);
    const getProject = async () => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/projects/project/${projectID}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setProject(response.data);
            })
            .catch((err) => console.log(err));
    };
    const getProjectTasks = async () => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/tasks/projectTasks/${projectID}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setTasks(response.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getProject();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getProjectTasks();
        // eslint-disable-next-line
    }, []);

    const handleTaskOpen = () => {
        setAddTask(true);
    };

    const handleTaskClose = () => {
        setAddTask(false);
    };
    console.log(project);

    const renderProject = () => {
        if (!project) {
            return <div>Loading...</div>;
        }
        return (
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            <Header as='h1'>{project.name}</Header>
                        </Card.Header>
                        <Card.Description>{project.description}</Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        );
    };

    return (
        <Grid columns='equal' style={{ marginLeft: '9em', marginRight: '2em' }}>
            <Grid.Row style={{ display: 'flex', gap: '10px', marginTop: '2em' }}>
                <Grid.Column width={5}>{renderProject()}</Grid.Column>
                {user.role === 'manager' && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size='large' style={{ width: '250px' }} onClick={handleTaskOpen}>
                            <Icon name='add' size='large' />
                            Add task
                        </Button>
                    </div>
                )}
                <AddTask open={addTask} close={handleTaskClose} getTasks={getProjectTasks} projectId={projectID} />
            </Grid.Row>
            <Grid.Row stretched>
                <Grid.Column>
                 
                    <Header as='h1' textAlign='center'>Tasks</Header>
                    <ProjectTasks tasks={tasks}
                        getTasks={getProjectTasks}
                        project={project}
                    />
                    <ToastContainer />
                   
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default ViewProject;
