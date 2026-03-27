exports.up = async function (knex) {
  await knex.schema.createTable("surveys", (table) => {
    table.increments("id").primary();

    table
      .uuid("workspace_id")
      .notNullable()
      .references("id")
      .inTable("workspaces")
      .onDelete("CASCADE");

    table.text("title").notNullable();
    table.text("description");

    table
      .uuid("created_by")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table
      .enu("status", ["draft", "published"])
      .notNullable()
      .defaultTo("draft");

    // ✅ Soft delete
    table.boolean("is_deleted").defaultTo(false);

    // ✅ timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table.index(["workspace_id"]);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("surveys");
};