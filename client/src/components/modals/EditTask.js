import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import { updateTask } from '../../actions/functions';

const EditTask = ({ open, close, getTasks, task, projectId }) => {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(Date.now());

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (task) {
            setName(task.title);
            setDescription(task.description);
            setDueDate(formatDate(task.dueDate));
        }
    }, [task]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateTask(task, name, description, projectId, user, dueDate, token, getTasks, close)
    }
    return (
        <Modal open={open} onClose={close} style={{ height: 'auto', width: 'auto' }}>
            <Modal.Header>Edit Task</Modal.Header>
            <Modal.Content>
                {task && (
                    <Form onSubmit={handleUpdate}>
                        <div className="form">
                            <Input
                                size="large"
                                type="text"
                                value={name}
                                placeholder="Title"
                                style={{ width: '100%' }}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.TextArea
                                rows={3}
                                value={description}
                                placeholder="Description"
                                style={{ width: '100%' }}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Input
                                size="large"
                                type="date"
                                value={dueDate}
                                placeholder="Due Date"
                                style={{ width: '100%' }}
                                onChange={(e) => setDueDate(e.target.value)}
                            />


                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="submit" primary size="large">
                                Update
                            </Button>
                            <Button color="red" size="large" onClick={close}>
                                Close
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Content>
        </Modal>
    )
}

export default EditTask