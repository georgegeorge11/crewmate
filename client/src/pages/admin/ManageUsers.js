import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Pagination, Button, Icon, Header, Grid, Label } from 'semantic-ui-react';
import EditUser from '../../components/modals/EditUser';
import { ToastContainer } from 'react-toastify';
import DeleteUser from '../../components/modals/DeleteUser';
import AddUser from '../../components/modals/AddUser';

const ManageUsers = () => {
    const token = useSelector((state) => state.token);
    const [users, setUsers] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [userSelected, setUserSelected] = useState(null);
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
    const handleAddOpen = () => {
        setAddModal(true);
    }
    const handleAddClose = () => {
        setAddModal(false);
    }

    const handleEditOpen = (user) => {
        setUserSelected(user);
        setEditModal(true)
    }
    const handleEditClose = () => {
        setUserSelected(null);
        setEditModal(false)
    }
    const handleDeleteOpen = (user) => {
        setUserSelected(user);
        setDeleteModal(true)
    }
    const handleDeleteClose = () => {
        setUserSelected(null);
        setDeleteModal(false)
    }


    const handlePageChange = (event, { activePage }) => {
        setActivePage(activePage);
    };

    const getUsersForPage = () => {
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return users.slice(startIndex, endIndex);
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'red';
            case 'manager':
                return 'green';
            default:
                return 'grey';
        }
    };

    return (
        <Grid style={{ marginLeft: '2rem', width: '90%' }}>
            <Header as='h1' textAlign='center'>Manage Users</Header>
            <Button
                floated='right'
                icon
                labelPosition='left'
                primary
                size='small'
                onClick={handleAddOpen}
            >
                <Icon name='user' /> Add User
            </Button>
            <AddUser
                open={addModal}
                close={handleAddClose}
                getUsers={getUsers} />

            <Table inverted size='large'>
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
                                <Label size='large' circular color={getRoleColor(user.role)}>{user.role}</Label>
                            </Table.Cell>
                            <Table.Cell>
                                <Button animated color='blue' onClick={() => handleEditOpen(user)}>
                                    <Button.Content hidden>Edit</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='edit' />
                                    </Button.Content>
                                </Button>
                                <Button animated color='red'
                                    onClick={() => handleDeleteOpen(user)}>
                                    <Button.Content hidden>Delete</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='trash' />
                                    </Button.Content>
                                </Button>
                                <EditUser
                                    open={editModal}
                                    close={handleEditClose}
                                    getUsers={getUsers}
                                    user={userSelected} />
                                <DeleteUser
                                    open={deleteModal}
                                    close={handleDeleteClose}
                                    getUsers={getUsers}
                                    user={userSelected} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="6">
                            <Pagination
                                inverted
                                activePage={activePage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                style={{ display: 'flex', justifyContent: 'center' }}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
            <ToastContainer />
        </Grid>
    );
};

export default ManageUsers;
