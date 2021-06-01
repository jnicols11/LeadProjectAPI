const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
        default: 'Cool new Project!'
    },
    deadline: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Project', projectSchema)