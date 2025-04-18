import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVerifyOrderQuery } from "@/redux/features/admin/orderManagment.api";
import { Link, useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// ✅ Interface for OrderData
interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

const VerifyOrder = () => {
  const [searchParams] = useSearchParams();

  const { data, isLoading } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    { refetchOnMountOrArgChange: true }
  );

  const orderData: OrderData | undefined = data?.data?.[0];

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} height={200} borderRadius={12} />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">✅ Verify Order</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>🧾 Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Order ID:</strong> {orderData?.order_id}
            </p>
            <p>
              <strong>Invoice No:</strong> {orderData?.invoice_no}
            </p>
            <p>
              ?<strong>Bank Trx ID:</strong> {orderData?.bank_trx_id}
            </p>
            <p>
              <strong>Date:</strong> {orderData?.date_time}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>💳 Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Currency:</strong> {orderData?.currency}
            </p>
            <p>
              <strong>Amount (BDT):</strong> {orderData?.amount} BDT
            </p>
            <p>
              <strong>USD Amount:</strong> {orderData?.usd_amt} USD
            </p>
            <p>
              <strong>USD Rate:</strong> {orderData?.usd_rate}
            </p>
            <p>
              <strong>Payment Method:</strong> {orderData?.method}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>👤 Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Name:</strong> {orderData?.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {orderData?.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {orderData?.phone_no || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {orderData?.address || "N/A"},{" "}
              {orderData?.city || "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>✅ Verification Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p></p>

            <p>
              <strong>Transaction Status:</strong>{" "}
              {orderData?.transaction_status || "N/A"}
            </p>
            <p>
              <strong>Bank Status:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  orderData?.bank_status?.toLowerCase() === "success"
                    ? "bg-green-100 text-green-800"
                    : orderData?.bank_status?.toLowerCase() === "failed"
                    ? "bg-red-100 text-red-800"
                    : orderData?.bank_status?.toLowerCase() === "cancel"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {orderData?.bank_status || "N/A"}
              </span>
            </p>
            <p>
              <strong>SP Message:</strong> {orderData?.sp_message}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/view-all-orders"
          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          🔍 View All Orders
        </Link>
      </div>
    </div>
  );
};

export default VerifyOrder;
