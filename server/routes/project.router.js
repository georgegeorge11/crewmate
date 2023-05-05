import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
        getProject,
        getProjects,
        createProject,
        deleteProject
} from '../controllers/project.controller.js';

const router = express.Router()

router.get('/:id', verifyToken, getProject);
router.get('/user/:id', verifyToken, getProjects);
router.post('/', verifyToken, createProject);
router.delete('/:id', verifyToken, deleteProject)

export default router;