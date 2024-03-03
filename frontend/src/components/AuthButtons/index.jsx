import { Link } from "react-router-dom";

export function AuthButtons() {
  return (
    <>
      <Link to="sign-up" className="hidden md:flex">
        Cadastre-se
      </Link>
      <Link
        to="sign-in"
        className="bg-orange-500 h-10 w-32 rounded-lg items-center justify-center hidden md:flex"
      >
        Entrar
      </Link>
    </>
  );
}