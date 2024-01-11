import mongoose from "mongoose";

const schema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "please enter coupon"],
    unique: true,
  },
  amount: {
    type: Number,
    required: [true, "please enter Discount amount"],
  },
});

export const Coupon = mongoose.model("Coupon", schema);
