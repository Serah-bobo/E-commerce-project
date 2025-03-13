
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
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
           path="products" 
           element={<Products/>}
           loader={productLoader}
            />
            <Route 
          path="products/:id"
          element={<ProductDetails />}
          loader={productDetailsLoader}
        
     /><Route
      path="profile"
      element={<Profile />}
      />
      <Route
      path="cart"
      element={<Cart />}
      />
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
