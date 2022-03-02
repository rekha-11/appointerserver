import { OModel } from "./DefaultModel";
const becrypt = require("bcrypt");
const altRounds = 10;

export default class RcModel extends OModel {
  public id!: number;
  public name!: string;

  static get tableName() {
    return "company";
  }

  static get idColumn() {
    return "id";
  }
}
