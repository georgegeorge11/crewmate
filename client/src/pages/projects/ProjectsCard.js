import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Icon, Label } from 'semantic-ui-react';
import { setProject } from '../../actions';
import axios from 'axios';

import RemoveUser from '../../components/modals/RemoveUser';
import AddUsersToProject from '../../components/modals/AddUsersToProject';
import DeleteProject from '../../components/modals/DeleteProject';
import EditProject from '../../components/modals/EditProject';

const ProjectsCard = ({ projects, getProjects, teamSelected }) => {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [userSelected, setUserSelected] = useState(null);
    const [projectSelected, setProjectSelected] = useState(null);
    const [projectUser, setProjectUser] = useState(null);
    const [deleteProject, setDeleteProject] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleRemoveOpen = (id, member) => {
        setUserSelected(id);
        setProjectSelected(member);
        setRemoveModal(true);
    }
    const handleRemoveClose = () => {
        setUserSelected(null);
        setRemoveModal(false);
        setProjectSelected(null);

    }

    const navigateToProject = (projectId) => {
        navigate(`/viewProject/${projectId}`);
        dispatch(setProject({ projectId: projectId }));
    };

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

    const handleAddUser = (id) => {
        setProjectUser(id);
        setAddModal(true);
    }
    const handleAddUserClose = () => {
        setAddModal(false);
        setProjectUser(null);
    }

    const handleDeleteProject = (project) => {
        setProjectSelected(project);
        setDeleteProject(true);
    }
    const handleDeleteProjectClose = () => {
        setProjectSelected(null);
        setDeleteProject(false);
    }
    const handleEditOpen = (id) => {
        setProjectSelected(id);
        setEditModal(true);
    }
    const handleEditClose = () => {
        setProjectSelected(null);
        setEditModal(false);
    }

    if (!projects) {
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
    return (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {projects.map((project) => (
            <Card key={project._id} style={{ margin: '15px', width: '400px' }}>
                <Card.Content>
                    <Card.Header as="h1">{project.name} / {project.description}</Card.Header>

                    <Card.Header as="h1" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        Members:
                        {project.members.map((member) => {
                            const employee = users.find((employee) => employee._id === member);
                            return (
                                employee && (
                                    <Label key={employee._id} size="large" style={{ margin: '5px' }}>
                                        {employee.fullName}
                                        {user.role === 'manager' && <span style={{ cursor: 'pointer' }}
                                            onClick={() => handleRemoveOpen(employee, project)}>
                                            <Icon name="delete" />
                                        </span>}
                                    </Label>
                                )
                            );
                        })}
                        {user.role === 'manager' && <Label size="large" style={{ marginRight: '10px', marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleAddUser(project._id)} >
                            <Icon name="add user" />
                        </Label>}


                        <AddUsersToProject
                            users={users}
                            open={addModal}
                            handleAddUserClose={handleAddUserClose}
                            getProjects={getProjects}
                            projectId={projectUser}
                        />
                        <RemoveUser
                            open={removeModal}
                            handleRemoveClose={handleRemoveClose}
                            getProjects={getProjects}
                            userSelected={userSelected}
                            projectSelected={projectSelected} />

                    </Card.Header>
                    <Card.Header as="h2">Date Range : {formatDate(project.startDate)} - {formatDate(project.endDate)}</Card.Header>

                </Card.Content>
                <Card.Content extra style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <span onClick={() => navigateToProject(project._id)} style={{ cursor: 'pointer' }}>
                        <Icon name="eye" color="black" size="big" />
                    </span>
                    {user.role === "manager" && <> <span style={{ cursor: 'pointer' }}
                        onClick={() => handleEditOpen(project)}
                    >
                        <Icon name="edit" color="blue" size="big" />
                    </span>
                        <span style={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteProject(project)}>
                            <Icon name="trash" color="red" size="big" />
                        </span></>}
                </Card.Content>
                <EditProject
                    open={editModal}
                    close={handleEditClose}
                    getProjects={getProjects}
                    projectSelected={projectSelected}
                    teamSelected={teamSelected}
                />
                <DeleteProject
                    open={deleteProject}
                    close={handleDeleteProjectClose}
                    getProjects={getProjects}
                    projectSelected={projectSelected}
                />
            </Card>
        ))}
    </div>)

}

export default ProjectsCard;