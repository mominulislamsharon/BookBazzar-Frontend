import { baseApi } from "@/redux/api/baseApi";

const productBookManajementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProducts: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
    }),
    getAllBooks: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBooksQuery, useCreateProductsMutation } = productBookManajementApi;
