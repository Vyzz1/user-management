import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../api/axios";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, Record<string, any> | void>({
      query: (params) => {
        if (!params) return "users";
        const urlParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            urlParams.append(key, String(value));
          }
        });
        const queryString = urlParams.toString();
        return queryString ? `users?${queryString}` : "users";
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User" as const, id: "LIST" },
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),
    createOrUpdateUser: builder.mutation<
      void,
      Omit<User, "id" | "createdAt"> & { isEdit: boolean; id?: number }
    >({
      query: ({ isEdit, id, ...rest }) => ({
        url: isEdit ? `users/${id}` : "users",
        method: isEdit ? "PUT" : "POST",
        body: {
          ...rest,
        },
      }),

      invalidatesTags: (_, __, { isEdit, id }) => {
        if (isEdit) {
          return [{ type: "User", id }];
        }
        return [{ type: "User", id: "LIST" }];
      },
    }),
    deleteUser: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateOrUpdateUserMutation,
} = userApiSlice;
