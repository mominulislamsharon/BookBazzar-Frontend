import { baseApi } from "@/redux/api/baseApi";
import {
  TProductBooksResponse,
  TQueryParams,
  TResponseRedux,
  TSingleProductResponse,
} from "@/types";
import { TProductBooks } from "@/types/productManagment.type";

const productBookManajementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProducts: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getAllBooks: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParams) => {
            params.append(item.category, item.value as string);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TProductBooksResponse>) => {
        console.log(response);
        return {
          data: response.data?.result || [],
          meta: response.data?.meta,
        };
      },
      providesTags: ["Products"],
    }),
    singleBooks: builder.query<TSingleProductResponse, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProductBooks>) => {
        return {
          data: response.data as TProductBooks,
        };
      },
      providesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useCreateProductsMutation,
  useSingleBooksQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productBookManajementApi;
