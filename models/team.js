const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    projectID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    leader: {
        type: Number,
        required: true
    },
    members: {
        type: [Number],
        required: true
    }
})

module.exports = mongoose.model('Team', teamSchema)