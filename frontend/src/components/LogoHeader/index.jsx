import React from "react";
import logoERede from "../../assets/logo-e-rede.png";

function LogoHeader() {
  return (
    <div className="flex flex-col justify-center items-start md:w-full max-w-[206px]">
      <img src={logoERede} alt="Logo E-rede" className=" h-[28px]" />
    </div>
  );
}

export default LogoHeader;
