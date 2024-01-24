import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllCategoriesResponse,
  AllProductResponse,
  MessageResponse,
  NewProductRequest,
  SearchProductRequest,
  SearchProductsResponse,
  deleteProductRequest,
  productDetailsResponse,
  updateProductRequest,
} from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),

    bestSellingProducts: builder.query<AllProductResponse, string>({
      query: () => "best-selling",
      providesTags: ["product"],
    }),
    allcategories: builder.query<AllCategoriesResponse, string>({
      query: () => "categories",
      providesTags: ["product"],
    }),
    allProducts: builder.query<AllProductResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ["product"],
    }),
    searchProducts: builder.query<SearchProductsResponse, SearchProductRequest>(
      {
        query: ({ price, search, sort, category, page }) => {
          let base = `all?search=${search}&page=${page}`;
          if (price) base += `&price=${price}`;
          if (sort) base += `&sort=${sort}`;
          if (category) base += `&category=${category}`;
          return base;
        },
      }
    ),
    productDetails: builder.query<productDetailsResponse, string>({
      query: (id) => `${id}`,
      providesTags: ["product"],
    }),

    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation<MessageResponse, updateProductRequest>({
      query: ({ formData, userId,productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation<MessageResponse, deleteProductRequest>({
      query: ({  userId,productId }) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
     
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useNewProductMutation,
  useAllProductsQuery,
  useLatestProductsQuery,
  useAllcategoriesQuery,
  useSearchProductsQuery,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useBestSellingProductsQuery
} = productApi;
