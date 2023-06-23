import Project from '../models/Project.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Task from '../models/Task.js';

// Obține toate proiectele
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('team', 'name')
            .populate('leader', 'username')
            .populate('members', 'username')
            .populate('tasks', 'title');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'A apărut o eroare la obținerea proiectelor.' });
    }
};

export const getProjectByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const projects = await Project.find({ members: userId })

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProjectsByTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const projects = await Project.find({ team: teamId })

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obține un proiect după ID
export const getProjectById = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId)
            .populate('team', 'name')
            .populate('leader', 'username')
            .populate('members', 'username')
            .populate('tasks', 'title');
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'A apărut o eroare la obținerea proiectului.' });
    }
};

// Creează un nou proiect
export const createProject = async (req, res) => {
    const { name, description, teamId, leaderId, startDate, endDate } = req.body;
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: 'Echipa nu a fost găsită.' });
        }

        const leader = await User.findById(leaderId);
        if (!leader) {
            return res.status(404).json({ error: 'Liderul nu a fost găsit.' });
        }

        const project = await Project.create({
            name,
            description,
            team: teamId,
            leader: leaderId,
            startDate,
            endDate,
        });

        team.projects.push(project);
        await team.save();

        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la crearea proiectului.' });
    }
};

// Actualizează un proiect după ID
export const updateProject = async (req, res) => {
    const { projectId } = req.params;
    const { name, description, teamId, leaderId, startDate, endDate } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: 'Echipa nu a fost găsită.' });
        }

        const leader = await User.findById(leaderId);
        if (!leader) {
            return res.status(404).json({ error: 'Liderul nu a fost găsit.' });
        }

        project.name = name;
        project.description = description;
        project.team = teamId;
        project.leader = leaderId;
        project.startDate = startDate;
        project.endDate = endDate;

        await project.save();

        res.json(project);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la actualizarea proiectului.' });
    }
};

// Șterge un proiect după ID
export const deleteProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }

        const team = await Team.findById(project.team);
        if (team) {
            team.projects.pull(projectId);
            await team.save();
        }

        await Project.findByIdAndDelete(projectId);

        res.json({ message: 'Proiectul a fost șters cu succes.' });
    } catch (error) {
        res.status(400).json({ error: 'Eroare la ștergerea proiectului.' });
    }
};

// Adaugă un membru în proiect
export const addMemberToProject = async (req, res) => {
    const { projectId, memberId } = req.params;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }

        const member = await User.findById(memberId);
        if (!member) {
            return res.status(404).json({ error: 'Membrul nu a fost găsit.' });
        }

        project.members.push(member);
        await project.save();

        res.json(project);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la adăugarea membrului în proiect.' });
    }
};
export const addMembersToProject = async (req, res) => {
    const { projectId } = req.params;
    const { memberIds } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }

        const members = await User.find({ _id: { $in: memberIds } });
        if (!members.length) {
            return res.status(404).json({ error: 'Niciun membru nu a fost găsit.' });
        }

        project.members.push(...members);
        await project.save();

        res.json(project);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la adăugarea membrilor în proiect.' });
    }
};

// Elimină un membru din proiect
export const removeMemberFromProject = async (req, res) => {
    const { projectId, memberId } = req.params;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }

        project.members.pull(memberId);
        await project.save();

        res.json(project);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la eliminarea membrului din proiect.' });
    }
};

// Adaugă o sarcină în proiect

export const addTaskToProject = async (req, res) => {
    const { projectId, taskId } = req.params;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Sarcina nu a fost găsită.' });
        }

        project.tasks.push(task);
        await project.save();

        res.json(project);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la adăugarea sarcinii în proiect.' });
    }
};

// Elimină o sarcină din proiect
export const removeTaskFromProject = async (req, res) => {
    const { projectId, taskId } = req.params;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }

        project.tasks.pull(taskId);
        await project.save();

        res.json(project);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la eliminarea sarcinii din proiect.' });
    }
};


