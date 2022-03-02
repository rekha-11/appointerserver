import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BookingModel } from "../models/BookingModel";

export const getBookings = async (req: Request, res: Response) => {
  const { rcId } = req.query;
  const bookings = await BookingModel.query();
  res.json(bookings);
};

export const postBooking = async (req: Request, res: Response) => {
  const {
    clientId,
    spId,
    bookingStartDate,
    bookingEndDate,
    description,
    companyId,
  } = req.body;

  const booking = await BookingModel.query().insertAndFetch({
    clientId,
    spId,
    bookingStartDate,
    bookingEndDate,
    description,
    status,
  });
  res.json(booking);
};

// export const getClients = async (req: Request, res: Response) => {
//   const { rcId } = req.query;
//   console.log(rcId);
//   const clients = await await ClientsModel.query();
//   res.json(clients);
// };

// export const postClients = async (req: Request, res: Response) => {
//   const { name, phone, email, age, gender, companyId } = req.body;
//   const clients = await ClientsModel.query().insertAndFetch({
//     name,
//     phone,
//     email,
//     age,
//     gender,
//     companyId,
//   });
//   res.json(clients);
// };
