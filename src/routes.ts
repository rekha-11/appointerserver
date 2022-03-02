import express, { Router } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import * as UserRoutes from "./controllers/user";
import jwt from "jsonwebtoken";
import * as CompanyRoutes from "./controllers/rc";

export const routes = express.Router();

const RoutesReducer = (routes: Router) => {
  const Get = (route: string, ...args: Array<any>) =>
    routes["get"](route, ...args);
  const Post = (route: string, ...args: Array<any>) =>
    routes["post"](route, ...args);
  const Patch = (route: string, ...args: Array<any>) =>
    routes["patch"](route, ...args);
  const Delete = (route: string, ...args: Array<any>) =>
    routes["delete"](route, ...args);
  const Put = (route: string, ...args: Array<any>) =>
    routes["put"](route, ...args);
  return { Get, Post, Patch, Put, Delete };
};

const { Get, Post, Patch, Put, Delete } = RoutesReducer(routes);

const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send();
  }
  jwt.verify(token, "abcd", (err: any, decoded: any) => {
    if (err || !decoded.u) {
      return res.status(403).send();
    }
    req.username = decoded.u;
    next();
  });
};

// company routes
// Get("/companies", CompanyRoutes.getCompanies);
// Get("/company/:id", CompanyRoutes.getCompany);
// Post("/company", CompanyRoutes.postCompany);
// Put("/company", CompanyRoutes.putCompany);
// Delete("/company", CompanyRoutes.deleteCompany);

//User
Get("/login", UserRoutes.loginPost);
Get("/user", authenticate, UserRoutes.getUser);
Post("/createUser", authenticate, UserRoutes.createUser);
Get("/userList/:companyId", authenticate, UserRoutes.getUsers);

//company
Get("/companiesList", CompanyRoutes.getcompanies);
Post("/createCompany", authenticate, CompanyRoutes.postCompany);
