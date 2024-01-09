import { NextFunction, Request, Response } from "express";

export interface NewUserRequstBody {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  _id: string;
  dob: Date;
}

export type ControllerType = (
  req: Request<{}, {}, NewUserRequstBody>,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
