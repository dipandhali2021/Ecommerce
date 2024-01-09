import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { tryCatch } from "./error.js";

export const adminOnly = tryCatch(async (req,res,next)=>{

    const {id}= req.query;
    if (!id) return next(new ErrorHandler("Please provide the id", 401));
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("User not found", 404));
    if (user.role !== "admin")
      return next(new ErrorHandler("You are not authorized to do this", 401));

    next();
})

