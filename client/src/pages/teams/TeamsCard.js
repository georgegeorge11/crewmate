import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';
import { setTeam } from '../../actions';
import DeleteTeam from '../../components/modals/DeleteTeam'

const TeamsCard = ({ teams, searchTerm, getTeams }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleteModal, setDeleteModal] = useState(false);
    const [teamSelected, setTeamSelected] = useState(null);
    const handleDeleteOpen = (id) => {
        setTeamSelected(id);
        setDeleteModal(true);
    }
    const handleDeleteClose = () => {
        setDeleteModal(false);
        setTeamSelected(null);
    }

    const navigateToTeam = (teamId) => {
        navigate(`/viewTeam/${teamId}`);
        dispatch(setTeam({ teamId: teamId }));
    };

    if (teams) {
        const filteredTeams = teams.filter((team) =>
            team.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filteredTeams.map((team) => (
            <Card key={team._id} style={{ margin: '15px', width: '300px', height: '150px' }}>
                <Card.Content>
                    <Card.Header>{team.name}</Card.Header>
                    <Card.Description>{team.description}</Card.Description>
                </Card.Content>
                <Card.Content extra style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
                    <span onClick={() => navigateToTeam(team._id)} style={{ cursor: 'pointer' }}>
                        <Icon name="eye" color="black" size="big" />
                    </span>
                    {user.role === "manager" ? (<div>
                        <span style={{ cursor: 'pointer' }}
                        >
                            <Icon name="edit" color="blue" size="big" />
                        </span>

                        <span style={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteOpen(team)}
                        >
                            <Icon name="trash" color="red" size="big" />
                        </span>
                    </div>) : null}
                </Card.Content>
                <DeleteTeam
                    open={deleteModal}
                    handleDeleteClose={handleDeleteClose}
                    getTeams={getTeams}
                    teamSelected={teamSelected}
                />
            </Card>
        ));
    }
}

export default TeamsCard;