require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

// Routes
const employeesRouter = require('./routes/employees-router')
const branchesRouter = require('./routes/branches-router')

app.use('/api/employees', employeesRouter)
app.use('/api/branches', branchesRouter)


app.listen(process.env.SERVER_PORT || 8080, () => console.log('Job Dispatch API running on port' + process.env.SERVER_PORT))