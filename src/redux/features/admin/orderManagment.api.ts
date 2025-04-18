import { baseApi } from "@/redux/api/baseApi";

const orderManagmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrders: builder.mutation({
      query: (orderInfo) => ({
        url: "/orders",
        method: "POST",
        body: orderInfo,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
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
});

export const {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useCreateOrdersMutation,
  useVerifyOrderQuery,
} = orderManagmentApi;
