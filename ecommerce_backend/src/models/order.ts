import mongoose from "mongoose";

interface IProduct extends Document {
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "please enter address"],
      },
      city: {
        type: String,
        required: [true, "please enter city"],
      },
      state: {
        type: String,
        required: [true, "please enter state"],
      },
      country: {
        type: String,
        required: [true, "please enter country"],
      },
      pinCode: {
        type: Number,
        required: [true, "please enter pinCode"],
      },
    },
    user: {
      type: String,
      ref: "User",
      required: [true, "please enter user"],
    },
    subtotal: {
      type: Number,
      required: [true, "please enter subtotal"],
    },
    tax: {
      type: Number,
      required: [true, "please enter tax"],
    },
    shippingCharge: {
      type: Number,
      required: [true, "please enter shippingCharge"],
    },
    discount: {
      type: Number,
      required: [true, "please enter discount"],
    },
    total: {
      type: Number,
      required: [true, "please enter total"],
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
    orderItems: [
      {
        name: String,
        photo: String,
        price: Number,
        quantity: Number,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", schema);
