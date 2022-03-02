import { Model, QueryContext } from "objection";

export class OModel extends Model {
  public created_at?: string;
  public updated_at?: string;

  async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);
    this.created_at = new Date().toISOString();
    delete this.updated_at;
  }

  async $beforeUpdate(
    opt: Record<string, unknown>,
    queryContext: QueryContext
  ) {
    await super.$beforeUpdate(opt, queryContext);
    this.updated_at = new Date().toISOString();
    delete this.created_at;
  }
}
