import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ProductDetailsPage from "../Pages/Home/FeaturedProducts/ProductDetailsPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import UserAddProduct from "../Pages/Dashboard/UserAddProduct/UserAddProduct";
import UserMyProduct from "../Pages/Dashboard/UserMyProduct/UserMyProduct";
import Products from "../Pages/Products/Products";
import UserUpdateProduct from "../Pages/Dashboard/UserMyProduct/UserUpdateProduct";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import ProductReviewPage from "../Pages/Dashboard/Moderator/ProductReviewPage";
import AdminRoute from "./AdminRoute";
import AllAcceptedProducts from "../Pages/Products page/AllAcceptedProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetailsPage></ProductDetailsPage>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/userAddedProduct/${params.id}`),
      },
      {
        path: "/allAcceptedProducts",
        element: <AllAcceptedProducts></AllAcceptedProducts>,
      },
      {
        path: "/allProducts",
        element: <Products></Products>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    // normal users routes
    children: [
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },

      {
        path: "addProduct",
        element: <UserAddProduct></UserAddProduct>,
      },
      {
        path: "myProduct",
        element: <UserMyProduct></UserMyProduct>,
      },
      {
        path: "userUpdateProduct/:id",
        element: <UserUpdateProduct></UserUpdateProduct>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/userAddedProduct/${params.id}`),
      },

      // moderator routes
      {
        path: "productReviewQueue",
        element: <ProductReviewPage></ProductReviewPage>,
      },

      // admin routes only
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
    ],
  },
]);
