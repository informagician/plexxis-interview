const router = require('express').Router()
const Branches = require('../models/branches-model')
const cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

router.get('/', cors(corsOptions), (req,res,next) => {

    Branches.list()
        .then(branches => {
            res.status(200).json(branches)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: err})
        })
})

router.post('/', cors(corsOptions), (req,res,next) => {

    const branch = req.body;
    Branches.add(branch)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: err})
        })
})

module.exports = router