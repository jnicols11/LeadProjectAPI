const express = require('express')
const router = express.Router()
const Project = require('../models/project')

// Test route
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find()
        res.json(projects)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get Project by ID
router.get('/getProject/:id/:userID', (req, res) => {

})

// Get ALl Projects connected to user ID
router.get('/getUserProjects/:userID', async (req, res) => {
    try {
        const projects = await Project.find({ userID: req.params.userID.toString() });

        projects.map(project => project.name).sort()

        return res.status(200).json(projects)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Create a project
router.post('/createProject', async (req, res) => {
    const project = new Project({
        userID: req.body.userID,
        name: req.body.name,
        desc: req.body.desc,
        deadline: req.body.deadline
    })

    try {
        const newProject = await project.save()
        res.status(201).json(newProject)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update a project
router.patch('/updateProject', (req, res) => {

})

// Delete a project
router.delete('/deleteProject/:id', getProject, async (req, res) => {
    try {
        await res.project.remove()
        res.json({ message: 'Deleted Project' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getProject(req, res, next) {
    let project
    try {
        project = await Project.findById(req.params.id)
        if (project == null) {
            return res.status(404).json({ message: 'Cannot find project' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.project = project
    next()
}

module.exports = router