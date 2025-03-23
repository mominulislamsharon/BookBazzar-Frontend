import OrderManagementLayout from "@/components/layout/OrderManagementLayout";
import UserManagementLayout from "@/components/layout/UserManagementLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CreateOrder from "@/pages/admin/CreateOrder";
import CreateUser from "@/pages/admin/CreateUser";
import ManageUsers from "@/pages/admin/ManageUsers";
import ProductManagement from "@/pages/admin/ProductManagement/ProductManagement";
import ViewOrders from "@/pages/admin/ViewOrder";

type TRoute = {
  path: string;
  element: React.FC | React.ReactElement;
  children?: TRoute[];
}

export const adminPath = [
  {
    name: 'Dashboard',
    path: "dashboard",
    element: <AdminDashboard />,
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
    name: 'Products',
    path: "products",
    element: <ProductManagement />,
    children: [
      {
        name: 'Products',
        path: "products",
        element: <ProductManagement />,
      },
      {
        name: 'refresh',
        path: "auth/refresh-token",
        element: <CreateOrder />,
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
