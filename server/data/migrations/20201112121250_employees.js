
exports.up = function(knex) {
  return knex.schema
  .createTable('branches', branches => {
    branches.increments('branch_id');
    branches.string('branch_name',64).notNullable()
  })
  .createTable('employees', employees => {
      employees.increments('id');
      employees.string('name',255).notNullable();
      employees.string('code',8).notNullable().unique();
      employees.string('profession',255).notNullable();
      employees.string('color',64).notNullable();
      employees.string('city',64).notNullable();
      employees.integer('branch_id').unsigned().notNullable().references('branch_id').inTable('branches').onUpdate('CASCADE').onDelete('CASCADE')
      employees.boolean('assigned').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('employees')
  .dropTableIfExists('branches')
};
