import { baseApis } from './main/baseApis'

const privacyPolicyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: '/site-policy/PrivacyPolicy',
        method: 'GET',
      }),
      providesTags: ['privacyPolicy'],
    }),
    createPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: '/site-policy',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['privacyPolicy'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetPrivacyPolicyQuery, useCreatePrivacyPolicyMutation } =
  privacyPolicyApis

export default privacyPolicyApis
