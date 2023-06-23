import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Card, Header, List } from 'semantic-ui-react';
import { cardStyle } from '../../components/cardStyle';
import { Link } from 'react-router-dom';



const ProjectList = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [projects, setProjects] = useState([]);


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
                        <Link to={`/viewProject/${project._id}`}><List.Header>{project.name}</List.Header></Link>
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