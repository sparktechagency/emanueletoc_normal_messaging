import { baseApis } from "./main/baseApis";

const moreInformation = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getMoreInformation: builder.query({
      query: () => ({
        url: "/site-policy/More",
        method: "GET",
      }),
      providesTags: ["More"],
    }),
    createMoreInformation: builder.mutation({
      query: (data) => ({
        url: "/site-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["More"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateMoreInformationMutation,
  useGetMoreInformationQuery,
} = moreInformation;

export default moreInformation;
