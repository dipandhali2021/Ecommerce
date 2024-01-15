import { configureStore, Middleware } from "@reduxjs/toolkit";
import { productApi } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productApi.reducerPath]:productApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,

  },
  middleware: (mid) => {
    const customMiddleware: Middleware[] = [userAPI.middleware,productApi.middleware];
    return mid().concat(customMiddleware);
  },
});
