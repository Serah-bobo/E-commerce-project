
import { Route } from "react-router-dom";
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Layout from "./Components/Layout";
import SignUp from "Pages/SignUp";
import Login from "Pages/Login";
import Logout from "Pages/Logout"; // Import Logout page
import AdminRoute from "Admin/Routes/AdminRoute";
import AdminLayout from "Admin/Layout/AdminLayout";
import ProductList from "Admin/Pages/ProductList";
import { JSX } from "react";
import ProductDetails, {loader as productDetailsLoader} from "Pages/ProductDetails";
import { Navigate } from "react-router-dom";
import Products, {loader as productLoader} from "Pages/Products";
import Profile from "Components/Profile";
import Cart from "Pages/Cart";
import OrdersPage from "Pages/Orders";
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = localStorage.getItem("loggedin") === "true";
  return isLoggedIn ? children : <Navigate to="/signup" replace />;
};  



const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} /> {/* Logout Route */}
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} loader={productLoader} />
        <Route path="products/:id" element={<ProductDetails />} loader={productDetailsLoader} />
        <Route path="cart" element={<Cart />} />
      
        <Route path="profile" element={<Profile />}/>
        <Route path="orders" element={<OrdersPage />} />
      </Route>

        {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>} >
      <Route index element={<ProductList/>}/>
      </Route>
      
    </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
