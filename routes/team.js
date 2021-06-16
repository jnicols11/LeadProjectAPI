const express = require('express')
const router = express.Router()
const Team = require('../models/team')

// Create a team
router.post('/createTeam', async (req, res) => {
    const team = new Team({
        projectID: req.body.projectID,
        name: req.body.name,
        leader: req.body.leader,
        members: req.body.members
    })

    try {
        const newTeam = await team.save()
        res.status(201).json(newTeam)
    } catch (err) {
        res.status(400).json({ message: err.mesage })
    }
})

// get all teams in a project
router.get('/getAllTeams/:projectID', async (req, res) => {
    try {
        const teams = await Team.find({ projectID: req.params.projectID });

        teams.map(team => team.name).sort()

        return res.status(200).json(teams)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// get all teams a user is connected to
router.get('/getUserTeams/:projectID/:userID', async (req, res) => {
    try {
        let teams = await Team.find({ projectID: req.params.projectID, members: req.params.userID });

        teams.map(team => team.name).sort()

        return res.status(200).json(teams)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// updates a team in the database by its ID
router.patch('/updateTeam/:teamID', async (req, res) => {
    try {
        await Team.findOneAndUpdate({ _id: req.params.teamID }, req.body, function (team){
            res.send(team);
        });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// delete a team from the database by its ID
router.delete('/deleteTeam/:teamID', async (req, res) => {
    try {
        const team = await Team.findOne({ _id: req.params.teamID.toString() });
        await Team.remove(team);
        res.status(200).json({ message: 'Team Deleted!' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// export router
module.exports = router