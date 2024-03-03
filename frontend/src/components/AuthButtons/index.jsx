import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";

export function AuthButtons() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    toast.dismiss();
    toast.success("Logout efetuado com sucesso");
    setUser(null);
  }

  return (
    <>
      {user ? (
        <button onClick={handleLogout} className="bg-orange-500 h-10 w-32 rounded-lg items-center justify-center hidden md:flex">
          Sair
        </button>
      ) : (
        <>
          <Link to="sign-up" className="hidden md:flex">
            Cadastre-se
          </Link>
          <Link to="sign-in" className="bg-orange-500 h-10 w-32 rounded-lg items-center justify-center hidden md:flex">
            Entrar
          </Link>
        </>
      )}
    </>
  );
}
