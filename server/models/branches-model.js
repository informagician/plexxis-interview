const db = require('../data/dbConfig')
const knexfile = require('../knexfile')

module.exports = {
    list,
    add
}

function list(){
    return db('branches')
        .select('*')
}

function add(branch) {
    return db
        .insert(branch)
        .into('branches','id')
}