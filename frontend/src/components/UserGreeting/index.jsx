import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function UserGreeting({ user }) {
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    const toastId = 'logout-toast';
    toast.dismiss(toastId);

    toast("Logout efetuado com sucesso", {
      toastId: toastId,
    });
    
    setUser(null);
  };

  return (
    <div className="flex items-center justify-center gap-5">
      <img
        src={user.avatar}
        alt={user.nome}
        className="h-10 w-10 rounded-full hidden lg:block"
      />
      <h1 className="hidden lg:block">Olá, {user.nome}</h1>
      <button
        onClick={handleLogout}
        className="hidden lg:block"
      >
        Sair
      </button>
    </div>
  );
}
