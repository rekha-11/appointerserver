/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("serviceProvider", function (table) {
      table.increments();
      table.timestamps();
      table.string("name");
      table.string("description");
      table.string("email");
      table.string("gender");
      table.integer("companyId");
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("auth")]);
};
