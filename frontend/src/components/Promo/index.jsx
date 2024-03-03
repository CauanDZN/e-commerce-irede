import React from "react";
import { Link } from "react-router-dom";
import imgDesk from "../../assets/promo-banner-desk.png";
import imgMob from "../../assets/promo-banner-mobile.png";

export function Promo() {
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
