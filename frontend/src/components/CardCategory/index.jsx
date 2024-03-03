import React from "react";
import { useNavigate } from "react-router-dom";

export function CardCategory({ category }) {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/produtos?categoria=${category.nome}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-md p-4 w-full max-w-xs cursor-pointer"
      onClick={handleCategoryClick}
    >
      <img
        src={category.imagem}
        alt={category.nome}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{category.nome}</h2>
    </div>
  );
}
