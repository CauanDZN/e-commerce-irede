import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../context/productContext";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";

export default function ProductDetailed() {
  const params = useParams();
  const [chosenItem, setChosenItem] = useState();
  const [quantity, setQuantity] = useState(1);
  const { products } = useContext(ProductContext);
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const chosenProduct = products.find((item) => item.id === Number(params.id));
      setChosenItem(chosenProduct);
    }
  }, [products, params]);

  const handleCart = () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    
    if (!chosenItem || chosenItem.quantidade < quantity) {
      alert("Desculpe, este produto não está disponível no momento.");
      return;
    }
    
    if (quantity <= 0) {
      alert("Selecione uma quantidade válida.");
      return;
    }
    
    const updatedCart = cart ? [...(cart.produtos || [])] : [];
    
    const indexProd = updatedCart.findIndex((item) => item.id_produto === chosenItem.id);
    
    if (indexProd > -1) {
      updatedCart[indexProd].quantidade += quantity;
    } else {
      updatedCart.push({
        id_produto: chosenItem.id,
        nome: chosenItem.nome,
        quantidade: quantity,
        preco: chosenItem.preco,
        imagem: chosenItem.imagem,
      });
    }
    
    setCart({ id_usuario: user.id, produtos: updatedCart });
    navigate("/produtos");
  };  

  return (
    <main className="w-screen bg-white py-10 flex flex-col justify-center items-center text-blue-900 px-4">
      {chosenItem ? (
        <div className="bg-slate-100 max-w-[600px] w-full min-w-[260px] flex  gap-10 p-4 rounded-lg flex-col md:flex-row items-center ">
          <img src={chosenItem.imagem} alt={chosenItem.nome} className="h-64 w-72 object-cover rounded-lg" />
          <div className="flex flex-col justify-center p-4">
            <h1 className="text-2xl font-semibold">{chosenItem.nome} {chosenItem.quantidade === 0 ? "(Indisponível)" : null}</h1>
            <span className="text-stone-500 text-lg">{chosenItem.categoria_nome}</span>
            <p className="text-orange-500 font-semibold">{chosenItem.preco}</p>
            <p className="text-stone-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum modi dolorem facilis ea praesentium pariatur beatae atque expedita perspiciatis! Id, laboriosam cum corporis minus quidem asperiores ipsum facere mollitia quibusdam.</p>
            <div className="flex items-center">
              {chosenItem.quantidade > 0 && (
                <>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="bg-blue-100 w-16 h-10 text-center text-blue-900 rounded-md mr-2"
                  />
                  <button className="bg-blue-900 text-zinc-50 my-2 h-10 rounded-lg" onClick={handleCart}>
                    Adicionar ao Carrinho
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </main>
  );
}
