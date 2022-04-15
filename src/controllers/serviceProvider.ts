import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { serviceProviderModel } from "../models/serviceProviderModel";

export const getServiceProviders = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const serviceProviders = await serviceProviderModel
    .query()
    .where({ companyId });
  res.json(serviceProviders);
};

export const postServiceProvider = async (req: Request, res: Response) => {
  const { name, description, email, gender, companyId } = req.body;

  const serviceProvider = await serviceProviderModel.query().insertAndFetch({
    name,
    description,
    email,
    gender,
    companyId,
  });

  res.json(serviceProvider);
};
