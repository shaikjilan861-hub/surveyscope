exports.up = function (knex) {
  return knex.schema.createTable("forms", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

  table
  .integer("survey_id") // ✅ FIXED
  .notNullable()
  .unique()
  .references("id")
  .inTable("surveys")
  .onDelete("CASCADE");

    table.string("title").notNullable();
    table.text("description");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("forms");
};