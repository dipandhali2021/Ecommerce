import { configureStore, Middleware } from "@reduxjs/toolkit";
import { productApi } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderAPI";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (mid) => {
    const customMiddleware: Middleware[] = [
      userAPI.middleware,
      productApi.middleware,
      orderApi.middleware,
    ];
    return mid().concat(customMiddleware);
  },
});
