import { configureStore, Middleware, Store } from "@reduxjs/toolkit";
import { productApi } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderAPI";
import { dashboardAPI } from "./api/dashboardAPI";
import { wishlistReducer } from "./reducer/wishlistReducer";
import { couponAPI } from "./api/couponAPI";

export const server = import.meta.env.VITE_SERVER;

export const store: Store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardAPI.reducerPath]: dashboardAPI.reducer,
    [couponAPI.reducerPath]: couponAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [wishlistReducer.name]: wishlistReducer.reducer,
  },
  middleware: (mid) => {
    const customMiddleware: Middleware[] = [
      userAPI.middleware,
      productApi.middleware,
      orderApi.middleware,
      dashboardAPI.middleware,
      couponAPI.middleware,
    ];
    return mid().concat(customMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
