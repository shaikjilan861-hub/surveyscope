exports.up = function (knex) {
  return knex.schema.createTable("answers", (table) => {
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

    table.text("answer_text");

    table
      .uuid("selected_option_id")
      .references("id")
      .inTable("options")
      .onDelete("SET NULL");

    table.jsonb("selected_option_ids");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("answers");
};