import express from "express";
import { getUser, getUsers, createUser,deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from '../middleware/auth.middleware.js';


const router = express.Router()

router.post('/', createUser);

// Route to get user by id
router.get('/:id', verifyToken, getUser);

// Get users from db
router.get('/', verifyToken, getUsers);

router.delete('/:id',verifyToken, deleteUser);

router.put('/:id', verifyToken, updateUser);

const userRouter = router;

export default userRouter;