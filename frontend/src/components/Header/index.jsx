import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Buttons from "../Buttons";
import InputHeader from "../InputHeader";
import LogoHeader from "../LogoHeader";
import MenuHamburguer from "../MenuHamburguer";
import NavBarMobile from "../NavBarMobile";
import { UserContext } from "../../context/userContext";

export default function Header() {
  const location = useLocation();
  const pathMatches = location.pathname === "/sign-up" || location.pathname === "/sign-in";
  const [showMob, setShowMob] = useState(false);
  const { user } = useContext(UserContext);

  const isAuthPage = () => {
    return pathMatches ? null : (
      <header className="p-8 lg:px-[107px] w-full max-w-[1440px]">
        <div className="flex flex-row justify-between place-content-between items-center w-full max-w-[1226px] pb-3 md:pb-0">
          <div onClick={() => setShowMob(true)}>
            <MenuHamburguer />
          </div>

          <NavBarMobile showMob={showMob} setShowMob={setShowMob} />

          <LogoHeader />

          <div className="hidden md:flex w-full md:max-w-[300px] lg:max-w-[520px]">
            <InputHeader />
          </div>

          <Buttons user={user} />
        </div>

        <div className="flex md:hidden">
          <InputHeader />
        </div>
      </header>
    );
  };

  return <>{isAuthPage()}</>;
}
