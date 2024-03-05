import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MyOrders from "./pages/MyOrders";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import About from "./pages/About";
import WorkWithUs from "./pages/WorkWithUs";
import Security from "./pages/Security";
import WishList from "./pages/WishList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/cartContext";
import { ProductProvider } from "./context/productContext";
import ProductDetailed from "./pages/ProductDetailed";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col items-center bg-blue-900 text-zinc-50 min-h-screen overflow-hidden">
        <CartProvider>
          <ProductProvider>
            <Header />
            <NavBar />
            <div className="flex justify-center items-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Products />} />
                <Route path="/categorias" element={<Categories />} />
                <Route path="/meus-pedidos" element={<MyOrders />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/produtos/:id" element={<ProductDetailed />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/trabalhe-conosco" element={<WorkWithUs />} />
                <Route path="/segurança" element={<Security />} />
                <Route path="/lista-de-desejos" element={<WishList />} />
              </Routes>
            </div>
            <Footer />
          </ProductProvider>
        </CartProvider>
        <ToastContainer stacked />
      </div>
    </UserProvider>
  );
}

export default App;
