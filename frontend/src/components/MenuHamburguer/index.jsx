import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function MenuHamburguer() {
  return (
    <div className=" flex justify-start items-center md:hidden">
      <GiHamburgerMenu className="text-2xl" />
    </div>
  );
}

export default MenuHamburguer;