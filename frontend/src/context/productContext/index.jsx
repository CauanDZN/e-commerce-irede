import { createContext, useState } from "react";
import tenis from "../../assets/tenis.webp"

export const ProductContext = createContext(null)

export const ProductProvider=({children})=>{
    const [products, setProducts]=useState([
        { id: 1, title: "Nike Air Surf", img: tenis, category: "Tênis", price: "220,00" },
        { id: 2, title: "Nike Air Surf", img: tenis, category: "Tênis", price: "220,00" },
        { id: 3, title: "Nike Air Surf", img: tenis, category: "Tênis", price: "220,00" },
        { id: 4, title: "Nike Air Surf", img: tenis, category: "Tênis", price: "220,00" },
        { id: 5, title: "Nike Air Surf", img: tenis, category: "Tênis", price: "220,00" },
        { id: 6, title: "Nike Air Surf", img: tenis, category: "Tênis", price: "220,00" },
    ])
    return(
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}