import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Icon, Label } from 'semantic-ui-react';
import { setProject } from '../../actions';
import axios from 'axios';
import AddUsers from '../../components/modals/AddUsers';
import RemoveUser from '../../components/modals/RemoveUser';

const ProjectsCard = ({ projects }) => {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [userSelected, setUserSelected] = useState(null);
    const [projectSelected, setProjectSelected] = useState(null);
    const [projectUser, setProjectUser] = useState(null);
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
                        <Label size="large" style={{ marginRight: '10px', marginLeft: '10px', cursor: 'pointer' }} onClick={() => handleAddUser(project._id)} >
                            {user.role === 'manager' && <Icon name="add user" />}
                        </Label>
                        <AddUsers
                            users={users}
                            open={addModal}
                            handleAddUserClose={handleAddUserClose}
                            getUsers={getUsers}
                            projectId={projectUser}
                        />
                        <RemoveUser
                            open={removeModal}
                            handleRemoveClose={handleRemoveClose}
                            getUsers={getUsers}
                            userSelected={userSelected}
                            projectSelected={projectSelected} />

                    </Card.Header>
                    <Card.Header as="h2">Date Range : {formatDate(project.startDate)} - {formatDate(project.endDate)}</Card.Header>

                </Card.Content>
                <Card.Content extra style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <span onClick={() => navigateToProject(project._id)} style={{ cursor: 'pointer' }}>
                        <Icon name="eye" color="black" size="big" />
                    </span>
                    <span style={{ cursor: 'pointer' }}>
                        <Icon name="edit" color="blue" size="big" />
                    </span>
                    <span style={{ cursor: 'pointer' }}>
                        <Icon name="trash" color="red" size="big" />
                    </span>
                </Card.Content>
            </Card>
        ))}
    </div>)

}

export default ProjectsCard;