require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const projectRouter = require('./routes/project')
app.use('/project', projectRouter)

const issueRouter = require('./routes/issue')
app.use('/issue', issueRouter)

const sprintRouter = require('./routes/sprint')
app.use('/sprint', sprintRouter)

const teamRouter = require('./routes/team')
app.use('/team', teamRouter)

app.listen(3010, () => console.log('Server Started'))