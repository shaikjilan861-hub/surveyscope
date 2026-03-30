exports.up = function (knex) {
  return knex.schema.createTable("questions", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("form_id")
      .notNullable()
      .references("id")
      .inTable("forms")
      .onDelete("CASCADE");

    table.text("question_text").notNullable();

    table
      .enu(
        "type",
        ["short_text", "long_text", "radio", "checkbox", "dropdown"],
        { useNative: true, enumName: "question_type" }
      )
      .notNullable();

    table.boolean("required").defaultTo(false);

    table.integer("order_index").defaultTo(0);

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("questions");
};