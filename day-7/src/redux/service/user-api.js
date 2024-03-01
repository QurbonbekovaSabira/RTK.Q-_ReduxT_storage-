import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "createApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_URL,
  }),
  endpoints: (build) => ({
    getUser: build.query({
      query: (page = 1) => {
        return {
          url: "/user",
          params: { _page: page, _limit: 4 },
        };
      },
      providesTags: ["get-user"],
      transformResponse: (data, res) => {
        const totalCount = res?.response?.headers?.get("X-total-count");
        const pageSize = Math.ceil(Number(totalCount) / 4);
        return { data, pageSize };
      },
    }),
    postUser: build.mutation({
      query: (data) => {
        return {
          url: "/user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["get-user"],
    }),
    editUser: build.mutation({
      query: (data) => {
        return {
          url: `/user/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["get-user"],
    }),
    deleteUser: build.mutation({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["get-user"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useDeleteUserMutation,
  useEditUserMutation,
  usePostUserMutation,
} = userApi;
