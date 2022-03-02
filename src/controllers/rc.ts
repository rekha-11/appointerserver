import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import RcModel from "../models/RcModel";

export const getcompanies = async (req: Request, res: Response) => {
  const companies = await RcModel.query();
  res.json(companies);
};

export const postCompany = async (req: Request, res: Response) => {
  const { companyName } = req.body;
  console.log(companyName);
  const company = await RcModel.query().insertAndFetch({ name: companyName });
  res.json(company);
};

export const getCompany = async (req: Request, res: Response) => {
  const company = await RcModel.query().findOne({ id: 1 });
  res.json(company);
};
