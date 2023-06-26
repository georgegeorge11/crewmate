import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Dropdown, Pagination, Button, Icon, Header, Grid } from 'semantic-ui-react';

const ManageUsers = () => {
    const token = useSelector((state) => state.token);
    const [users, setUsers] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;


    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { data } = response;
            setUsers(data);
            setTotalPages(Math.ceil(data.length / itemsPerPage));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, []);

    const roleOptions = [
        { key: 'admin', text: 'Admin', value: 'admin' },
        { key: 'manager', text: 'Manager', value: 'manager' },
        { key: 'user', text: 'Employee', value: 'employee' },
    ];

    const handleRoleChange = (userId, role) => {
        // Implement your logic to update the user role
        console.log(`User ${userId} role changed to ${role}`);
    };

    const handlePageChange = (event, { activePage }) => {
        setActivePage(activePage);
    };

    const getUsersForPage = () => {
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return users.slice(startIndex, endIndex);
    };

    return (
        <Grid style={{ marginLeft: '2em', width: 'auto' }}>
            <Header as='h1' textAlign='center'>Manage Users</Header>
            <Table inverted size='large' >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {getUsersForPage().map((user, index) => (
                        <Table.Row key={user._id}>
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{user.fullName}</Table.Cell>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>
                                <Dropdown
                                    options={roleOptions}
                                    value={user.role}
                                    onChange={(e, { value }) => handleRoleChange(user._id, value)}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Button animated color='blue'>
                                    <Button.Content hidden>Edit</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='edit' />
                                    </Button.Content>
                                </Button>
                                <Button animated color='red'>
                                    <Button.Content hidden>Delete</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='trash' />
                                    </Button.Content>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row >
                        <Table.HeaderCell colSpan="6">
                            <Pagination inverted
                                activePage={activePage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                style={{ display: 'flex', justifyContent: 'center' }}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Grid>


    );
};

export default ManageUsers;
