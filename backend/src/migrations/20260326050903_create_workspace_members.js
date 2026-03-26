exports.up = async function (knex) {
  await knex.schema.createTable("workspace_members", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .uuid("workspace_id")
      .notNullable()
      .references("id")
      .inTable("workspaces")
      .onDelete("CASCADE");

    table
      .enu("role", ["OWNER", "ADMIN", "VIEWER"])
      .notNullable();

    table.timestamp("joined_at").defaultTo(knex.fn.now());

    table.unique(["user_id", "workspace_id"]);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("workspace_members");
};