import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
// newProfile function for post function
const createUser = async(req, res) => {
        try{
                const {
                    fullName,
                    email,
                    username,
                    phoneNumber,
                    password
                } = req.body;
        
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(password,salt);
                const user = new User({
                    fullName,
                    email,
                    username,
                    phoneNumber,
                    password: hashPassword
                });
                const savedUser = await user.save();
                savedUser.password = "";
                res.status(201).json(savedUser);
            }catch (err) {
                res.status(500).json({ error: err.message });
        }

}

//get User data
const getUser = async (req, res) => {
        try {
                const { id } = req.params;
                const user = await User.findById(id);
                if (!user) return res.status(404).json({ message: "User not found." })
                user.password = ""
                res.status(200).json(user);
        } catch (err) {
                res.status(500).json({ error: err.message })
        }
}

//get Users
const getUsers = async (req, res) => {
        try {
                const users = await User.find();
                if (!users) return res.status(404).json({ message: "No users found." })
                users.password = ""
                res.status(200).json(users);
        } catch (err) {
                res.status(500).json({ error: err.message })
        }
}
export { createUser, getUser, getUsers };