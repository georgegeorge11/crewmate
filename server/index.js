import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import teamRouter from "./routes/team.js";
import projectRouter from "./routes/project.js";
import taskRouter from "./routes/task.js";


// Configurations
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5001;

// initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());

// app routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to team management api");
});

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/projects", projectRouter)
app.use("/teams", teamRouter);
app.use("/tasks", taskRouter);

// db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });