import { configureStore, Middleware } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (mid) => {
    const customMiddleware: Middleware[] = [userAPI.middleware];
    return mid().concat(customMiddleware);
  },
});
