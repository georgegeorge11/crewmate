import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Card, Header, Icon } from 'semantic-ui-react';


const TeamCards = () => {
    const token = useSelector((state) => state.token);
    const [teamsNumber, setTeamsNumber] = useState(0);
    const getTeams = async () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/teams",
            headers: { Authorization: `Bearer ${token}` }
        }
        ).then((response) => {
            setTeamsNumber(response.data.length);
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        getTeams();
        // eslint-disable-next-line
    }, []);
    return (
        <Card style={{ width: '300px' }}>
            <Card.Content>
                <Card.Header as='h1' textAlign='center'>No. of Teams</Card.Header>
                <Header as='h1' textAlign='center'>{teamsNumber}    <Icon name='group' /></Header>
            </Card.Content>
        </Card>
    )
}

export default TeamCards;