import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";
import { AuthButtons } from "../AuthButtons";
import { CartButton } from "../CartButton";
import { UserGreeting } from "../UserGreeting";

export default function Buttons() {
  const { user } = useContext(UserContext) || { user: null };
  const { cart } = useContext(CartContext);
  const [totalItemsCart, setTotalItemsCart] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let total = 0;
    if (cart && cart.produtos) {
      cart.produtos.forEach((product) => {
        total += product.quantidade;
      });
    }
    setTotalItemsCart(total);
  }, [cart]);

  return (
    <div className="flex justify-center items-center md:w-full max-w-[289px] gap-5">
      {user ? (
        <UserGreeting user={user} />
      ) : (
        <AuthButtons />
      )}
      <CartButton
        totalItemsCart={totalItemsCart}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}
