import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "@/redux/features/admin/orderManagment.api";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

const AdminViewAllOrder = () => {
  const { data, isLoading, refetch } = useGetAllOrdersQuery(undefined);
  const [deleteOrder] = useDeleteOrderMutation();

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = async (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(orderId).unwrap();
        toast.success("Order deleted!");
        refetch();
      } catch (error) {
        toast.error("Failed to delete order!");
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        📋 All Orders (Admin)
      </h1>

      {data?.data?.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((order: any) => (
                <tr key={order._id} className="border text-center">
                  <td className="p-2">{order?.order_id || order._id}</td>
                  <td className="p-2">{order?.email}</td>
                  <td className="p-2">{order?.quantity || 1}</td>
                  <td className="p-2">{order?.totalPrice || 0} BDT</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs
                      ${
                        order?.transaction_status === "success"
                          ? "bg-green-100 text-green-800"
                          : order?.transaction?.transactionStatus === "pending"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order?.transaction?.transactionStatus || "Pending"}
                    </span>
                  </td>
                  <td className="p-2">
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-2 space-x-2">
                    <Button
                      className="bg-blue-600 text-white"
                      onClick={() =>
                        (window.location.href =
                          data?.data.payment?.checkout_url)
                      }
                    >
                      Details
                    </Button>
                    <Button
                      className="bg-red-600 text-white"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminViewAllOrder;
