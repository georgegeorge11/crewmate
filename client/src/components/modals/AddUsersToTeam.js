import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Dropdown, Modal } from 'semantic-ui-react';
import { addUsersToTeam } from '../../actions/functions';
import axios from 'axios';

const AddUsersToTeam = ({ open, close, teamId, getTeam }) => {
    const token = useSelector((state) => state.token);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);

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
    const userOptions = users.map((user) => ({
        key: user._id,
        text: user.fullName,
        value: user._id,
    }));

    const handleDropdownChange = (event, data) => {
        setSelectedUsers(data.value);
    };

    const handleModalConfirm = async () => {
        await addUsersToTeam(teamId, selectedUsers, token, getTeam);
        close();
    };

    return (
        <Modal open={open} onClose={close} style={{ width: '400px', height: 'auto' }}>
            <Modal.Header style={{ textAlign: 'center', fontSize: '34px' }}>Add Users</Modal.Header>
            <Modal.Content style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <h2>Members:</h2>{' '}
                <Dropdown
                    placeholder="Add users"
                    fluid
                    multiple
                    search
                    selection
                    options={userOptions}
                    value={selectedUsers}
                    onChange={handleDropdownChange}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={close}>
                    Cancel
                </Button>
                <Button positive icon="checkmark" labelPosition="right" content="Confirm" onClick={handleModalConfirm} />
            </Modal.Actions>
        </Modal>
    );
}

export default AddUsersToTeam