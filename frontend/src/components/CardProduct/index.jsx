import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function CardProduct({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/produtos/${product.id}`);
  };

  return (
    <div className="shadow-md rounded-md bg-white flex flex-col max-w-xs cursor-pointer" onClick={handleCardClick}>
      <img src={product.imagem} alt="card produto" className="h-40 w-full object-cover rounded-t-md" />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h1 className="text-xl font-bold text-blue-900">{product.nome}</h1>
          <p className="text-sm text-stone-500 mt-1">{product.categoria_nome}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <h3 className="text-lg font-semibold text-orange-500">R$ {product.preco}</h3>
          {product.quantidade <= 0 ? (
            <p className="text-sm text-red-500">Indisponível</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
