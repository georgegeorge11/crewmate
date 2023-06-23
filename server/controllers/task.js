import Task from '../models/Task.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('project', 'title')
            .populate('assignee', 'username')
            .sort({ createdAt: 'desc' });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'A apărut o eroare la obținerea sarcinilor.' });
    }
};

export const getTaskById = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findById(taskId)
            .populate('project', 'title')
            .populate('assignee', 'username');
        if (!task) {
            return res.status(404).json({ error: 'Sarcina nu a fost găsită.' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'A apărut o eroare la obținerea sarcinii.' });
    }
};

export const getTaskByUser = async (req, res) => {
    try {
        const { userId } = req.params; // Id-ul utilizatorului asignat primit din cererea HTTP
        console.log(userId);
        const tasks = await Task.find({ assignee: userId })

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ project: projectId })

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    const { title, description, projectId, assigneeId, status, priority, dueDate } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }

        let assignee = null;
        if (assigneeId) {
            assignee = await User.findById(assigneeId);
            if (!assignee) {
                return res.status(404).json({ error: 'Assignatul nu a fost găsit.' });
            }
        }

        const task = await Task.create({
            title,
            description,
            project,
            assignee,
            status,
            priority,
            dueDate,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la crearea sarcinii.' });
    }
};

export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, projectId, assigneeId, status, priority, dueDate } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }

        let assignee = null;
        if (assigneeId) {
            assignee = await User.findById(assigneeId);
            if (!assignee) {
                return res.status(404).json({ error: 'Assignatul nu a fost găsit.' });
            }
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                title,
                description,
                project,
                assignee,
                status,
                priority,
                dueDate,
            },
            { new: true }
        )
            .populate('project', 'title')
            .populate('assignee', 'username');
        if (!updatedTask) {
            return res.status(404).json({ error: 'Sarcina nu a fost găsită.' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la actualizarea sarcinii.' });
    }
};

export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Sarcina nu a fost găsită.' });
        }
        res.json({ message: 'Sarcina a fost ștearsă cu succes.' });
    } catch (error) {
        res.status(400).json({ error: 'Eroare la ștergerea sarcinii.' });
    }
};

// Move task to another project
export const moveTaskToProject = async (req, res) => {
    const { taskId, projectId } = req.params;
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Sarcina nu a fost găsită.' });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }

        task.project = project;
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la mutarea sarcinii în alt proiect.' });
    }
};

// Assign a user to a task
export const assignUserToTask = async (req, res) => {
    const { taskId, userId } = req.params;
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Sarcina nu a fost găsită.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilizatorul nu a fost găsit.' });
        }

        task.assignee = user;
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la asignarea utilizatorului sarcinii.' });
    }
};

// Change the status of a task
export const changeTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Sarcina nu a fost găsită.' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la modificarea stării sarcinii.' });
    }
};

// Change the priority of a task
export const changeTaskPriority = async (req, res) => {
    const { taskId } = req.params;
    const { priority } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(taskId, { priority }, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Sarcina nu a fost găsită.' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la modificarea priorității sarcinii.' });
    }
};

// Change the due date of a task
export const changeTaskDueDate = async (req, res) => {
    const { taskId } = req.params;
    const { dueDate } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(taskId, { dueDate }, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Sarcina nu a fost găsită.' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la modificarea termenului de finalizare al sarcinii.' });
    }
};
