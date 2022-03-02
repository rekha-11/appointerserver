/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("user", function (table) {
      table.increments();
      table.timestamps();
      table.string("username");
      table.string("password");
      table.integer("companyId");
      table.string("usertype");
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("user")]);
};
