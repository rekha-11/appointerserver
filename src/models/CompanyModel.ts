import { OModel } from "./DefaultModel";

export class Companies extends OModel {
  public id!: number;
  public name!: string;
  public phoneNumber!: string;
  public active!: boolean;

  static get tableName() {
    return "companies";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["phoneNumber", "name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        phoneNumber: { type: "string", length: 10 },
      },
    };
  }
}
