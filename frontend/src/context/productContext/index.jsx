import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/products');
            if (!response.ok) {
                throw new Error('Não foi possível obter os produtos');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
