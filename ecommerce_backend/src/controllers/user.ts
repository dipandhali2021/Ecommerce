import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequstBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { tryCatch } from "../middlewares/error.js";

// export const newUser = tryCatch(
//   async (
//     req: Request<{}, {}, NewUserRequstBody>,
//     res: Response,
//     next: NextFunction
//   ) => {

//     try {
//       const { name, email, photo, gender, _id, dob } = req.body;
//       // let user = await User.findById(_id);
//       // if (user) {
//       //   return res.status(200).json({
//       //     status: "success",
//       //     message: `Welcome back ${user.name}`,
//       //   });
//       // }
//       const user = await User.create({
//         name,
//         email,
//         photo,
//         gender,
//         _id,
//         dob: new Date(dob),
//       });
//       return res.status(201).json({
//         status: "success",
//         message: `Welcome, ${user.name}`,
//       });
//     } catch (error) {
//       return next(error);
//     }
//   }
// );
export const newUser = tryCatch(
  async (
    req: Request<{}, {}, NewUserRequstBody>,
    res: Response,
    next: NextFunction
  ) => {
 
      const { name, email, photo, gender, _id, dob } = req.body;
      let user = await User.findById(_id);
      if (user) {
        return res.status(200).json({
          status: "success",
          message: `Welcome back ${user.name}`,
        });
      }
      user = await User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob),
      });
      return res.status(201).json({
        status: "success",
        message: `Welcome, ${user.name}`,
      });

    
  }
  
)

