import Team from "../models/Team.js";
import User from "../models/User.js";
import Project from "../models/Project.js";

export const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('leader', 'username').populate('members', 'username');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: 'A apărut o eroare la obținerea echipelor.' });
    }
};

export const getTeamByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        let teams;
        if (user.role === 'manager') {
            teams = await Team.find({ $or: [{ leader: userId }, { members: userId }] });
        } else if (user.role === 'employee') {
            teams = await Team.find({ members: userId });
        }
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTeamById = async (req, res) => {
    const { teamId } = req.params;
    try {
        const team = await Team.findById(teamId)
            .populate('leader', 'username')
            .populate('members', 'username')
            .populate('projects', 'title');
        if (!team) {
            return res.status(404).json({ error: 'Echipa nu a fost găsită.' });
        }
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: 'A apărut o eroare la obținerea echipei.' });
    }
};

export const createTeam = async (req, res) => {

    try {
        const { name, description, leaderId } = req.body;
        const leader = await User.findById({ _id: leaderId });
        if (!leader) {
            return res.status(404).json({ error: 'Liderul nu a fost găsit.' });
        }

        const team = await Team.create({ name, description, leader });
        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la crearea echipei.' });
    }
};

export const updateTeam = async (req, res) => {
    const { teamId } = req.params;
    const { name, description, leaderId } = req.body;
    try {
        const leader = await User.findById(leaderId);
        if (!leader) {
            return res.status(404).json({ error: 'Liderul nu a fost găsit.' });
        }

        const updatedTeam = await Team.findByIdAndUpdate(
            teamId,
            { name, description, leader },
            { new: true }
        )
            .populate('leader', 'username')
            .populate('members', 'username')
            .populate('projects', 'title');
        if (!updatedTeam) {
            return res.status(404).json({ error: 'Echipa nu a fost găsită.' });
        }
        res.json(updatedTeam);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la actualizarea echipei.' });
    }
};

export const deleteTeam = async (req, res) => {
    const { teamId } = req.params;
    try {
        const deletedTeam = await Team.findByIdAndDelete(teamId);
        if (!deletedTeam) {
            return res.status(404).json({ error: 'Echipa nu a fost găsită.' });
        }
        res.json({ message: 'Echipa a fost ștearsă cu succes.' });
    } catch (error) {
        res.status(400).json({ error: 'Eroare la ștergerea echipei.' });
    }
};

// Adaugă un membru în echipă
export const addMemberToTeam = async (req, res) => {
    const { teamId } = req.params;
    const { memberId } = req.body;
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: 'Echipa nu a fost găsită.' });
        }

        const members = await User.find({ _id: { $in: memberId } });
        if (!members.length) {
            return res.status(404).json({ error: 'Niciun membru nu a fost găsit.' });
        }

        team.members.push(...members);
        await team.save();

        res.json(team);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la adăugarea membrului în echipă.' });
    }
};

// Elimină un membru din echipă
export const removeMemberFromTeam = async (req, res) => {
    const { teamId, memberId } = req.params;
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: 'Echipa nu a fost găsită.' });
        }

        team.members.pull(memberId);
        await team.save();

        res.json(team);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la eliminarea membrului din echipă.' });
    }
};

// Adaugă un proiect în echipă
export const addProjectToTeam = async (req, res) => {
    const { teamId, projectId } = req.params;
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: 'Echipa nu a fost găsită.' });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Proiectul nu a fost găsit.' });
        }

        team.projects.push(project);
        await team.save();

        res.json(team);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la adăugarea proiectului în echipă.' });
    }
};

// Elimină un proiect din echipă
export const removeProjectFromTeam = async (req, res) => {
    const { teamId, projectId } = req.params;
    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: 'Echipa nu a fost găsită.' });
        }

        team.projects.pull(projectId);
        await team.save();

        res.json(team);
    } catch (error) {
        res.status(400).json({ error: 'Eroare la eliminarea proiectului din echipă.' });
    }
};