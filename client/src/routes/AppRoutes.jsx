import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddProduct from "../pages/AddProduct";
import ProtectedRoute from "../components/ProtectedRoute";
import ProductDetails from "../pages/ProductDetails";
import MyProducts from "../pages/MyProducts";
import EditProduct from "../pages/EditProduct";
import Products from "../pages/Products";
import Wishlist from "../pages/Wishlist";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Browse Products */}
        <Route path="/products" element={<Products />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Add Product */}
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        {/* My Products */}
        <Route
          path="/my-products"
          element={
            <ProtectedRoute>
              <MyProducts />
            </ProtectedRoute>
          }
        />

        {/* Edit Product */}
        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;