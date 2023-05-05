import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import projectRouter from "./routes/project.router.js";
import TeamRouter from "./routes/team.router.js";
import TaskRouter from "./routes/tasks.router.js";

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;

// initialize app

const app = express();

//app middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json());

// app routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to CrewMate api");
});

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/projects", projectRouter);
app.use("/teams", TeamRouter);
app.use("/tasks", TaskRouter);

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
