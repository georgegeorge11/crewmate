import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Card, Header, Icon } from 'semantic-ui-react';


const UserCards = () => {
    const token = useSelector((state) => state.token);
    const [usersNumber, setUsersNumber] = useState(0);
    const getUsers = async () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/users",
            headers: { Authorization: `Bearer ${token}` }
        }
        ).then((response) => {
            setUsersNumber(response.data.length);
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, []);
    return (
        <Card style={{ width: 'auto' }}>
            <Card.Content>
                <Card.Header as='h1' textAlign='center'>No. of Users</Card.Header>
                <Header as='h1' textAlign='center' >{usersNumber} <Icon name='user' /></Header>
            </Card.Content>
        </Card>
    )
}

export default UserCards;