import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus } from "lucide-react";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/auth/cartSlice";
import { useCreateOrdersMutation } from "@/redux/features/admin/orderManagment.api";
import { toast } from "sonner";

const ViewOrders = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();

  const [createOrder, { isLoading, isSuccess, isError, data, error }] =
    useCreateOrdersMutation();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [coupon, setCoupon] = useState<string>("");
  const [deliveryOption, setDeliveryOption] = useState<string>("standard");

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item._id));
    }
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleQuantityChange = (id: string, type: "inc" | "dec") => {
    const amount = type === "inc" ? 1 : -1;
    dispatch(updateQuantity({ id, amount }));
  };

  const handleDelete = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item._id)
  );

  const subtotal = selectedCartItems.reduce(
    (acc, item) => acc + item.price * item.selectedQty,
    0
  );

  const discount = coupon === "SAVE20" ? 20 : subtotal > 200 ? 10 : 0;

  const deliveryCharge = deliveryOption === "express" ? 15 : 5;

  const total = subtotal - discount + deliveryCharge;

  const user = useAppSelector((state: RootState) => state.auth.user);

  const handleCheckout = async () => {
    for (const item of selectedCartItems) {
      await createOrder({
        product: item._id,
        quantity: item.selectedQty,
        email: user?.email,
      });
    }
  };

  const toastId = "cart";

  useEffect(() => {
    if (isLoading) {
      toast.loading("Processing your order...", { id: toastId });
    }

    if (isSuccess) {
      toast.success(data?.message || "Order placed successfully!", {
        id: toastId,
      });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data?.data.payment?.checkout_url;
        }, 1000);
      }
    }

    // Reset cart selection
    setSelectedItems([]);
    setCoupon("");
    setDeliveryOption("standard");

    if (isError) {
      const errorMessage = (error as any)?.data?.message;
      toast.error(errorMessage, { id: toastId });
    }
  }, [isLoading, isSuccess, isError, data?.message, error, data?.data]);

  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <input
              type="checkbox"
              checked={selectedItems.length === cartItems.length}
              onChange={toggleSelectAll}
              className="mr-4"
            />
            <h2 className="text-lg font-semibold">
              Select All ({cartItems.length}) Items
            </h2>
            <span className="font-semibold text-lg">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          {/* Cart Items List */}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row justify-between items-center border-b py-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => toggleItemSelection(item._id)}
                />
                <Link
                  to={`/book-details/${item._id}`}
                  className="flex items-center gap-4"
                >
                  <img
                    src={item.images}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-base">{item.title}</h4>
                    <span className="text-sm text-gray-500">${item.price}</span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(item._id, "dec")}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-6 text-center">{item.selectedQty}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleQuantityChange(item._id, "inc")}
                >
                  <Plus size={16} />
                </Button>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(item._id)}
              >
                <X size={18} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Details Section */}
      <div className="bg-white rounded-xl shadow-md p-6 h-fit">
        <h3 className="text-lg font-bold mb-4">Payment Details</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>${deliveryCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Coupon Input */}
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="mt-4 border w-full px-3 py-2 rounded outline-none"
        />

        {/* Delivery Options */}
        <div className="mt-4">
          <label className="font-semibold mb-1 block">Delivery Option:</label>
          <select
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="standard">Standard (5$)</option>
            <option value="express">Express (15$)</option>
          </select>
        </div>

        {/* Checkout Button */}
        <Button
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 disabled:opacity-50"
          onClick={handleCheckout}
          disabled={selectedCartItems.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default ViewOrders;
