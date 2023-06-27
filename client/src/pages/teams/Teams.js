import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Grid, Header, Icon, Input } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.css';
import AddTeam from '../../components/modals/AddTeam';
import { ToastContainer } from 'react-toastify';
import TeamsCard from './TeamsCard';


const Teams = () => {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const [teams, setTeams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [addModal, setAddModal] = useState(false);

    const handleOpen = () => {
        setAddModal(true);
    }
    const handleClose = () => {
        setAddModal(false);
        getTeams();
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

    return (
        <Grid style={{ marginLeft: '9em' }}>
            <Grid.Row style={{ marginLeft: '1em', marginTop: '3em' }}>
                <div style={{ display: 'flex', gap: '100px' }}>
                    <Header as="h1">Teams</Header>
                    <Input
                        placeholder="Search by team name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>
            </Grid.Row>
            {user.role === "manager" &&
                <div style={{
                    height: '150px', margin: '15px 0', display: 'flex', justifyContent: 'center'
                }}>
                    <Button size="large"
                        onClick={handleOpen}
                        style={{ width: '300px' }}>
                        <Icon
                            name="add"
                            size="large" />
                        Create Team
                    </Button>
                </div>
            }
            <AddTeam
                open={addModal}
                handleClose={handleClose}
                getTeams={getTeams}
            />
            <TeamsCard
                teams={teams}
                getTeams={getTeams}
                searchTerm={searchTerm} />
            <ToastContainer />
        </Grid>
    );
};

export default Teams;
