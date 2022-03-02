import { Request, Response } from "express";
import { Companies } from "../models/CompanyModel";

export const getCompanies = async (req: Request, res: Response) => {
  const companies = await Companies.query();
  res.json(companies);
};

export const getCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await Companies.query().findById(id);
  res.json(company);
};

export const postCompany = async (req: Request, res: Response) => {
  const { name, phoneNumber } = req.body;
  const company = await Companies.query().patchAndFetch({ name, phoneNumber });
  res.json(company);
};

export const putCompany = async (req: Request, res: Response) => {
  const { name, phoneNumber, active, id } = req.body;
  const company = await Companies.query().patchAndFetchById(id, {
    name,
    phoneNumber,
    active,
  });
  res.json(company);
};

export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await Companies.query().deleteById(id);
  res.json(company);
};
