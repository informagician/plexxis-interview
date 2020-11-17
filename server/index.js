require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

// Routes
const employeesRouter = require('./routes/employees-router');
const branchesRouter = require('./routes/branches-router');

app.use('/api/employees', cors(corsOptions), employeesRouter);
app.use('/api/branches', cors(corsOptions), branchesRouter);


app.listen(process.env.PORT || 8080, () => console.log('Job Dispatch API running on port' + process.env.SERVER_PORT));