import express from 'express';
import { verifyToken } from '../middleware/authenticate.js';
import { addMemberToProject, addMembersToProject, addTaskToProject, createProject, deleteProject, getAllProjects, getProjectById, getProjectByUser, getProjectsByTeam, removeMemberFromProject, removeTaskFromProject, updateProject } from '../controllers/project.js';


const projectRouter = express.Router();

projectRouter.get("/", verifyToken, getAllProjects);
projectRouter.post('/createProject', verifyToken, createProject);
projectRouter.get('/userProject/:userId', verifyToken, getProjectByUser);
projectRouter.get('/teamProject/:teamId', verifyToken, getProjectsByTeam);
projectRouter.get('/project/:projectId', verifyToken, getProjectById);
projectRouter.put('/project/:projectId', verifyToken, updateProject);
projectRouter.delete('/project/:projectId', verifyToken, deleteProject);
projectRouter.post('/project/:projectId/members', verifyToken, addMembersToProject);
projectRouter.delete('/project/:projectId/members/:memberId', verifyToken, removeMemberFromProject);
projectRouter.post('/project/:projectId/tasks/:taskId', verifyToken, addTaskToProject);
projectRouter.delete('/project/:projectId/tasks/:taskId', verifyToken, removeTaskFromProject);

export default projectRouter;