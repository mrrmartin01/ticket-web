import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";
import { UserProfile } from "@/types/auth";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => ({ url: "/users/profile", method: "GET" }),
    }),
  }),
});

export const { useGetProfileQuery } = apiSlice;
