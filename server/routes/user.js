import express from 'express';
import { verifyToken } from '../middleware/authenticate.js';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get('/user/:id', verifyToken, getUser);
userRouter.get('/', verifyToken, getAllUsers);
userRouter.delete('/user/:id', verifyToken, deleteUser);
userRouter.put('/user/:id', verifyToken, updateUser);

export default userRouter;