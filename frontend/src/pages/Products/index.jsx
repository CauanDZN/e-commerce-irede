import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../../context/productContext";
import { CardProduct } from "../../components/CardProduct";

export default function Products() {
  const { products } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoria = searchParams.get("categoria");
    setSelectedCategory(categoria || "all");
  }, [location.search]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.categoria_nome === selectedCategory);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <main className="text-blue-900 w-screen h-full p-8 bg-zinc-50 flex flex-col justify-center items-center">
      <select value={selectedCategory} onChange={handleCategoryChange} className="mb-4">
        <option value="all">Todas as Categorias</option>
        <option value="Roupas">Roupas</option>
        <option value="Calçados">Calçados</option>
        <option value="Acessórios">Acessórios</option>
      </select>

      <div className="grid xl:grid-cols-6 xl:gap-10 lg:grid-cols-5 lg:gap-8 md:grid-cols-4 md:gap-6 grid-cols-2 gap-2 place-items-center lg:w-full">
        {filteredProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
