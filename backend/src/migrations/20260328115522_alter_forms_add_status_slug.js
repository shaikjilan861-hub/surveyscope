exports.up = function (knex) {
  return knex.schema.alterTable("forms", (table) => {
    table
      .enu("status", ["draft", "published"])
      .defaultTo("draft");

    table.string("public_slug").unique();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("forms", (table) => {
    table.dropColumn("status");
    table.dropColumn("public_slug");
  });
};