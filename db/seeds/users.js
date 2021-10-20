
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries

      const users = [
        {email: 'guigolawliet13@gmail.com', password: 'guiguinho'},
        {email: 'silva_elisson15@outlook.com', password: 'silvaguigo'},
        {email: 'test@test.com', password: 'testpart3'}
      ]
      return knex('users').insert(users);
    });
};
