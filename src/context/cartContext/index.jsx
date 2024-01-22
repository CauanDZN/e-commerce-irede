import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(JSON.parse(localStorage.getItem("cart")))


export const CartProvider=({ children })=> {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")))

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart))
      
    }, [cart])

    
    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )

}