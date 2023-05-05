import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      required: "Project title is required",
      type: String,
      max: 100,
      min: 2,
    },
    description: {
      type: String,
    },
    creator: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    // The Tasks parameter is linked with the task collection, getting the task_id
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

const project = mongoose.model("Project", projectSchema);

export default project;
