import { baseApis } from "./main/baseApis";

const usersApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["users"],
    }),
    blockUnblockUser: builder.mutation({
      query: ({ userId }) => ({
        url: "/users/toggole-block",
        method: "PATCH",
        body: { userId: userId },
      }),
      invalidatesTags: ["users"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery, useBlockUnblockUserMutation } = usersApis;

export default usersApis;
