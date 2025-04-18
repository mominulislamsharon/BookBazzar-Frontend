import { useCreateOrdersMutation } from "@/redux/features/admin/orderManagment.api";

const CreateOrder = () => {
  const [createOrders] = useCreateOrdersMutation();

const handleOrderSubmit = async () => {
  const orderData = {
    email: "user2@gmail.com",
    product: "67df20bb3017865601d7cc2a",
    quantity: 12,
  };

  try {
    const res = await createOrders(orderData).unwrap();
    console.log("Order created:", res);
  } catch (error) {
    console.error("Order creation failed:", error);
  }
};
  return (
    <div>
      <h1>This order create page</h1>
    </div>
  );
};

export default CreateOrder;
