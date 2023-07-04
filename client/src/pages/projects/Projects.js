import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Grid, Header, Icon } from 'semantic-ui-react';
import { setProject } from '../../actions';
import 'react-toastify/dist/ReactToastify.css';


const Projects = () => {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateToProject = (projectId) => {
        navigate(`/viewProject/${projectId}`);
        dispatch(setProject({ projectId: projectId }));
    };

    const getProjects = async () => {
        if (user.role === "admin") {
            axios({
                method: "GET",
                url: `http://localhost:5000/projects`,
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    setProjects(response.data);
                })
                .catch((err) => console.log(err));
        } else {
            axios({
                method: "GET",
                url: `http://localhost:5000/projects/userProject/${user._id}`,
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    setProjects(response.data);
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        getProjects();
        // eslint-disable-next-line
    }, []);

    const renderProjects = () => {
        if (projects) {
            return projects.map((project) => (
                <Card key={project._id} style={{ margin: '15px', width: '300px', height: '150px' }}>
                    <Card.Content>
                        <Card.Header>{project.name}</Card.Header>
                        <Card.Description>{project.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <span onClick={() => navigateToProject(project._id)} style={{ cursor: 'pointer' }}>
                            <Icon name="eye" color="black" size="big" />
                        </span>
                        {user.role === "manager" && <div>
                            <span>
                                <Icon name="edit" color="blue" size="big" />
                            </span>
                            <span style={{ cursor: 'pointer' }} >
                                <Icon name="trash" color="red" size="big" />
                            </span>
                        </div>}
                    </Card.Content>
                </Card>
            ));
        }
    };

    return (
        <Grid style={{ marginLeft: '9em' }}>
            <Grid.Row style={{ marginLeft: '1em', marginTop: '3em' }}>
                <Header as="h1">Projects</Header>
            </Grid.Row>
            {renderProjects()}

        </Grid>
    );
};

export default Projects;
