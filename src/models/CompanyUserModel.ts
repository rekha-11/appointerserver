import { OModel } from "./DefaultModel";
import omit from "lodash/omit";
import { QueryContext } from "objection";
import bcrypt from "bcryptjs";

export enum UserTypes {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
}

export class CompanyUsers extends OModel {
  public id!: number;
  public name!: string;
  public phoneNumber!: string;
  public active!: boolean;
  public registrationNumber!: string;
  public companyId!: string;
  public address!: string;
  public userType!: UserTypes;
  public password!: string;
  public username!: string;

  static get tableName() {
    return "companyUsers";
  }

  static get idColumn() {
    return "id";
  }

  get secureFields() {
    return ["password", "username"];
  }

  public $formatJson(json: CompanyUsers) {
    const j = super.$formatJson(json);
    return omit(json, this.secureFields);
  }

  public async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);
    this.userType = UserTypes.Admin;
    await this.encryptPassword();
  }

  public async $beforeUpdate(
    opt: Record<string, unknown>,
    queryContext: QueryContext
  ) {
    await super.$beforeUpdate(opt, queryContext);
    this.userType = UserTypes.Admin;
    if (this.password) {
      await this.encryptPassword();
    }
  }

  public async encryptPassword() {
    if (!this.password) {
      return;
    }
    return new Promise<void>((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
          this.password = hash;
          resolve();
        });
      });
    });
  }

  public async comparePassword(password: string) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
          reject(err);
        }
        resolve(isMatch);
      });
    });
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "name",
        "phoneNumber",
        "registrationNumber",
        "password",
        "username",
        "userType",
      ],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        phoneNumber: { type: "string", length: 10 },
        registrationNumber: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string" },
        username: { type: "string" },
        userType: { type: "string", enum: ["SuperAdmin", "Admin"] },
      },
    };
  }
}
