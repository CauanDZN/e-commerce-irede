import { createContext, useState } from "react";
import tenis from "../../assets/tenis.webp"

export const ProductContext = createContext(null)

export const ProductProvider=({children})=>{
    const [products, setProducts]=useState([
        { id: 1, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "220,00" },
        { id: 2, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "220,00" },
        { id: 3, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "220,00" },
        { id: 4, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "220,00" },
        { id: 5, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "220,00" },
        { id: 6, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "220,00" },
    ])
    return(
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}