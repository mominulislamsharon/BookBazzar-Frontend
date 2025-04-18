import { useGetAllOrdersQuery } from "@/redux/features/admin/orderManagment.api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Order {
  _id: string;
  email: string;
  quantity: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  product: {
    title: string;
    price: number;
    author: string;
  };
  transaction: {
    id: string;
    transactionStatus: string;
  };
}

const ViewAllOrder = () => {
  const { isLoading, data } = useGetAllOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const orderData: Order[] = Array.isArray(data) ? data : data?.data || [];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">📦 All Orders</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={180} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderData.map((order) => (
            <Card
              key={order._id}
              className="border shadow-sm hover:shadow-md transition duration-200"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {order.product.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>
                  <strong>Author:</strong> {order.product.author}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Total Price:</strong> {order.totalPrice} BDT
                </p>
                <p>
                  <strong>Status:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs
                   ${
                     order.status.toLowerCase() === "success"
                       ? "bg-green-100 text-green-800"
                       : order.status.toLowerCase() === "paid"
                       ? "bg-blue-100 text-blue-800"
                       : order.status.toLowerCase() === "cancel"
                       ? "bg-yellow-100 text-yellow-800"
                       : order.status.toLowerCase() === "failed"
                       ? "bg-red-100 text-red-800"
                       : order.status.toLowerCase() === "pending"
                       ? "bg-gray-100 text-gray-800"
                       : "bg-slate-100 text-slate-800"
                   }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {order.transaction?.id || "N/A"}
                </p>
                <p>
                  <strong>Transaction Status:</strong>{" "}
                  {order.transaction?.transactionStatus || "N/A"}
                </p>
                <p>
                  <strong>User Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllOrder;
