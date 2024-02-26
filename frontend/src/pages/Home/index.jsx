import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgDesk from "../../assets/promo-banner-desk.png";
import imgMob from "../../assets/promo-banner-mobile.png";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";
import { ProductContext } from "../../context/productContext";

function Card({ product }) {
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
        src={product.img}
        alt="card produto"
        className="h-24 md:h-32 w-44 object-cover"
      />
      <div className="px-3 py-2">
        <h1 className="text-blue-900 font-bold">{product.title}</h1>
        <span className="text-stone-500">{product.category}</span>
        <h3 className="text-orange-500 font-semibold">R$ {product.price}</h3>
        <button
          className="bg-blue-900 w-20 h-6 rounded-md text-center text-[12px]"
          onClick={() => handleCart(product)}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

function Promo() {
  return (
    <div className="w-full relative md:block flex justify-center items-center">
      <img
        src={imgMob}
        alt="Banner Promo mobile"
        className="md:hidden w-full max-h-[400px] object-cover"
      />
      <img
        src={imgDesk}
        alt="Banner Promo desktop"
        className="hidden md:flex w-full"
      />
      <Link
        to="/promo"
        className="bg-orange-500 absolute bottom-10 md:right-10 lg:right-30 xl:right-60 2xl:-120 w-[331px] md:w-80 text-center h-16 rounded-md flex items-center justify-center text-xl"
      >
        Aproveitar Oferta
      </Link>
    </div>
  );
}

function Destaques() {
  const { products } = useContext(ProductContext);

  return (
    <div className="bg-zinc-50 w-full flex flex-col xl:px-24 justify-center items-center lg:pb-18 pb-4">
      <h1 className="text-blue-900 font-semibold text-xl py-6 pl-7 w-full">
        Destaques
      </h1>
      <div className="grid xl:grid-cols-6 xl:gap-10 lg:grid-cols-5 lg:gap-8 md:grid-cols-4 md:gap-6 grid-cols-2 gap-2 place-items-center lg:w-full">
        {products?.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="flex flex-wrap justify-center">
        <Promo />
        <Destaques />
      </section>
    </main>
  );
}
