import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import './task.css';
import Header from "../shared/Header";
import TaskItem from './TaskItem';

const TaskContent = () => {
    const token = useSelector((state) => state.token);
    // const user = useSelector((state) => state.user);
    const [status, setStatus] = useState([]);
    const [isListInView1, setIsListInView1] = useState(false);

    const getStatus = async () => {
        axios({
            method: "GET",
            url: "http://localhost:3001/tasks",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setStatus(response.data);

            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getStatus()
    }, [])

    const openModalHandler = () => {
        // dispatch(modalActions.openModalCreateTask());
    };

    return (
        <>
        <Header title="Tasks"/>
            <div className="taskList">
                <button
                    onClick={openModalHandler}
                    className="addButton"
                >
                    Add new task
                </button>
                {status.map((task) => (
                    <TaskItem key={task._id} task={task} />
                ))}
            </div>
        </>

    )
}

export default TaskContent