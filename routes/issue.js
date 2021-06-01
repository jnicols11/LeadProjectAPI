const express = require('express')
const router = express.Router()
const Issue = require('../models/issue')

module.exports = router

// Get all project issues
router.get('/getProjectIssues/:projectID', async (req, res) => {
    try {
        const issues = await Issue.find({ backlogID: req.params.projectID })

        issues.map(issue => issue.name).sort()

        return res.status(200).json(issues);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Create an issue
router.post('/createIssue', async (req, res) => {
    const issue = new Issue({
        projectID: req.body.projectID,
        backlogID: req.body.backlogID,
        name: req.body.name,
        desc: req.body.desc,
        time: req.body.time
    })

    try {
        const newIssue = await issue.save()
        res.status(201).json(newIssue)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete an issue
router.delete('/deleteIssue/:id', async (req, res) => {
    try {
        await Issue.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: 'Delete Success!' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})