import OrderManagementLayout from "@/components/layout/OrderManagementLayout";
import UserManagementLayout from "@/components/layout/UserManagementLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CreateOrder from "@/pages/admin/CreateOrder";
import CreateUser from "@/pages/admin/CreateUser";
import ManageUsers from "@/pages/admin/ManageUsers";
import OrderManagement from "@/pages/admin/OrderManagement";
import ProductManagement from "@/pages/admin/ProductManagement";
import ViewOrders from "@/pages/admin/ViewOrder";

// export const adminPath = [
//   {
//     path: "dashboard",
//     element: <AdminDashboard></AdminDashboard>,
//   },
//   {
//     index: true,
//     element: <AdminDashboard />,
//   },
//   // {
//   //   path: "create-admin",
//   //   element: <CreateAdmin />,
//   // },
//   {
//     path: "products",
//     element: <ProductManagement />,
//   },
//   {
//     path: "orders",
//     element: <OrderManagement />,
//   },
// ];

export const adminPath = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    index: true,
    element: <AdminDashboard />,
  },
  {
    path: "users",
    element: <UserManagementLayout />,
    children: [
      {
        path: "create-user",
        element: <CreateUser />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
  {
    path: "Orders",
    element: <OrderManagementLayout></OrderManagementLayout>,
    children: [
      {
        path: "create-order",
        element: <CreateOrder />,
      },
      {
        path: "view-orders",
        element: <ViewOrders />,
      },
    ],
  },
];
