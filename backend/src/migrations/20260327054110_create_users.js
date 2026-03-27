exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    
    table.string("name", 100).notNullable();
    table.string("email", 150).notNullable().unique();
    table.text("password").notNullable();

    table.timestamp("verified_at").nullable();
    table.string("role").defaultTo("user");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};