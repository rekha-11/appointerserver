import { Model } from "objection";
import Knex from "knex";

export const config = require("../../knexfile");

export const knex = Knex(config);

Model.knex(knex);
