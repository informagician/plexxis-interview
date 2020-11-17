const router = require('express').Router();
const Branches = require('../models/branches-model');

router.get('/', (req,res) => {

    Branches.list()
        .then(branches => {
            res.status(200).json(branches);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: err});
        })
})

router.post('/', (req,res) => {

    const branch = req.body;
    Branches.add(branch)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: err});
        })
})

module.exports = router;