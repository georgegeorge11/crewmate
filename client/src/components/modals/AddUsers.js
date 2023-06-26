import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Dropdown, Modal } from 'semantic-ui-react';
import { addUsersToProject } from '../../actions/functions';

const AddUsers = ({ users, open, handleAddUserClose, projectId, getProjects }) => {
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



    const handleModalConfirm = async () => {
        await addUsersToProject(projectId, selectedUsers, token, getProjects);
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
