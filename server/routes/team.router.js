import { getTeam, getTeams, createTeam, updateTeam, deleteTeam } from '../controllers/team.controller.js';
import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';

// initialize express router
const router = express.Router()

// get all teams for a project
router.get('/', verifyToken, getTeams);

// get a team in a project
router.get('/:teamId/project/:projectId/', verifyToken, getTeam);
// router.get('/',verifyToken,getTeams);

// create a team
router.post('/', verifyToken, createTeam);
// update a team
router.put('/:teamId/project/:projectId', verifyToken, updateTeam);

// delete a team
router.delete('/:teamId/project/:projectId', verifyToken, deleteTeam);

const TeamRouter = router;

export default TeamRouter;