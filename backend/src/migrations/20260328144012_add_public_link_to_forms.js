exports.up = function (knex) {
  return knex.schema.alterTable("forms", (table) => {
    table.text("public_link"); // ✅ add column
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("forms", (table) => {
    table.dropColumn("public_link"); // rollback
  });
};