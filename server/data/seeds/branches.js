exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('branches').del()
    .then(function () {
      // Inserts seed entries
      return knex('branches').insert([
        {branch_id: 1, branch_name: 'Abacus'},
        {branch_id: 2, branch_name: 'Pillsworth'}
      ]);
    });
};
