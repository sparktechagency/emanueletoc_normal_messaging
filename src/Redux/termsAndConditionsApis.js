import { baseApis } from "./main/baseApis";

const termsAndConditionsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndCondition: builder.query({
      query: () => ({
        url: "/site-policy/Terms",
        method: "GET",
      }),
      providesTags: ["termsAndCondition"],
    }),
    createTermsAndCondition: builder.mutation({
      query: (data) => ({
        url: "/site-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["termsAndCondition"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateTermsAndConditionMutation,
  useGetTermsAndConditionQuery,
} = termsAndConditionsApis;

export default termsAndConditionsApis;
