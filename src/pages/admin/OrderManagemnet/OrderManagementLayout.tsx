import { Outlet } from "react-router-dom";

const OrderManagementLayout = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <Outlet />
    </div>
  );
};

export default OrderManagementLayout;