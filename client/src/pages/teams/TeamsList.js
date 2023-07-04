import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Header, List } from 'semantic-ui-react';
import { cardStyle } from '../../components/cardStyle';
import { useNavigate } from 'react-router-dom';
import { setTeam } from '../../actions';



const TeamList = () => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateToTeam = (teamId) => {
        navigate(`/viewTeam/${teamId}`);
        dispatch(setTeam({ teamId: teamId }));
    };

    const getTeams = async () => {

        axios({
            method: "GET",
            url: `http://localhost:5000/teams/userTeam/${user._id}`,
            headers: { Authorization: `Bearer ${token}` }
        }
        ).then((response) => {

            setTeams(response.data);
        }).catch((err) => console.log(err));
    }
    useEffect(() => {
        getTeams();
        // eslint-disable-next-line
    }, []);

    const renderTeams = () => {
        if (teams.length) {
            return teams.map(team =>
                <List.Item key={team._id}>
                    <List.Icon name='group' size='large' verticalAlign='middle' />
                    <List.Content>
                        <span onClick={() => navigateToTeam(team._id)} style={{ cursor: 'pointer' }}>
                            <List.Header> {team.name}</List.Header>
                        </span>

                    </List.Content>
                </List.Item>

            )
        }

    }

    return (
        <Card style={cardStyle}>
            <Card.Content>
                <Card.Header><Header as='h1'>Your Teams</Header></Card.Header>
                <Card.Meta>Teams</Card.Meta>

                <List divided relaxed style={{ overflowY: 'scroll', height: '150px' }}>
                    {renderTeams()}
                </List>
            </Card.Content>
        </Card>
    )
}

export default TeamList;