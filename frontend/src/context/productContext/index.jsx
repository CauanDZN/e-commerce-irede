import { createContext, useState, useEffect } from "react";
import { api } from "../../api";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get.Products().then((data) => setProducts(data));
    }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
