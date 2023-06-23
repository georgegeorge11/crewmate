import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Card, Grid, Header, Icon } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProjectsCard from '../projects/ProjectsCard';
import AddProject from '../../components/modals/AddProject';
const ViewTeam = () => {
    const token = useSelector((state) => state.token);
    const teamId = useSelector((state) => state.team);
    const user = useSelector((state) => state.user);
    const [team, setTeam] = useState({});
    const [projects, setProjects] = useState([]);
    const [addProject, setAddProject] = useState(false);

    const getTeam = async () => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/teams/team/${teamId}`,
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setTeam(response.data);
        })
            .catch((err) => console.log(err));
    }

    const getProjects = async () => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/projects/teamProject/${teamId}`,
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setProjects(response.data);
        })
            .catch((err) => console.log(err));
    }
    const handleAddOpen = () => {
        setAddProject(true);

    }
    const handleAddClose = () => {
        setAddProject(false);
        getProjects();
    }
    useEffect(() => {
        getProjects();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getTeam();
        // eslint-disable-next-line
    }, []);


    const renderTeam = () => {
        if (!team) {
            return <div>Loading...</div>
        }
        return (
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            <Header as='h1'>
                                {team.name}
                            </Header></Card.Header>
                        <Card.Description>
                            {team.description}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        )
    }

    return (
        <Grid
            columns='equal'
            style={{
                marginLeft: '9em',
                marginRight: '2em'
            }}>
            <Grid.Row
                style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '2em'
                }}>
                <Grid.Column width={5}>
                    {renderTeam()}
                </Grid.Column>
                {user.role === "manager" ?
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                        <Button
                            size="large"
                            style={{ width: '250px' }}
                            onClick={handleAddOpen}
                        >
                            <Icon
                                name="add"
                                size="large" />
                            Add Project
                        </Button>
                    </div>
                    : null}
                <AddProject
                    open={addProject}
                    handleClose={handleAddClose}
                    getProjects={getProjects} />

            </Grid.Row>

            <Grid.Row stretched>
                <Grid.Column>
                    <Header as='h1'>Projects</Header>
                    <ProjectsCard
                        projects={projects} />
                    <ToastContainer />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default ViewTeam;