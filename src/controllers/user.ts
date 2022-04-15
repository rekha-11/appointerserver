import { Request, Response } from "express";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import { userInfo } from "os";
import { Companies } from "../models/CompanyModel";

import { User } from "../models/UserModel";

export const loginPost = async (req: Request, res: Response) => {
  const { username, password } = req.query;
  console.log(username, password);

  const relatedUser = await User.query().findOne({ username });
  if (relatedUser && relatedUser.password === password) {
    const token = jwt.sign({ u: relatedUser.username }, "abcd", {
      expiresIn: "60m",
    });
    res.status(200).send({ token });
  } else {
    res.status(403).send();
  }
};

export const getUser = async (req: any, res: Response) => {
  let company: any = {};
  const relatedUser = await User.query().findOne({ username: req.username });
  if (relatedUser) {
    company = await Companies.query().findById(relatedUser?.companyId);
  }
  res.json({ ...relatedUser, company });
};

export const createUser = async (req: Request, res: Response) => {
  const { data } = req.body;
  const user = await User.create({
    name: data.user,
    companyId: data.companyId,
  });
  res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const usersList = await User.query().where({ companyId });
  res.json(usersList);
};
