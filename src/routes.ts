import express, { Router } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import * as UserRoutes from "./controllers/user";
import jwt from "jsonwebtoken";
import * as CompanyRoutes from "./controllers/rc";
import * as BookingRoutes from "./controllers/booking";
import * as ClientRoutes from "./controllers/clients";
import * as ServiceProviderRoutes from "./controllers/serviceProvider";

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

//User
Get("/login", UserRoutes.loginPost);
Get("/user", authenticate, UserRoutes.getUser);
Post("/createUser", authenticate, UserRoutes.createUser);
Get("/userList/:companyId", authenticate, UserRoutes.getUsers);

//company
Get("/companiesList", CompanyRoutes.getcompanies);
Post("/createCompany", authenticate, CompanyRoutes.postCompany);
Delete("/company/:id", authenticate, CompanyRoutes.deleteCompany);

//booking
Get("/bookings", authenticate, BookingRoutes.getBookings);
Post("/bookings", authenticate, BookingRoutes.postBooking);

//clients
Post("/createClients", authenticate, ClientRoutes.postClients);
Get("/getClients/:companyId", authenticate, ClientRoutes.getClients);

//serviceProvider
Post("/createSp", authenticate, ServiceProviderRoutes.postServiceProvider);
Get(
  "/getSp/:companyId",
  authenticate,
  ServiceProviderRoutes.getServiceProviders
);
