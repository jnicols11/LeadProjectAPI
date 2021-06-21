const express = require('express')
const router = express.Router()
const Sprint = require('../models/sprint')

// Create a sprint
router.post('/createSprint', async (req, res) => {
    const sprint = new Sprint({
        projectID: req.body.projectID,
        teamID: req.body.teamID,
        name: req.body.name,
        issues: req.body.issues
    })

    try {
        const newSprint = await sprint.save()
        res.status(201).json(newSprint)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Get all sprints connected to a teamID
router.get('/getTeamSprints/:teamID', async (req, res) => {
    try {
        const sprints = await Sprint.find({ teamID: req.params.teamID.toString() });

        sprints.map(sprint => sprint.name).sort()

        return res.status(200).json(sprints)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Update a Sprint
router.patch('/updateSprint/:sprintID', async (req, res) => {
    try {
        await Sprint.findOneAndUpdate({ _id: req.params.sprintID }, req.body, function (err, sprint) {
            res.send(sprint);
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete a Sprint
router.patch('/deleteSprint/:sprintID', async (req, res) => {
    try {
        await Sprint.deleteOne({ _id: req.params.sprintID })

        res.status(200).json({ message: 'Delete Success!' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router