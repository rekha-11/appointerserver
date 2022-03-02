/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("bookings", function (table) {
      table.increments();
      table.timestamps();
      table.integer("clientId");
      table.integer("spId");
      table.string("bookingStartDate");
      table.string("bookingEndDate");
      table.string("description");
      table.string("status");
      table.integer("companyId");
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("bookings")]);
};
