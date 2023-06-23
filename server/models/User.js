import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'employee'], default: 'employee' },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],

});

const User = mongoose.model('User', userSchema);
export default User;