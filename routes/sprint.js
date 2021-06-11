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

// Get all sprints connected to a userID
router.get('/getSprints/:userID', async (req, res) => {
    try {
        const sprints = await Sprint.find({ userID: req.params.userID.toString() });

        sprints.map(sprint => sprint.name).sort()

        return res.status(200).json(sprints)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router