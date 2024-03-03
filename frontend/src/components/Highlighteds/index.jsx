import React, { useEffect, useState } from "react";
import { CardProduct } from "../CardProduct";

export function Highlighteds() {
  const [highlighteds, setHighlighteds] = useState([]);

  useEffect(() => {
    const fetchHighlighteds = async () => {
      try {
        const response = await fetch("http://localhost:3000/products/highlighteds");
        if (!response.ok) {
          throw new Error("Não foi possível obter os produtos destacados");
        }
        const data = await response.json();
        setHighlighteds(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHighlighteds();
  }, []);

  return (
    <div className="bg-zinc-50 w-full flex flex-col xl:px-24 justify-center items-center lg:pb-18 pb-4">
      <h1 className="text-blue-900 font-semibold text-xl py-6 pl-7 w-full">
        Destaques
      </h1>
      <div className="grid xl:grid-cols-6 xl:gap-10 lg:grid-cols-5 lg:gap-8 md:grid-cols-4 md:gap-6 grid-cols-2 gap-2 place-items-center lg:w-full">
        {highlighteds.map((product, index) => (
          <CardProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
