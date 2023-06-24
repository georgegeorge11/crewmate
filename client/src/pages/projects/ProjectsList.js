import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Header, List } from 'semantic-ui-react';
import { cardStyle } from '../../components/cardStyle';
import { Link, useNavigate } from 'react-router-dom';
import { setProject } from '../../actions';



const ProjectList = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigateToProject = (projectId) => {
        navigate(`/viewProject/${projectId}`);
        dispatch(setProject({ projectId: projectId }));
    };
    const getTasks = async () => {

        axios({
            method: "GET",
            url: `http://localhost:5000/projects/userProject/${user._id}`,
            headers: { Authorization: `Bearer ${token}` }
        }
        ).then((response) => {

            setProjects(response.data);
        }).catch((err) => console.log(err));
    }
    useEffect(() => {
        getTasks();
        // eslint-disable-next-line
    }, []);

    const renderTeams = () => {
        if (projects.length) {
            return projects.map(project =>
                <List.Item key={project._id}>
                    <List.Icon name='folder open' size='large' verticalAlign='middle' />
                    <List.Content>
                        <span onClick={() => navigateToProject(project._id)} style={{ cursor: 'pointer' }}>
                       {project.name}
                    </span>
                        {/* <List.Description as='a'>{team.description}</List.Description> */}
                    </List.Content>
                </List.Item>

            )
        }

    }

    return (
        <Card style={cardStyle}>
            <Card.Content>
                <Card.Header><Header as='h1'>Your Projects</Header></Card.Header>
                <Card.Meta>Projects</Card.Meta>

                <List divided relaxed style={{ overflowY: 'scroll', height: '150px' }}>
                    {renderTeams()}
                </List>
            </Card.Content>
        </Card>
    )
}

export default ProjectList;