import { baseApis } from "./main/baseApis";

const authApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        body: data,
      }),
    }),

    forgetPasswordOTP: builder.mutation({
      query: (data) => ({
        url: "/users/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmailOtp: builder.mutation({
      query: (data) => ({
        url: "/users/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/users/change-password",
          method: "PATCH",
          body: data,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/users/reset-password",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignInMutation,
  useForgetPasswordOTPMutation,
  useVerifyEmailOtpMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
} = authApis;

export default authApis;
