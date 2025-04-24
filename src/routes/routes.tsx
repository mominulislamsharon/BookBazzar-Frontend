import App from "@/App";
import MainLayout from "@/components/layout/MainLayout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";
import { adminPath } from "./admin.routes";
import AdminLayout from "@/components/layout/AdminLayout";
import { routeGenerator } from "@/utils/routesGenerator";
import UserLayout from "@/components/layout/UserLayout";
import { userPath } from "./user.routes";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AllProductBook from "@/pages/admin/ProductManagement/AllProductBook";
import ProductBookDetails from "@/pages/admin/ProductManagement/ProductBookDetails";
import ViewOrders from "@/pages/admin/OrderManagemnet/ViewOrder";
import VerifyOrder from "@/pages/admin/OrderManagemnet/VerifyOrder";
import ViewAllOrder from "@/pages/admin/OrderManagemnet/ViewAllOrder";
import ResetPassword from "@/pages/Home/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <App></App>,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "all-products",
        element: <AllProductBook />,
      },
      {
        path: "book-details/:id",
        element: (
          <ProtectedRoute>
            <ProductBookDetails />,
          </ProtectedRoute>
        ),
      },
      {
        path: "view-orders",
        element: <ViewOrders />,
      },
      {
        path: "order/verify",
        element: <VerifyOrder />,
      },
      {
        path: "view-all-orders",
        element: <ViewAllOrder/>
      }
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPath),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <UserLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPath),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;
