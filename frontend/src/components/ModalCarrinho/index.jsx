import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { ProductContext } from "../../context/productContext";

export default function ModalCarrinho({ onClose }) {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const modalRef = useRef(null);

  let listCart = [];
  let total = 0;

  if (cart?.products) {
    cart.products.forEach((product, index) => {
      let productInfo = products?.find((item) => item.id === product.product_id);
      if (productInfo) {
        listCart.push({ ...productInfo, quantidade: product.quantidade });
        total += product.quantidade * parseFloat(productInfo.preco.replace(",", "."));
      }
    });
  }

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleEsvaziar = () => {
    setCart({ products: [] });
    navigate("/categorias");
    onClose();
  };

  const handleFinalizarCompra = () => {
    setCart({ products: [] });
    onClose();
  };

  return (
    <div className="bg-zinc-50 text-black w-72 p-7 rounded-lg absolute top-2 right-2 z-50 shadow" ref={modalRef}>
      <h1 className="pb-4 font-bold border-b-[1px] border-stone-800">Meu Carrinho</h1>
      {listCart.length > 0 ? (
        listCart.map((item) => (
          <div key={item.id} className="flex gap-4 pr-4 pt-4">
            <img src={item.imagem} alt={item.nome} className="w-20 h-[70px]" />
            <div className="flex flex-col justify-center">
              <h1 className="text-[14px] font-semibold">{item.nome}</h1>
              <span className="text-[10px] text-stone-500">{item.categoria}</span>
              <span className="text-xs font-semibold py-2">R$ {item.preco}</span>
              <span className="text-xs">Quantidade: {item.quantidade}</span>
            </div>
          </div>
        ))
      ) : (
        <h1 className="p-4">Você não possui itens adicionados ao carrinho.</h1>
      )}
      <h1 className="py-4 border-t-[1px] border-stone-900 mt-4 text-base font-semibold">
        Valor total: <strong className="text-blue-900 font-bold ml-4">R$ {total}</strong>
      </h1>
      <footer className="flex justify-between gap-2">
        <button className="text-xs w-full" onClick={handleEsvaziar}>Esvaziar</button>
        <button className="bg-blue-900 h-6 text-zinc-50 w-full text-xs rounded-md" onClick={handleFinalizarCompra}>Finalizar Compra</button>
      </footer>
    </div>
  );
}
