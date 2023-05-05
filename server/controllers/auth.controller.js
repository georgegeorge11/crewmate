import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const register = async (req,res) =>{
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

export const login = async(req,res) =>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        if (!user) return res.status(404).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        user.password = "";
        res.status(200).json({ token, user });
    }  catch (err) {
        res.status(500).json({ error: err.message });
}
}