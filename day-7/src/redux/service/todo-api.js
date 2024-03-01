import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_URL,
  }),
  endpoints: (build) => ({
    getTodo: build.query({
      query: (page = 1) => {
        return {
          url: "/todos",
          params: { _page: page, _limit: 4 },
        };
      },
      providesTags: ["get-todo"],
      transformResponse: (data, res) => {
        const totalCount = res?.response?.headers?.get("X-total-count");
        const pageSize = Math.ceil(Number(totalCount) / 4);
        return { data, pageSize };
      },
    }),
    getSingleData: build.query({
      query: (id) => {
        return {
          url: `/todos/${id}`,
        };
      },
    }),
    postTodo: build.mutation({
      query: (data) => {
        return {
          url: "/todos",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["get-todo"],
    }),
    editTodo: build.mutation({
      query: (data) => {
        return {
          url: `/todos/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["get-todo"],
    }),
    deleteTodo: build.mutation({
      query: (id) => {
        return {
          url: `/todos/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["get-todo"],
    }),
  }),
});

export const {
  useGetTodoQuery,
  useGetSingleDataQuery,
  usePostTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
