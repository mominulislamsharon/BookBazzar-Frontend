import { baseApi } from "@/redux/api/baseApi";

const productBookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
  }),
})

export const { useGetAllBooksQuery } = productBookApi;