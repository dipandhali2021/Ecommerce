import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { ControllerType } from "../types/types.js";
export const ErrorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};



export const tryCatch = (func:ControllerType)=> (req:Request,res:Response,next:NextFunction)=>{
    return Promise.resolve(func(req,res,next)).catch(next)
}

