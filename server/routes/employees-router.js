const router = require('express').Router()
const Employees = require('../models/employees-model')

// GET ALL EMPLOYEES
router.get('/',(req,res) => {
    Employees.list()
        .then(employees => {
            res.status(200).json(employees)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: err})
        })
})

// GET EMPLOYEE BY ID
router.get('/:id', (req,res) => {
    const employeeId = req.params.id
    Employees.findById(employeeId)
        .then(employees => {
            res.status(200).json(employees)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: err})
        })
})

// ADD EMPLOYEE
router.post('/add', validateCode, validateNewEmployee, (req,res) => {
    let employee = req.body;

    if (employee.assigned === "true") {
        employee.assigned = 1
    } else if (employee.assigned === "false") {
        employee.assigned = 0
    }
    Employees.add(employee)
        .then(success => {
            res.status(201).json(success)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: err})
        })
})

// EMPLOYEE CODE DUPLICATE CHECKER
router.post('/by/code', (req,res) => {
    const code = req.body;
    Employees.findByCode(code)
        .then(code => {
            res.status(200).json(code)
        })
        .catch(err => {
            res.status(404).json({errorMessage: err})
        })
})

// DELETE EMPLOYEE
router.delete('/:id', (req,res) => {
    const id = req.params.id;
    Employees.del(id)
        .then(data => {
            res.status(200).end()
        })
        .catch(err => {
            res.status(404).json({errorMessage: err})
        })
})

// UPDATE EMPLOYEE
router.put('/:id', (req,res) => {
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
            res.status(500).json({errorMessage: err})
        })
})

// MIDDLEWARE

// Check each employee field
function validateNewEmployee(req,res,next){
    const body = req.body;

    if(Object.keys(body).length === 0){
        res.status(400).json({message: "Missing employee data"});
    } else if(!body.name) {
        res.status(400).json({message: "Missing employee name"});
    } else if(!body.branch_id){
        res.status(400).json({message: "Missing employee branch identifier"});
    } else if(!body.code){
        res.status(400).json({message: "Missing employee code"});
    } else if(!body.profession){
        res.status(400).json({message: "Missing employee profession"});
    } else if(!body.city){
        res.status(400).json({message: "Missing employee city"});
    } else if(!body.assigned){
        res.status(400).json({message: "Missing employee assignment"});
    }
    next();
}

// check code structure
function validateCode(req,res,next) {
    const code = req.body.code
    const regex = /^([F])([0-9][0-9][0-9])/
    
    if(!code.match(regex)){
        res.status(400).json({message: "Code format should be F###"})
    }
    next();
}

module.exports = router;

// app.get('/api/employees', cors(corsOptions), (req, res, next) => {
//   console.log('/api/employees');
//   res.setHeader('Content-Type', 'application/json');
//   res.status(200);
//   res.send(JSON.stringify(employees, null, 2));
// })