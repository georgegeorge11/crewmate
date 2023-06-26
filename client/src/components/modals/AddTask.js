import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Dropdown, Form, Input, Modal } from 'semantic-ui-react';
import { createTask } from '../../actions/functions';

const AddTask = ({ projectId, open, close, getTasks }) => {

    const token = useSelector((state) => state.token);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState(Date);
    const userOptions = users.map((user) => ({
        key: user._id,
        text: user.fullName,
        value: user._id,
    }));
    const priorityOptions = [
        { key: 'low', text: 'Low', value: 'low' },
        { key: 'medium', text: 'Medium', value: 'medium' },
        { key: 'high', text: 'High', value: 'high' }
    ];
    const statusOptions = [
        { key: 'todo', text: 'To Do', value: 'todo' },
        { key: 'inprogress', text: 'In Progress', value: 'inProgress' },
        { key: 'completed', text: 'Completed', value: 'completed' }
    ];

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


    const handleAddTask = async (e) => {
        e.preventDefault();
        await createTask(title, description, projectId, selectedUsers, status, priority, dueDate, token, getTasks, close);

    }
    return (
        <Modal
            style={{ width: '500px', height: 'auto' }}
            open={open}
            onClose={close}
        >
            <Modal.Header>
                Add task
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form
                        onSubmit={handleAddTask}
                    >
                        <div className="form">
                            <Input
                                size="large"
                                type="text"
                                name={title}
                                placeholder="Title"
                                style={{ width: '100%' }}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Input
                                size="large"
                                type="text"
                                name={description}
                                placeholder="Description"
                                style={{ width: '100%' }}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Dropdown
                                placeholder="Status"
                                fluid
                                selection
                                options={statusOptions}
                                onChange={(e, { value }) => setStatus(value)}
                            />
                            <Dropdown
                                placeholder="Priority"
                                fluid
                                selection
                                options={priorityOptions}
                                onChange={(e, { value }) => setPriority(value)}
                            />
                            <Input
                                size="large"
                                type="date"
                                name={dueDate}
                                placeholder="Due Date"
                                style={{ width: '100%' }}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                            <Dropdown
                                placeholder="Assign user"
                                fluid
                                selection
                                options={userOptions}
                                onChange={(e, { value }) => setSelectedUsers(value)}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="submit" primary size="large">
                                Create
                            </Button>

                            <Button color="red" size="large"
                                onClick={close}
                            >
                                Close
                            </Button>
                        </div>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default AddTask