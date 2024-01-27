import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  MessageResponse,
  deleteMyOrderRequest,
  deleteOrderRequest,
  newOrderRequest,
  orderDetailsResponse,
  updateOrderRequest,
} from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, newOrderRequest>({
      query: (order) => ({
        url: `new`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),
    myOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `my?id=${id}`,
      providesTags: ["order"],
    }),
    allOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["order"],
    }),
    orderDetails: builder.query<orderDetailsResponse, string>({
      query: (id) => `${id}`,
      providesTags: ["order"],
    }),
    updateOrder: builder.mutation<MessageResponse, updateOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation<MessageResponse, deleteOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    deleteMyOrder: builder.mutation<MessageResponse, deleteMyOrderRequest>({
      query: ({ userId, orderId }) => ({
        url: `my/delete?userId=${userId}&orderId=${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useDeleteMyOrderMutation
} = orderApi;
