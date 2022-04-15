import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BookingModel } from "../models/BookingModel";

export const getBookings = async (req: Request, res: Response) => {
  const { cId, spId } = req.query;
  console.log(cId, spId);
  const bookings = await BookingModel.query()
    .where({ companyId: cId })
    .modify((qb) => {
      if (spId) {
        qb.where({
          spId,
        });
      }
    });
  res.json(bookings);
};

export const postBooking = async (req: Request, res: Response) => {
  const {
    bookingStartDate,
    bookingEndDate,
    description,
    companyId,
    spId,
    clientId,
    status,
  } = req.body;

  const booking = await BookingModel.query().insertAndFetch({
    bookingStartDate,
    bookingEndDate,
    description,
    companyId,
    spId,
    clientId,
    status,
  });

  res.json(booking);
};
