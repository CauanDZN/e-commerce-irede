import { useContext } from "react";
import { UserContext } from "../../context/userContext"

export function UserGreeting({ user }) {
  const { setUser } = useContext(UserContext);

  return (
    <div className="flex items-center justify-center gap-5">
      <img
        src={user.avatar}
        alt={user.nome}
        className="h-10 w-10 rounded-full hidden lg:block"
      />
      <h1 className="hidden lg:block">Olá, {user.nome}</h1>
      <button
        onClick={() => {
          setUser(null);
        }}
        className="hidden lg:block"
      >
        Sair
      </button>
    </div>
  );
}