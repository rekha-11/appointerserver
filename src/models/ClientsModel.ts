import { OModel } from "./DefaultModel";
const becrypt = require("bcrypt");
const altRounds = 10;

export class ClientsModel extends OModel {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email!: string;
  public age!: string;
  public gender!: string;
  public companyId!: number;

  static get tableName() {
    return "clients";
  }

  static get idColumn() {
    return "id";
  }
}
