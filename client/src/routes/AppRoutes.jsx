import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddProduct from "../pages/AddProduct";
import ProtectedRoute from "../components/ProtectedRoute";
import ProductDetails from "../pages/ProductDetails";
import MyProducts from "../pages/MyProducts";
import EditProduct from "../pages/EditProduct";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
        path="/my-products"
        element={
          <ProtectedRoute>
            <MyProducts />
          </ProtectedRoute>
        }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;