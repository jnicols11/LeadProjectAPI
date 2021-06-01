const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
    projectID: {
        type: String,
        required: true
    },
    backlogID: {
        type: String
    },
    sprintID: {
        type: String
    },
    userID: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: 'No Description'
    },
    time: {
        type: Number,
        default: 2
    }
})

module.exports = mongoose.model('Issue', issueSchema)