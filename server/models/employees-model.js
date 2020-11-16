const db = require('../data/dbConfig')
const knexfile = require('../knexfile')

module.exports = {
    list,
    add,
    del,
    update,
    findByCode,
    findById
}

function list() {
    return db('employees')
        .join('branches','employees.branch_id','=','branches.branch_id')
        .select('*')
        .orderBy('id')
        .limit(50)
}

function add(employee) {
    return db
        .insert(employee)
        .into('employees','id')
        .then(ids => {
            findById(ids)
        })
}

async function del(employeeId) {
    const employee = await db('employees').where({id:employeeId})

    if(employee) {
        await db('employees').where({id: employeeId}).del()
    }
    return list()
}

function update(employeeId, values) {
    return db('employees')
        .where('id',employeeId)
        .update(values)
}

function findById(employeeId) {
    return db('employees')
        .select('*')
        .where('id',employeeId)
        .first()
}

function findByCode(field) {
    return db('employees')
        .select('*')
        .where('code', 'like', `%${field.code}%`)
}