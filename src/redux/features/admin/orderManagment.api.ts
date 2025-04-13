import { baseApi } from "@/redux/api/baseApi";

const orderManagmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrders: builder.mutation({
      query: () => ({
        url: "/orders",
        method: "POST",
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
})


export const { 
  useGetAllOrdersQuery, useUpdateOrderStatusMutation,
  useCreateOrdersMutation,
 } = orderManagmentApi;
