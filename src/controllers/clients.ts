import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ClientsModel } from "../models/ClientsModel";

export const getClients = async (req: Request, res: Response) => {
  const { rcId } = req.query;
  console.log(rcId);
  const clients = await await ClientsModel.query();
  res.json(clients);
};

export const postClients = async (req: Request, res: Response) => {
  const { name, phone, email, age, gender, companyId } = req.body;
  const clients = await ClientsModel.query().insertAndFetch({
    name,
    phone,
    email,
    age,
    gender,
    companyId,
  });
  res.json(clients);
};

// export const postAuthorization = async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   console.log(username, password);
//   const auth = await User.query().insertAndFetch({ username, password });
//   res.json(auth);
// };
