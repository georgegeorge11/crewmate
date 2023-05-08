import Team from "../models/team.model.js";
import Task from "../models/task.model.js";

// Create a new team
export const createTeam = async (req, res) => {
  try {
    

    // get data from request body
    let { name, description, admin,teamMembers,project } = req.body;

    // create new Team
    const newTeam = new Team({
      name,
      description,
      admin,
      teamMembers,
      project,
    });

    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (err) {
    // return error message
    res.status(500).json({ error: err.message });
  }
};

// get an existing team
export const getTeam = async (req, res) => {
  try {
    const { teamId} = req.params;

    // if id not in request object
    if (!id) return res.status(400).json({ msg: "id not found in request" });

    // get a team
    const team = await Team.findOne({ _id: teamId});

    if (!team) return res.status(404).json({ message: "Team not found!" });

    res.status(200).json({ team });
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
};

export const getTeams = async (req, res) => {
  try {
    
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    // return appropriate error message
    res.status(500).json({ error: err.message });
  }
};

export const updateTeam = async (req, res) => {
  try {
    // check if request body is empty, return appropriate error message
    if (req.body == undefined)
      return res.status(500).json({ error: "Bad Request" });

    //
    const { userid } = req.body;
    const { teamId, projectId } = req.params;

    // find team and update
    Team.findOneAndUpdate(
      { _id: teamId, admin: userid, project: projectId },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          admin: req.body.admin,
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

// delete team
export const deleteTeam = async (req, res) => {
  try {
    // get id from url param
    const { id } = req.params;

    // Make sure team's tasks are deleted
    const team = await Team.findOne({ _id: id });

    // if tasks, loops through tasks, and delete them
    if (team.tasks) {
      const tasksArray = team.tasks;

      tasksArray.forEach(async (task) => {
        await Task.findByIdAndRemove({ _id: task }, (err, task) => {
          err ? res.send(err) : console.log("Task has been deleted");
        });
      });
    }

    //  delete team
    await Team.findByIdAndDelete(id);
    res.status(201).json({ msg: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
