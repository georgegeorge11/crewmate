import Project from "../models/project.model.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    if (req.body === undefined) {
      return res.status(400).send("request doesn't contain body");
    }
    let { title, description, creator } = req.body;

    const newProject = new Project({
      title,
      description,
      creator,
      teams: [],
      tasks: [],
      startDate: "",
      endDate: "",
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get an existing project
export const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    // if id not in request object
    if (!id) return res.status(400).json({ msg: "id not found in request" });

    // get a project
    const project = await Project.findById(id);

    // if project with the above if not found
    if (!project)
      return res.status(404).json({ message: "Project not found!" });

    // return found project
    res.status(200).json({ project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    // if the request body doesn't contain the appriopriate data
    if (req.body == undefined)
      return res.status(500).json({ error: "Bad Request" });
    const { id } = req.params;

    // get projects by creator
    const projects = await Project.find({ creator: id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    if (req.body == undefined)
      return res.status(500).json({ error: "Bad Request" });
    const { userid } = req.body;
    const { id } = req.params;

    Project.findOneAndUpdate(
      { _id: id, creator: userid },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          teams: req.body.teams,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
      },
      { new: true }
    )
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await Project.findByIdAndDelete(id);
    res.status(201).json({ msg: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
