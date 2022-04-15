import { OModel } from "./DefaultModel";
const becrypt = require("bcrypt");
const altRounds = 10;

export class serviceProviderModel extends OModel {
  public id!: number;
  public created_at!: string | undefined;
  public updated_at?: string | undefined;
  public name!: string;
  public description?: string;
  public email!: string;
  public gender!: string;
  public companyId!: number;

  static get tableName() {
    return "serviceProvider";
  }

  static get idColumn() {
    return "id";
  }
}
