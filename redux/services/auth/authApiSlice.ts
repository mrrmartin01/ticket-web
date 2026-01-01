import { setUser } from "@/redux/features/auth/authSlice";
import { apiSlice } from "../apiSlice";
import { UserProfile } from "@/types/auth";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/signin",
        method: "POST",
        body: { email, password },
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        credentials: "include",
      }),
    }),

    getUser: builder.query<UserProfile, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
        credentials: "include",
      }),
    }),

    signup: builder.mutation({
      query: ({ firstName, lastName, password, email }) => ({
        url: "/auth/signup",
        method: "POST",
        body: { firstName, lastName, email, password },
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: "/users/reset-password",
        method: "PATCH",
        body: { token, newPassword: password },
      }),
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: "/users/update-profile",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authApiSlice.util.updateQueryData("getUser", undefined, (draft) => {
            Object.assign(draft, data);
          })
        );
        try {
          const { data: response } = await queryFulfilled;
          dispatch(setUser(response.user ?? response));
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useSigninMutation,
  useRefreshQuery,
  useGetUserQuery,
  useSignupMutation,
  useSignoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,

  useEditUserMutation,
} = authApiSlice;
