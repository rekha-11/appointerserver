import { Validator } from "objection";
import { OModel } from "./DefaultModel";
const becrypt = require("bcrypt");
const altRounds = 10;

export class User extends OModel {
  public id!: number;
  public username!: string;
  public password!: string;
  public companyId!: number;
  public userType!: string;

  static get tableName() {
    return "user";
  }

  static get idColumn() {
    return "id";
  }

  private static generatePassword() {
    return new Array(6)
      .fill(null)
      .map(() => Math.floor(Math.random() * 10))
      .join("");
  }

  public static async create({
    name,
    companyId,
  }: {
    name: string;
    companyId: number;
  }) {
    // @ts-ignore
    return await User.query().insertAndFetch({
      username: name,
      companyId,
      password: this.generatePassword(),
    });
  }
}
