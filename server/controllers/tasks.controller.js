import Task from "../models/task.model.js";
import Team from "../models/team.model.js";


// get the tasks in a project
export const getTasks = async (req, res) => {
        try {

                // get teamId from url
                const { teamId } = req.params;

                // get tasks for current team
                const team = await Team.find({ _id: teamId });
                const tasks = team.tasks;

                res.status(200).send(tasks);
        } catch (err) {
                res.status(500).send(err);
        }
}


// get tasks assigned to the current user
export const getMyTasks = async (req, res) => {
        try {
                // get user id from url
                const { userId } = req.params;

                // database query
                Task.find({ assignees: userId }).then(response => {
                        res.status(200).send(response)
                }).catch((err) => console.log(err));
        } catch (err) {
                res.status(500).send(err);
        }
}


// get a task in a team
export const getTask = async (req, res) => {
        try {

                // get teamId from url
                const { teamId, id } = req.params;

                // get tasks for current team
                const team = await Team.find({ _id: teamId });
                const task = async (team) => {
                        for (let task of team.tasks) {
                                if (task._id == id)
                                        return task;
                        }
                }
                res.status(200).send(task);
        } catch (err) {
                res.status(500).send(err);
        }
}

export const createTask = async (req, res) => {
        try {

                // get data from request body, if request body not empty
                if (req.body) { const data = req.body; }

                const newTask = new Task({
                        name: data.name,
                        description: data.description,
                        creator: data.userId,
                        assignees: data.assignees,
                        status: data.status,
                        startDate: data.startDate,
                        endDate: data.endDate
                });

                Team.findById(req.params.teamId, (err, actualTeam) => {
                        err ? res.send(err) : Task.create(newTask, (err, task) => {
                                if (err) {
                                        res.send(err);
                                }

                                actualTeam.tasks.push(task);
                                actualTeam.save();

                                res.send(task);
                        });
                });
        } catch {
                res.send('Could not create this task.');
        }
};

// update tasks
export const assignUser = async () => {
        try {
                // get Id from url params
                Task.findByIdAndUpdate({ _id: req.params.taskId }, {
                        $set: {
                                name: data.name,
                                description: data.description,
                                assignees: data.assignees,
                                status: data.status,
                                startDate: data.startDate,
                                endDate: data.endDate
                        }
                }, { new: true }).then(response => { res.status(200).send(response); })
                        .catch(err => { res.status(500).send('Could not update this task.'); });
        } catch (err) {
                console.log('Could not update this task.', err);
                res.status(500).send(err);
        }
};

// delete task
export const deleteTask = async (req, res) => {
        try {
                //Find the task to delete
                Task.findByIdAndRemove(req.params.id, function (err) {
                        err ? res.status(404).send(err) : res.status(200).send("Task deleted!")
                });
        } catch (err) {
                console.log(err);
                res.status(500).send(err);
        }
}