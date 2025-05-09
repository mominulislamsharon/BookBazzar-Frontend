import OrderManagementLayout from "@/pages/admin/OrderManagemnet/OrderManagementLayout";
import UserDashboard from "@/pages/admin/UserDashboard";
import UserManagementLayout from "@/components/layout/UserManagementLayout";
import CreateUser from "@/pages/admin/CreateUser";
import ManageUsers from "@/pages/admin/ManageUsers";
import ViewOrders from "@/pages/admin/OrderManagemnet/ViewOrder";
import CreateOrder from "@/pages/admin/OrderManagemnet/CreateOrder";
import ViewAllOrder from "@/pages/admin/OrderManagemnet/ViewAllOrder";

export const userPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  // {
  //   index: true,
  //   element: <AdminDashboard />,
  // },
  {
    name: "Users",
    path: "users",
    element: <UserManagementLayout />,
    children: [
      {
        name: "Create-User",
        path: "create-user",
        element: <CreateUser />,
      },
      {
        name: "Manage-Users",
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
  {
    name: "Orders",
    path: "orders",
    element: <OrderManagementLayout></OrderManagementLayout>,
    children: [
    
      {
        name: "View-Orders",
        path: "view-all-orders",
        element: <ViewAllOrder/>,
      },
    ],
  },
];
