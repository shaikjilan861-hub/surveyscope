exports.up = function (knex) {
  return knex.schema.createTable("response_answers", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("response_id")
      .notNullable()
      .references("id")
      .inTable("responses")
      .onDelete("CASCADE");

    table
      .uuid("question_id")
      .notNullable()
      .references("id")
      .inTable("questions")
      .onDelete("CASCADE");

    table.text("answer");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("response_answers");
};