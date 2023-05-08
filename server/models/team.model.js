import mongoose from "mongoose";
import { Schema } from "mongoose";

// Create team model schema
const teamSchema = new mongoose.Schema(
        {
        name: {
                type: String,
                trim: true,
                required: "Team Name is Required"
        },
        description: {
                type: String
        },
        teamMembers: [{
                type: Schema.Types.ObjectId,
                ref: "User"
        }],
        admin: {
                type: Schema.Types.ObjectId,
                ref: "User"
        },
        tasks: [{
                type: Schema.Types.ObjectId,
                ref: "Task"
        }],
        project: {
                type: Schema.Types.ObjectId,
                ref: "Project"
        }
});

const Team = mongoose.model("Team", teamSchema);

export default Team;