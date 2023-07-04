import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Card, Grid, Header, Icon, Label } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProjectsCard from '../projects/ProjectsCard';
import AddProject from '../../components/modals/AddProject';
import AddUsersToTeam from '../../components/modals/AddUsersToTeam';
import RemoveUserFromTeam from '../../components/modals/RemoveUserFromTeam';
const ViewTeam = () => {
    const token = useSelector((state) => state.token);
    const teamId = useSelector((state) => state.team);
    const user = useSelector((state) => state.user);
    const [team, setTeam] = useState([]);
    const [projects, setProjects] = useState([]);
    const [addProject, setAddProject] = useState(false);
    const [users, setUsers] = useState(false);
    const [teamID, setTeamID] = useState(null);
    const [userID, setUserID] = useState(null);
    const [addUser, setAddUser] = useState(false);
    const [removeUser, setRemoveUser] = useState(false);

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

    useEffect(() => {
        getTeam();
        // eslint-disable-next-line
    }, []);
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

    const handleAddUser = (team) => {
        setAddUser(true);
        setTeamID(team);
    }
    const handleAddUserClose = () => {
        setAddUser(false);
        setTeamID(null);
    }
    const handleRemoveUser = (employee, team) => {
        setTeamID(team);
        setUserID(employee);
        setRemoveUser(true);
    }
    const handleRemoveUserClose = () => {
        setTeamID(null);
        setUserID(null);
        setRemoveUser(false);
    }

    useEffect(() => {
        getProjects();
        // eslint-disable-next-line
    }, []);




    const renderTeam = () => {
        if (!team) {
            return <div>Loading...</div>
        }
        return (

            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Header as='h1'>
                            {team.name}
                        </Header></Card.Header>
                    <Card.Description>
                        {team.description}
                    </Card.Description>
                    <Card.Description>
                        Members:  {renderTeamMembers()}

                        {user.role === 'manager' && <Label size="large" style={{ marginRight: '10px', marginLeft: '10px', cursor: 'pointer' }}
                            onClick={() => handleAddUser(team._id)}
                        >
                            <Icon name="add user" />
                        </Label>}
                        <AddUsersToTeam
                            open={addUser}
                            close={handleAddUserClose}
                            getTeam={getTeam}
                            teamId={teamID}
                        />
                        <RemoveUserFromTeam
                            open={removeUser}
                            close={handleRemoveUserClose}
                            getTeams={getTeam}
                            userId={userID}
                            teamId={teamID}
                        />
                    </Card.Description>
                </Card.Content>
            </Card>

        )
    }
    const renderTeamMembers = () => {
        if (!team || !team.members) {
            return <div>Loading...</div>;
        }
        return team.members.map((member) => {
            const employee = users.find((employee) => employee._id === member._id);
            return (
                employee && (
                    <Label key={employee._id} size="large" style={{ margin: '5px' }}>
                        {employee.fullName}
                        {user.role === 'manager' && <span style={{ cursor: 'pointer' }}
                            onClick={() => handleRemoveUser(employee, team._id)}
                        >
                            <Icon name="delete" />
                        </span>}
                    </Label>

                )
            );
        })
    };

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
                {user.role === "manager" &&
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
                }
                <AddProject
                    open={addProject}
                    handleClose={handleAddClose}
                    getProjects={getProjects} />

            </Grid.Row>

            <Grid.Row stretched>
                <Grid.Column>
                    <Header as='h1'>Projects</Header>
                    <ProjectsCard
                        teamSelected={team}
                        projects={projects}
                        getProjects={getProjects} />
                    <ToastContainer />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default ViewTeam;