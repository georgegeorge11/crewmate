import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
// newProfile function for post function
const createUser = async (req, res) => {
  try {
    const { fullName, email, username, phoneNumber, password } = req.body;
    
    const salt = await bcrypt.genSalt();
    const hashPassword = await (password===null | undefined ? bcrypt.hash("password", salt) : bcrypt.hash(password, salt));
    const user = new User({
      fullName,
      email,
      username,
      phoneNumber,
      password: hashPassword,
    });
    const savedUser = await user.save();
    savedUser.password = "";
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get User data
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById({ _id: id});
    if (!user) return res.status(404).json({ message: "User not found." });
   
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ message: "No users found." });
    users.password = "";
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.deleteOne({ _id: id });
    if (user.deletedCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, username, email, phoneNumber, password } = req.body;

    // find the user by ID and update their fields
    const user = await User.findByIdAndUpdate(
      id,
      { fullName, username, email, phoneNumber, password },
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

export { createUser, getUser, getUsers, deleteUser, updateUser };
