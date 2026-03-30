exports.up = function (knex) {
  return knex.schema.createTable("options", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("question_id")
      .notNullable()
      .references("id")
      .inTable("questions")
      .onDelete("CASCADE");

    table.text("option_text").notNullable();

    table.integer("order_index").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("options");
};