import mongoose from "mongoose";
interface ICoupon extends Document {
  coupon: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
const schema = new mongoose.Schema(
  {
    coupon: {
      type: String,
      required: [true, "please enter coupon"],
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, "please enter Discount amount"],
    },
  },
  { timestamps: true }
);

export const Coupon = mongoose.model<ICoupon>("Coupon", schema);
