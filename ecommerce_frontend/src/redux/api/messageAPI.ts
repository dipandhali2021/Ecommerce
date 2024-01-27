import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllMessageResponse,
  MessageResponse,
  NewMessageRequest,
  deleteMessageRequest,
} from "../../types/api-types";

export const messageAPI = createApi({
  reducerPath: "messageAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/message/`,
  }),
  tagTypes: ["messages"],
  endpoints: (builder) => ({
    allMessages: builder.query<AllMessageResponse, string>({
      query: (id) => `all?id=${id}`,
      keepUnusedDataFor: 0,
      providesTags: ["messages"],
    }),

    newMessage: builder.mutation<MessageResponse, NewMessageRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["messages"],
    }),

    deleteMessage: builder.mutation<MessageResponse, deleteMessageRequest>({
      query: ({ adminId, messageId }) => ({
        url: `delete/${messageId}?id=${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["messages"],
    }),
  }),
});

export const {
  useAllMessagesQuery,
  useNewMessageMutation,
  useDeleteMessageMutation,
} = messageAPI;
