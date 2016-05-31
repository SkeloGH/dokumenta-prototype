
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Documents', function(t) {
    t.increments('id').primary();
    t.integer('user_id')
      .references('id')
      .inTable('Users')
      .onDelete('CASCADE')
      .index();
    t.string('title');
    t.jsonb('blocks').default(JSON.stringify({ data : [] })).notNullable();
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Documents');
};
