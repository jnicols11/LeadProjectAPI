const mongoose = require('mongoose')

const backlogSchema = new mongoose.Schema({
    projectID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Backlog', backlogSchema)