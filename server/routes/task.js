import express from 'express';
import { verifyToken } from '../middleware/authenticate.js';
import { assignUserToTask, changeTaskDueDate, changeTaskPriority, changeTaskStatus, createTask, deleteTask, getAllTasks, getTaskById, getTaskByUser, getTasksByProject, moveTaskToProject, updateTask } from '../controllers/task.js';


const taskRouter = express.Router();

taskRouter.get('/', verifyToken, getAllTasks);
taskRouter.get('/task/:taskId', verifyToken, getTaskById);
taskRouter.get('/userTask/:userId', verifyToken, getTaskByUser);
taskRouter.get('/projectTasks/:projectId', verifyToken, getTasksByProject);
taskRouter.post('/createTask', verifyToken, createTask);
taskRouter.put('/task/:taskId', verifyToken, updateTask);
taskRouter.delete('/task/:taskId', verifyToken, deleteTask);
taskRouter.put('/task/:taskId/move/:projectId', verifyToken, moveTaskToProject);
taskRouter.put('/task/:taskId/assign/:userId', verifyToken, assignUserToTask);
taskRouter.put('/task/:taskId/status', verifyToken, changeTaskStatus);
taskRouter.put('/task/:taskId/priority', verifyToken, changeTaskPriority);
taskRouter.put('/task/:taskId/due-date', verifyToken, changeTaskDueDate);

export default taskRouter;