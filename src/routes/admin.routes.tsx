import OrderManagementLayout from "@/components/layout/OrderManagementLayout";
import UserManagementLayout from "@/components/layout/UserManagementLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CreateOrder from "@/pages/admin/CreateOrder";
import CreateUser from "@/pages/admin/CreateUser";
import ManageUsers from "@/pages/admin/ManageUsers";
import AdminAllProducts from "@/pages/admin/ProductManagement/AdminAllProducts";
import AdminUpdateProduct from "@/pages/admin/ProductManagement/AdminUpdateProduct";
import AllProductBook from "@/pages/admin/ProductManagement/AllProductBook";
import CreateProductBook from "@/pages/admin/ProductManagement/CreateProductBook";
import ProductBookDetails from "@/pages/admin/ProductManagement/ProductBookDetails";
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
        element: <AdminAllProducts />,
      },
      {
        name: "Update-Product",
        path: "updateProducts/:id",
        element: <AdminUpdateProduct />,
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
