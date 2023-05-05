import mongoose from "mongoose";

// Define the schema for our tasks
const TaskSchema = new mongoose.Schema({
        name: String,
        description: String,
        // creator of the task
        creator: {
                id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                },
        },
        assignees: [{
                id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                }
        }],
        status: String,
        startDate: Date,
        endDate: Date
}, { timestamps: true });

const Task = mongoose.model("Task", TaskSchema);

// Exports our taskSchema with Task as a reference
export default Task;