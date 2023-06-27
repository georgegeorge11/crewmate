import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Dropdown, Grid, Header, Icon, Label, Popup } from 'semantic-ui-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { changeStatus, updatePriority } from '../../actions/functions';
import { toast } from 'react-toastify';

const ProjectTasks = ({ tasks, getTasks }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [users, setUsers] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState('');
    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });
        return formattedDate;
    };
    const handleDragUpdate = (result) => {
        const { draggableId, destination } = result;


        if (destination && destination.droppableId !== result.source.droppableId) {
            const newStatus = destination.droppableId;
            const task = tasks.find((task) => task._id === draggableId);


            if (task.assignee === user._id || user.role === "manager") {
                changeStatus(draggableId, newStatus, token, getTasks);
            } else {

                toast.error('You can only update tasks assigned to you!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }
    };
    const handlePriorityUpdate = (taskId, newPriority) => {
        const task = tasks.find((task) => task._id === taskId);


        if (task.assignee === user._id || user.role === 'manager') {
            updatePriority(taskId, newPriority, token, getTasks);
            toast.success('Priority updated successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            toast.error('You can only update priority for tasks assigned to you!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const kanbanColumns = {
        todo: { title: 'To Do', status: 'todo' },
        inProgress: { title: 'In Progress', status: 'inProgress' },
        completed: { title: 'Completed', status: 'completed' },
    };

    const kanbanTasks = {};

    Object.values(kanbanColumns).forEach((column) => {
        kanbanTasks[column.status] = tasks.filter((task) => task.status === column.status);
    });

    return (
        <DragDropContext onDragUpdate={handleDragUpdate}>
            <Grid stackable columns={3} doubling>
                {Object.values(kanbanColumns).map((column) => {
                    const columnTasks = kanbanTasks[column.status];
                    return (
                        <Grid.Column key={column.status}>
                            <Container style={{ marginBottom: '1em', marginTop: '1em' }}>
                                <Header as="h2" textAlign='center'>{column.title}</Header>
                            </Container>
                            <Droppable droppableId={column.status}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                            minHeight: '20em',
                                            backgroundColor: '#f7f7f7',
                                            borderRadius: '1em',
                                            padding: '1em',
                                        }}
                                    >
                                        {columnTasks.map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            userSelect: 'none',
                                                            backgroundColor: '#ffffff',
                                                            borderRadius: '0.5em',
                                                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                                            padding: '1em',
                                                            marginBottom: '1em',
                                                            display: 'grid',
                                                            gridTemplateColumns: '1fr',
                                                            gridGap: '0.5em',
                                                        }}
                                                    >
                                                        <div>
                                                            <Popup
                                                                trigger={
                                                                    <div>
                                                                        <Label
                                                                            ribbon="right"
                                                                            color={
                                                                                task.priority === 'low'
                                                                                    ? 'green'
                                                                                    : task.priority === 'medium'
                                                                                        ? 'yellow'
                                                                                        : 'red'
                                                                            }
                                                                            style={{ cursor: 'pointer' }}
                                                                            onClick={() => setSelectedPriority(task.priority)}
                                                                        >
                                                                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{' '}
                                                                            Priority
                                                                        </Label>
                                                                    </div>
                                                                }
                                                                on="click"
                                                                position='bottom right'
                                                                style={{ height: 'min-content' }}
                                                            >
                                                                <Dropdown
                                                                    placeholder="Select priority"
                                                                    selection
                                                                    options={[
                                                                        { key: 'low', text: 'Low', value: 'low' },
                                                                        { key: 'medium', text: 'Medium', value: 'medium' },
                                                                        { key: 'high', text: 'High', value: 'high' },
                                                                    ]}
                                                                    value={selectedPriority}
                                                                    onChange={(e, { value }) => {

                                                                        handlePriorityUpdate(task._id, value)
                                                                    }}
                                                                />
                                                            </Popup>
                                                        </div>
                                                        <Header as="h3">
                                                            <Header.Content>
                                                                <Icon name="tasks" />
                                                                {task.title}
                                                            </Header.Content>
                                                        </Header>

                                                        <p>{task.description}</p>
                                                        <p>
                                                            <strong>Assignee:</strong>{' '}
                                                            {users.map((user) =>
                                                                user._id === task.assignee ? user.fullName : null
                                                            )}
                                                        </p>
                                                        <p>
                                                            <strong>Due Date:</strong> {formatDate(task.dueDate)}
                                                        </p>
                                                        {user.role === "manager" ?
                                                            (<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}>
                                                                <Label
                                                                    size="medium"
                                                                    color='teal'
                                                                    style={{ cursor: 'pointer' }}>
                                                                    <b>Reassign</b>
                                                                </Label>
                                                                <Icon
                                                                    name="edit"
                                                                    color="blue"
                                                                    size="large"
                                                                    style={{ cursor: 'pointer' }}
                                                                />
                                                                <Icon
                                                                    name="trash"
                                                                    color="red"
                                                                    size="large"
                                                                    style={{ cursor: 'pointer' }}
                                                                />
                                                            </div>)
                                                            :
                                                            (task.assignee === user._id && (
                                                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                    <Icon
                                                                        name="edit"
                                                                        color="blue"
                                                                        size="large"
                                                                        style={{ cursor: 'pointer' }}
                                                                    />
                                                                </div>)
                                                            )
                                                        }


                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid.Column>
                    );
                })}
            </Grid>
        </DragDropContext>
    );
};

export default ProjectTasks;
