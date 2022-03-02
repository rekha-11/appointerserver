import { Request, Response } from "express";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import { userInfo } from "os";

import { User } from "../models/UserModel";

// export const postAuthorization = async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   console.log(username, password);
//   const auth = await User.query().insertAndFetch({ username, password });
//   res.json(auth);
// };

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
  const relatedUser = await User.query().findOne({ username: req.username });
  res.json(relatedUser);
};

export const createUser = async (req: Request, res: Response) => {
  const { data } = req.body;
  console.log(data);
  const user = await User.create({
    name: data.name,
    companyId: data.companyId,
  });
  res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const usersList = User.query().where({ companyId });
  res.json(usersList);
};
