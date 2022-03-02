import { Request, Response } from "express";

import { CompanyUsers } from "../models/CompanyUserModel";

export const getCompanyUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const companyUsers = await CompanyUsers.query().where({ companyId: id });
  res.json(companyUsers);
};

export const postCompany = async (req: Request, res: Response) => {
  const companyName = req.body;
  console.log(companyName);
  const company = await CompanyUsers.query().insertAndFetch(companyName);
  res.json(company);
};

// export const postAuthorization = async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   console.log(username, password);
//   const auth = await User.query().insertAndFetch({ username, password });
//   res.json(auth);
// };
