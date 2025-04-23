import UserManagementLayout from "@/components/layout/UserManagementLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CreateUser from "@/pages/admin/CreateUser";
import ManageUsers from "@/pages/admin/ManageUsers";
import AdminViewAllOrder from "@/pages/admin/OrderManagemnet/AdminViewAllOrder";
import OrderManagementLayout from "@/pages/admin/OrderManagemnet/OrderManagementLayout";
import AdminAllProducts from "@/pages/admin/ProductManagement/AdminAllProducts";
import AdminUpdateProduct from "@/pages/admin/ProductManagement/AdminUpdateProduct";
import CreateProductBook from "@/pages/admin/ProductManagement/CreateProductBook";
import ProductManagement from "@/pages/admin/ProductManagement/ProductManagementLayOut";

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
    path: "orders",
    element: <OrderManagementLayout></OrderManagementLayout>,
    children: [
      {
        name: "Admin View All Orders",
        path: "admin-view-all-orders",
        element: <AdminViewAllOrder />,
      },
    ],
  },
];
