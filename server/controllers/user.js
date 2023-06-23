import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(404).json({ message: "No users found." });
        users.password = "";
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById({ _id: id });
        if (!user) return res.status(404).json({ message: "User not found." });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete({ _id: id });
        if (user.deletedCount === 0) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, username, password, email, role } = req.body;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        // find the user by ID and update their fields
        const user = await User.findByIdAndUpdate(
            id,
            { fullName, username, password: hashPassword, email, role },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};