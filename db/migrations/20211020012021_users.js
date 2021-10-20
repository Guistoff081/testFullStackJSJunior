const { text } = require("express");

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.timestamps(false, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
