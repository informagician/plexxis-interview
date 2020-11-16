exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([
        {
          "id": 1,
          "name": "Kyle Lowry",
          "code": "F100",
          "profession": "Drywall Installer",
          "color": "#FF6600",
          "city": "Brampton",
          "branch_id": 1,
          "assigned": true
        },
        {
          "id": 2,
          "name": "DeMar DeRozan",
          "code": "F101",
          "profession": "Drywall Installer",
          "color": "yellow",
          "city": "Brampton",
          "branch_id": 2,
          "assigned": false
        },
        {
          "id": 3,
          "name": "Fred Van Vleet",
          "code": "F102",
          "profession": "Drywall Installer",
          "color": "green",
          "city": "Bolton",
          "branch_id": 1,
          "assigned": false
        },
        {
          "id": 4,
          "name": "Jonas Valanciunas",
          "code": "F103",
          "profession": "Drywall Installer",
          "color": "#333333",
          "city": "Bolton",
          "branch_id": 2,
          "assigned": true
        },
        {
          "id": 5,
          "name": "Chris Bosh",
          "code": "F104",
          "profession": "Drywall Installer",
          "color": "#FF6600",
          "city": "Brampton",
          "branch_id": 1,
          "assigned": true
        },
        {
          "id": 6,
          "name": "Marcus Camby",
          "code": "F105",
          "profession": "Runner",
          "color": "red",
          "city": "Brampton",
          "branch_id": 2,
          "assigned": false
        },
        {
          "id": 7,
          "name": "Vince Carter",
          "code": "F106",
          "profession": "Runner",
          "color": "red",
          "city": "Toronto",
          "branch_id": 1,
          "assigned": false
        }
      ]);
    });
};
