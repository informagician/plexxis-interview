const router = require('express').Router()
const Employees = require('../models/employees-model')
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

// GET ALL EMPLOYEES
router.get('/', cors(corsOptions),(req,res,next) => {
    // console.log(req)
    Employees.list()
        .then(employees => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200)
            res.send(JSON.stringify(employees, null, 2));
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Something went wrong getting the list of employees!'})
        })
})

// GET EMPLOYEE BY ID
router.get('/:id', cors(corsOptions),(req,res,next) => {
    const employeeId = req.params.id
    Employees.findById(employeeId)
        .then(employees => {
            res.status(200).json(employees)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Something went wrong getting the list of employees!'})
        })
})

// ADD EMPLOYEE
router.post('/add',cors(corsOptions),(req,res,next) => {
    let employee = req.body;
    if (employee.assigned === "true") {
        employee.assigned = 1
    } else if (employee.assigned === "false") {
        employee.assigned = 0
    }
    console.log(employee)
    Employees.add(employee)
        .then(success => {
            res.status(201).json(success)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Something went wrong inserting a new employee!'})
        })
})

// EMPLOYEE CODE DUPLICATE CHECKER
router.post('/by/code', cors(corsOptions), (req,res,next) => {
    const code = req.body;
    console.log(code)
    Employees.findByCode(code)
        .then(code => {
            console.log(code)
            res.status(200).json(code)
        })
        .catch(err => {
            res.status(404)
        })
})

// DELETE EMPLOYEE
router.delete('/:id', cors(corsOptions), (req,res,next) => {
    const id = req.params.id;
    console.log(id)
    Employees.del(id)
        .then(data => {
            res.status(200).end()
        })
        .catch(err => {
            res.status(404).json({message: "Item was not found"})
        })
})

// UPDATE EMPLOYEE
router.put('/:id', cors(corsOptions), (req,res,next) => {
    const id = req.params.id;
    let employee = req.body;
    if (employee.assigned === "true") {
        employee.assigned = 1
    } else if (employee.assigned === "false") {
        employee.assigned = 0
    }
    Employees.update(id,employee)
        .then(data => {
            res.status(201).json({message: "item was updated"})
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Something bad happened during update"})
        })
})
module.exports = router;

// app.get('/api/employees', cors(corsOptions), (req, res, next) => {
//   console.log('/api/employees');
//   res.setHeader('Content-Type', 'application/json');
//   res.status(200);
//   res.send(JSON.stringify(employees, null, 2));
// })