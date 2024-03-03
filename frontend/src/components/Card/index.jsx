import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export function Card({ product }) {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCart = (product) => {
    if (user) {
      if (cart) {
        let updatedCart = [...cart.products];
        let indexProd = updatedCart.findIndex(
          (item) => item.product_id === product.id
        );
        if (indexProd > -1) {
          updatedCart[indexProd].quantidade += 1;
        } else {
          updatedCart.push({
            product_id: product.id,
            nome: product.title,
            quantidade: 1,
            preco: product.price,
            imagem: product.img,
          });
        }
        setCart({ ...cart, products: updatedCart });
      } else {
        setCart({
          id: user.id,
          products: [
            {
              product_id: product.id,
              nome: product.title,
              quantidade: 1,
              preco: product.price,
              imagem: product.img,
            },
          ],
        });
      }
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="shadow-sm w-36 h-52 md:w-44 md:h-64 rounded-md bg-white">
      <img
        src={product.imagem}
        alt="card produto"
        className="h-24 md:h-32 w-44 object-cover"
      />
      <div className="px-3 py-2">
        <h1 className="text-blue-900 font-bold">{product.nome}</h1>
        <span className="text-stone-500">{product.categoria}</span>
        <h3 className="text-orange-500 font-semibold">R$ {product.preco}</h3>
        {product.quantidade === 0 ? (
          <p className="text-red-500">Indisponível</p>
        ) : (
          <button
            className="bg-blue-900 w-20 h-6 rounded-md text-center text-[12px]"
            onClick={() => handleCart(product)}
          >
            Comprar
          </button>
        )}
      </div>
    </div>
  );
}
