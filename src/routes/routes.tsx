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
import { userPath } from "./user.route";

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
      // {
      //   path: "products",
      //   element: <AllProductsPage />,
      // },
      // {
      //   path: "products/:id",
      //   element: <ProductDetailsPage />,
      // },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: routeGenerator(adminPath),
  },
  // {
  //   path: "/orders",
  //   element: <MainLayout />,
  //   children: adminPath,
  // },
  {
    path: "/user",
    element: <UserLayout />,
    children: routeGenerator(userPath),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;
