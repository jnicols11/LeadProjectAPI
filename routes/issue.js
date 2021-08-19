const express = require('express')
const router = express.Router()
const Issue = require('../models/issue')

module.exports = router

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

// Get all project issues (Read)
router.get('/getProjectIssues/:projectID', async (req, res) => {
    try {
        const issues = await Issue.find({ backlogID: req.params.projectID, state: 1 })

        issues.map(issue => issue.name).sort()

        return res.status(200).json(issues);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get completed project issues
router.get('/getCompletedIssues/:projectID', async (req, res) => {
    try {
        const issues = await Issue.find({ projectID: req.params.projectID, state: 3 })

        issues.map(issue => issue.name).sort()

        return res.status(200).json(issues);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// Update an issue
router.patch('/updateIssue/:issueID', async (req, res) => {

    try {
        await Issue.findOneAndUpdate({ _id: req.params.issueID }, req.body, function (err, issue) {
            res.send(issue);
        });
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