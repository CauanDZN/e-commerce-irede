import { Navigate, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import MyOrders from "./pages/MyOrders"
import Products from "./pages/Products"
import Categories from "./pages/Categories"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { UserContext, UserProvider } from "./context/userContext"
import { useContext, useState } from "react"
import { CartProvider } from "./context/cartContext"
import { ProductProvider } from "./context/productContext"
import ProductDetailed from "./pages/ProductDetailed"

function App() {
  const [isAuth, setIsAuth] = useState(!!useContext(UserContext))

  return (
    <div className=" flex flex-col items-center bg-blue-900 text-zinc-50 min-h-screen overflow-hidden">
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            <Header />
            <NavBar />
            <div className=" flex justify-center items-center">

              <Routes>
                <Route path="/">
                  <Route path="" element={<Home/>}/>
                  <Route path="/produtos" element={<Products />} />
                  <Route path="/produtos/:id" element={<ProductDetailed />} />
                </Route>
                <Route path="/categorias" element={<Categories />} />

                <Route path="/meus-pedidos" element={isAuth ? <MyOrders /> : <Navigate to="/sign-in" />} />
                <Route path="/sign-in" element={isAuth ? <Navigate to="/" /> : <SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />

              </Routes>

            </div>
            <Footer />
          </ProductProvider>
        </CartProvider>
      </UserProvider>
    </div>
  )
}

export default App
