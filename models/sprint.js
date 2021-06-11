const mongoose = require('mongoose')

const sprintSchema = new mongoose.Schema({
    projectID: {
        type: String,
        required: true
    },
    teamID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    issues: {
        type: [],
        required: true
    }
})

module.exports = mongoose.model('Sprint', sprintSchema)