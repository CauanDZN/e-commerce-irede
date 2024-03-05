import React from "react";
import { Link } from "react-router-dom";

export function LeftInformation() {
  const infosPagina = [
    { id: 1, title: "Sobre o E-Rede Store", url: "/sobre" },
    { id: 2, title: "Segurança", url: "/segurança" },
    { id: 3, title: "Lista de desejos", url: "/lista-de-desejos" },
    { id: 4, title: "Trabalhe conosco", url: "/trabalhe-conosco" },
  ];

  return (
    <ul className="font-semibold text-[10px] min-w-32">
      <p className="pb-[14px]">Informações</p>
      {infosPagina.map((info) => (
        <li key={info.id} className="pl-[2px] pb-2">
          <Link to={info.url} className="text-white font-light">
            {info.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}