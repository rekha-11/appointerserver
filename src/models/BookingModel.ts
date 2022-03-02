import { OModel } from "./DefaultModel";
const becrypt = require("bcrypt");
const altRounds = 10;

export class BookingModel extends OModel {
  public id!: number;
  public created_at!: string | undefined;
  public updated_at?: string | undefined;
  public clientId!: string;
  public spId!: string;
  public bookingStartDate!: string;
  public bookingEndDate!: number;
  public description!: string;
  public status!: string;

  static get tableName() {
    return "bookings";
  }

  static get idColumn() {
    return "id";
  }
}
