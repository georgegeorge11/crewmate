import express from 'express';
import { getTask, getTasks, getMyTasks, createTask, assignUser, deleteTask } from '../controllers/tasks.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

// initialize express router
const router = express.Router();

// get team tasks
router.get('/:teamId', verifyToken, getTasks);

// get my tasks
router.get('/:userId', verifyToken, getMyTasks);

// get task
router.get('/:teamId/:id', verifyToken, getTask);

// create tasks
router.post('/:teamId', verifyToken, createTask);

// Assign member to tasks
router.patch('/:taskId', verifyToken, assignUser);

// Remove member from tasks
// router.patch('/:taskId', verifyToken, removeUser);

// delete task
router.delete('/:taskId', verifyToken, deleteTask);

export default router;