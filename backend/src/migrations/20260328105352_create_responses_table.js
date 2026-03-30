exports.up = function (knex) {
  return knex.schema.createTable("responses", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("form_id")
      .notNullable()
      .references("id")
      .inTable("forms")
      .onDelete("CASCADE");

    table.timestamp("submitted_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("responses");
};