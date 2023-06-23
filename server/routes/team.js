import express from 'express';
import { verifyToken } from '../middleware/authenticate.js';
import { addMemberToTeam, addProjectToTeam, createTeam, deleteTeam, getAllTeams, getTeamById, getTeamByUser, removeMemberFromTeam, removeProjectFromTeam, updateTeam } from '../controllers/team.js';

const teamRouter = express.Router();

teamRouter.get("/", verifyToken, getAllTeams);
teamRouter.get('/team/:teamId', verifyToken, getTeamById);
teamRouter.get('/userTeam/:userId', verifyToken, getTeamByUser);
teamRouter.post('/createTeam', verifyToken, createTeam);
teamRouter.put('/team/:teamId', verifyToken, updateTeam);
teamRouter.delete('/team/:teamId', verifyToken, deleteTeam);
teamRouter.post('/team/:teamId/members/:memberId', verifyToken, addMemberToTeam);
teamRouter.delete('/team/:teamId/members/:memberId', verifyToken, removeMemberFromTeam);
teamRouter.post('/team/:teamId/projects/:projectId', verifyToken, addProjectToTeam);
teamRouter.delete('/team/:teamId/projects/:projectId', verifyToken, removeProjectFromTeam);

export default teamRouter;