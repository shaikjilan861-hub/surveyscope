exports.up = async function (knex) {
  // ✅ 1. Extend existing ENUM (PostgreSQL)
  await knex.raw(`
    ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'date';
    ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'time';
    ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'linear';
    ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'rating';
    ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'email';
    ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'phone';
    ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'image';
  `);

  // ✅ 2. Add new columns
  await knex.schema.alterTable("questions", (table) => {
    table.integer("min_value").nullable();
    table.integer("max_value").nullable();

    table.string("label_min").nullable();
    table.string("label_max").nullable();

    table.integer("rating_max").defaultTo(5);

    table.string("file_type").nullable(); // e.g., image
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("questions", (table) => {
    table.dropColumn("min_value");
    table.dropColumn("max_value");
    table.dropColumn("label_min");
    table.dropColumn("label_max");
    table.dropColumn("rating_max");
    table.dropColumn("file_type");
  });

  // ⚠️ ENUM rollback is not supported safely in PostgreSQL
};