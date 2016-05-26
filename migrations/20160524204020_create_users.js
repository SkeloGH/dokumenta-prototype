
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Users', function(t) {
    t.increments('id').primary();
    t.string('email').unique().notNullable();
    t.string('encrypted_password', 1024).notNullable();
    t.string('token', 1024);
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Users');
};
