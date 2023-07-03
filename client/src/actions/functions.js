import axios from "axios";

import { toast } from "react-toastify";

//create new user
export const createUser = async (fulllName, username, email, password, role, token, getUsers, close) => {
    axios.post('http://localhost:5000/users/createUser', {
        fullName: fulllName,
        username: username,
        password: password,
        email: email,
        role: role
    },
        {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            toast.success('User created successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            getUsers();
            close();

        })
        .catch((err) => console.log(err));
}

//update users
export const updateUser = async (user, fullName, username, password, email, role, token, getUsers, close) => {
    axios.put(`http://localhost:5000/users/user/${user._id}`,
        {
            fullName,
            username,
            password,
            email,
            role
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            toast.success('User information updated successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            getUsers();
            close();

        })
        .catch((err) => console.log(err));
}

//update account information
export const updateAccount = async (user, fullName, username, password, email, role, token, dispatch, setLogin) => {

    axios.put(`http://localhost:5000/users/user/${user._id}`,
        {
            fullName,
            username,
            password,
            email,
            role
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            console.log(response.data);
            console.log(response);
            const updatedUser = response.data;
            if (updatedUser) {
                dispatch(
                    setLogin({
                        user: updatedUser,
                        token: token
                    }))
                toast.success('User information updated successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }


        })
        .catch((err) => console.log(err));


}

//delete user

export const deleteUser = async (user, token, getUsers, close) => {
    if (user) {
        axios({
            method: 'DELETE',
            url: `http://localhost:5000/users/user/${user._id}`,
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            toast.success('User deleted successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            close();
            getUsers();
        })
            .catch((err) => console.log(err));
    }
}

//change task status
export const changeStatus = async (taskId, newStatus, token, getTasks) => {

    try {
        await axios.put(
            `http://localhost:5000/tasks/task/${taskId}/status`,
            { status: newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (error) {
        console.log(error);
    }
    getTasks();
};

//update task priority
export const updatePriority = async (id, newPriority, token, getTasks) => {
    try {
        await axios.put(
            `http://localhost:5000/tasks/task/${id}/priority`,
            { priority: newPriority },
            { headers: { Authorization: `Bearer ${token}` } }
        );

    } catch (error) {
        console.log(error);
    }
    getTasks();
}

//create new project
export const createProject = async (name, description, startDate, endDate, teamId, user, token, getProjects, handleClose) => {
    axios
        .post(
            'http://localhost:5000/projects/createProject',
            {
                name: name,
                description: description,
                teamId: teamId,
                leaderId: user._id,
                startDate: startDate,
                endDate: endDate
            },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
            console.log(response.data);
            toast.success('Project created successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            handleClose();
            getProjects();
        })
        .catch((err) => console.log(err));
}

//update project
export const updateProject = async (name, description, startDate, endDate, user, teamSelected, projectSelected, token, close, getProjects) => {
    if (projectSelected) {
        axios.put(`http://localhost:5000/projects/project/${projectSelected._id}`, {
            name: name,
            description: description,
            teamId: teamSelected._id,
            leaderId: user._id,
            startDate: startDate,
            endDate: endDate

        }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
            toast.success('Project updated successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            close();
            getProjects();
        })
            .catch((err) => console.log(err));
    }
}

//delete project
export const deleteProject = async (token, projectSelected, close, getProjects) => {
    if (projectSelected) {
        axios({
            method: 'DELETE',
            url: `http://localhost:5000/projects/project/${projectSelected._id}`,
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            toast.success('Project deleted successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            close();
            getProjects();
        })
            .catch((err) => console.log(err));
    }

}

//create new task
export const createTask = async (title, description, projectId, selectedUsers, status, priority, dueDate, token, getTasks, close) => {
    axios
        .post('http://localhost:5000/tasks/createTask', {
            title: title,
            description: description,
            projectId: projectId,
            assigneeId: selectedUsers,
            status: status,
            priority: priority,
            dueDate: dueDate
        },
            { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
                toast.success('Task created successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                getTasks();
                close();
            }).catch((err) => console.log(err));
}

//update task
export const updateTask = async (task, name, description, projectId, user, dueDate, token, getTasks, close) => {
    if (task) {
        axios.put(`http://localhost:5000/tasks/task/${task._id}`, {
            title: name,
            description: description,
            projectId: projectId._id,
            assigneeId: user._id,
            dueDate: dueDate
        }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
            toast.success('Task updated successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            close();
            getTasks();
        })
            .catch((err) => console.log(err));
    }
}

//delete task
export const deleteTask = async (task, getTasks, token, close) => {
    if (task) {
        axios({
            method: 'DELETE',
            url: `http://localhost:5000/tasks/task/${task._id}`,
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            toast.success('Task deleted successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            close();
            getTasks();
        })
            .catch((err) => console.log(err));
    }
}

//change assignee
export const changeAssignee = async (id, newAssignee, token, getTasks) => {
    try {
        await axios.put(
            `http://localhost:5000/tasks/task/${id}/assign`,
            { assignee: newAssignee },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Changed assignee successfully!', {
            position: toast.POSITION.TOP_RIGHT,
        });
    } catch (error) {
        console.log(error);
    }
    getTasks();
}

//create new team
export const createTeam = async (name, description, user, token, getTeams, handleClose) => {
    axios
        .post(
            'http://localhost:5000/teams/createTeam',
            {
                name: name,
                description: description,
                leaderId: user._id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
            console.log(response.data);
            toast.success('Team created successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });

            handleClose();
            getTeams();
        })
        .catch((err) => console.log(err));
}

//update team
export const updateTeam = async (name, description, token, teamSelected, getTeams, user, close) => {
    if (teamSelected) {
        axios.put(`http://localhost:5000/teams/team/${teamSelected._id}`, {
            name: name,
            description: description,
            leaderId: user._id
        }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
            toast.success('Team updated successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            close();
            getTeams();
        })
            .catch((err) => console.log(err));
    }
}

//delete team
export const deleteTeam = async (teamSelected, token, handleDeleteClose, getTeams) => {
    if (teamSelected) {
        axios({
            method: 'DELETE',
            url: `http://localhost:5000/teams/team/${teamSelected._id}`,
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            toast.success('Team deleted successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            handleDeleteClose();
            getTeams();
        })
            .catch((err) => console.log(err));
    }
}

//add members to project
export const addUsersToProject = async (projectId, selectedUsers, token, getProjects) => {
    try {
        const response = await axios.post(
            `http://localhost:5000/projects/project/${projectId}/members`,
            { memberIds: selectedUsers },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data);

        getProjects();
    } catch (error) {
        console.log(error);
    }
};

//remove user from Project
export const removeUserFromProject = async (userSelected, projectSelected, token, handleRemoveClose, getProjects) => {
    if (userSelected) {
        axios({
            method: 'DELETE',
            url: `http://localhost:5000/projects/project/${projectSelected._id}/members/${userSelected._id}`,
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            toast.success('User removed successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            handleRemoveClose();
            getProjects();
        })
            .catch((err) => console.log(err));
    }
}

//add users to team
export const addUsersToTeam = async (teamId, selectedUsers, token, getTeam) => {
    try {
        const response = await axios.post(
            `http://localhost:5000/teams/team/${teamId}/members`,
            { memberId: selectedUsers },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data);

        getTeam();
    } catch (error) {
        console.log(error);
    }
};

//remove user from team

export const removeUserFromTeam = async (userId, teamId, token, close, getTeams) => {
    if (userId) {
        axios({
            method: 'DELETE',
            url: `http://localhost:5000/teams/team/${teamId}/members/${userId._id}`,
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            toast.success('User removed successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            close();
            getTeams();
        })
            .catch((err) => console.log(err));
    }
}