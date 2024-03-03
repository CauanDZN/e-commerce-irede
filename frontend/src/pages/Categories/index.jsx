import React, { useState, useEffect } from "react";
import { CardCategory } from "../../components/CardCategory";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("http://localhost:3000/products/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        }

        fetchCategories();
    }, []);

    return (
        <main className="text-blue-900 h-[50vh] w-screen bg-zinc-50 flex flex-col justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <CardCategory key={category.id} category={category} />
                ))}
            </div>
        </main>
    );
}
