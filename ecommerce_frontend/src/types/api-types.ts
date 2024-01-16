import { CartItem, Order, Product, ShippingInfo, User } from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type userResponse = {
  success: boolean;
  user: User;
};

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type AllProductResponse = {
  success: boolean;
  products: Product[];
};

export type AllCategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};

export type SearchProductsResponse = {
  success: boolean;
  products: Product[];
  totalPage: number;
};

export type SearchProductRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type productDetailsResponse = {
  success: boolean;
  product: Product;
};

export type NewProductRequest = {
  id: string;
  formData: FormData;
};
export type updateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};
export type deleteProductRequest = {
  userId: string;
  productId: string;
};

export type newOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  shippingCharges: number;
  tax: number;
  discount: number;
  total: number;
  user: string;
};

export type orderDetailsResponse = {
  success: boolean;
  order: Order;
};

export type updateOrderRequest = {
  userId: string;
  orderId: string;
};
export type deleteOrderRequest = {
  userId: string;
  orderId: string;
};
