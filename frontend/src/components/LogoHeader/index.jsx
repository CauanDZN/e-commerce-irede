import React from "react";
import logoERede from "../../assets/logo-e-rede.png";
import { useNavigate } from "react-router-dom";

function LogoHeader() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  }

  return (
    <div className="flex flex-col justify-center items-start md:w-full max-w-[206px]">
      <img onClick={handleLogoClick} src={logoERede} alt="Logo E-rede" className=" h-[28px]" />
    </div>
  );
}

export default LogoHeader;
