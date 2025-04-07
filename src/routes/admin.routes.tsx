import OrderManagementLayout from "@/components/layout/OrderManagementLayout";
import UserManagementLayout from "@/components/layout/UserManagementLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CreateOrder from "@/pages/admin/CreateOrder";
import CreateUser from "@/pages/admin/CreateUser";
import ManageUsers from "@/pages/admin/ManageUsers";
import CreateProductBook from "@/pages/admin/ProductManagement/CreateProductBook";
import ProductManagement from "@/pages/admin/ProductManagement/ProductManagementLayOut";
import ViewOrders from "@/pages/admin/ViewOrder";

export const adminPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  // {
  //   index: true,
  //   element: <AdminDashboard />,
  // },

  // barti deya ache
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
  // admin routes
  {
    name: "Products",
    path: "products",
    element: <ProductManagement />,
    children: [
      {
        name: "Product",
        path: "create-product",
        element: <CreateProductBook />,
      },
      {
        name: "All Products",
        path: "all-products",
        element: <ProductManagement />,
      },
    ],
  },
  {
    name: "Orders",
    path: "Orders",
    element: <OrderManagementLayout></OrderManagementLayout>,
    children: [
      {
        name: "Create-Order",
        path: "create-order",
        element: <CreateOrder />,
      },
      {
        name: "View-Orders",
        path: "view-orders",
        element: <ViewOrders />,
      },
    ],
  },
];
