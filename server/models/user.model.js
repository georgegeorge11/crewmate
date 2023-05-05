import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 50,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 50,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // occupation: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
export default user;
