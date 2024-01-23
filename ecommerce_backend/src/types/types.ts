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
export interface NewProductRequstBody {
  name: string;
  category: string;
  price: number;
  stock: number;
  description:string;
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export interface baseQueryType {
  name?: {
    $regex: string;
    $options: string;
  };
  category?: string;
  price?: {
    $lte: number;
  };
}

export type invalidateCacheProps = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
  userId?: string;
  orderId?: string;
  productId?: string| string[];
};

export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
}


export interface NewOrderRequstBody {
  shippingInfo: ShippingInfoType[];
  user: string;
  subtotal: number;
  tax: number;
  shippingCharge: number;
  discount: number;
  total: number;
  orderItems: OrderItemType[];
}
