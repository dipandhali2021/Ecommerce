import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllCouponResponse, NewCouponRequest, NewCouponResponse } from "../../types/api-types";

export const couponAPI = createApi({
  reducerPath: "couponAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment/`,
  }),
  tagTypes: ["coupon"],
  endpoints: (builder) => ({
    allCoupon: builder.query<AllCouponResponse, string>({
      query: (id) => `coupon/all?id=${id}`,
      keepUnusedDataFor: 0,
      providesTags: ["coupon"],
    }),

    newCoupon: builder.mutation<NewCouponResponse, NewCouponRequest>({
      query: ({ formData, id }) => ({
        url: `coupon/new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const { useAllCouponQuery,useNewCouponMutation } = couponAPI;
