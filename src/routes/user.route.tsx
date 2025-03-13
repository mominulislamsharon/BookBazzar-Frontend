import OrderManagementLayout from "@/components/layout/OrderManagementLayout";
import UserDashboard from "@/pages/admin/UserDashboard";
import UserManagementLayout from "@/components/layout/UserManagementLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CreateOrder from "@/pages/admin/CreateOrder";
import CreateUser from "@/pages/admin/CreateUser";
import ManageUsers from "@/pages/admin/ManageUsers";
import ViewOrders from "@/pages/admin/ViewOrder";

type TRoute = {
  path: string;
  element: React.FC | React.ReactElement;
  children?: TRoute[];
}

export const userPath = [
  {
    name: 'Dashboard',
    path: "dashboard",
    element: <UserDashboard />,
  },
  // {
  //   index: true,
  //   element: <AdminDashboard />,
  // },
  {
    name: 'Users',
    path: "users",
    element: <UserManagementLayout />,
    children: [
      {
        name: 'Create-User',
        path: "create-user",
        element: <CreateUser />,
      },
      {
        name: 'Manage-Users',
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
  {
    name: 'Orders',
    path: "Orders",
    element: <OrderManagementLayout></OrderManagementLayout>,
    children: [
      {
        name: 'Create-Order',
        path: "create-order",
        element: <CreateOrder />,
      },
      {
        name: 'View-Orders',
        path: "view-orders",
        element: <ViewOrders />,
      },
    ],
  },
];
