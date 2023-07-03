import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Card, Header, Icon } from 'semantic-ui-react';

const ProjectCards = () => {
    const token = useSelector((state) => state.token);
    const [projectsNumber, setProjectsNumber] = useState(0);
    const getTeams = async () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/projects",
            headers: { Authorization: `Bearer ${token}` }
        }
        ).then((response) => {
            setProjectsNumber(response.data.length);
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        getTeams();
        // eslint-disable-next-line
    }, []);
    return (
        <Card style={{ width: '300px' }}>
            <Card.Content>
                <Card.Header as='h1' textAlign='center'>No. of Projects</Card.Header>
                <Header as='h1' textAlign='center'>{projectsNumber}    <Icon name='folder' /></Header>
            </Card.Content>
        </Card>
    )
}

export default ProjectCards;