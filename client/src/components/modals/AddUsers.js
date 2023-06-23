import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Dropdown, Modal } from 'semantic-ui-react';

const AddUsers = ({ users, open, handleAddUserClose, projectId, getUsers }) => {
    const token = useSelector((state) => state.token);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const userOptions = users.map((user) => ({
        key: user._id,
        text: user.fullName,
        value: user._id,
    }));

    const handleDropdownChange = (event, data) => {
        setSelectedUsers(data.value);
    };

    const addUsersToProject = async () => {
        try {
            const response = await axios.post(
                `http://localhost:5000/projects/project/${projectId}/members`,
                { memberIds: selectedUsers },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data);
            // Handle the response as needed
            getUsers();
        } catch (error) {
            console.log(error); // Handle the error as needed
        }
    };

    const handleModalConfirm = async () => {
        await addUsersToProject();
        handleAddUserClose();
    };

    return (
        <Modal open={open} onClose={handleAddUserClose} style={{ width: '400px', height: 'auto' }}>
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
                <Button color="black" onClick={handleAddUserClose}>
                    Cancel
                </Button>
                <Button positive icon="checkmark" labelPosition="right" content="Confirm" onClick={handleModalConfirm} />
            </Modal.Actions>
        </Modal>
    );
};

export default AddUsers;
