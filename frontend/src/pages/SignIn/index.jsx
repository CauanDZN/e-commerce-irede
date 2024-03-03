import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../../assets/logo-e-rede.png";
import { UserContext } from "../../context/userContext";

export default function SignIn() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [userInput, setUserInput] = useState({ email: "", password: "" });

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userInput.email, senha: userInput.password })
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                navigate("/");
            } else {
                alert("Erro ao tentar se logar");
            }
        }
        
        catch (error) {
            console.error('Erro ao fazer login:', error);
            alert("Erro ao tentar se logar");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    const handleLoginInfo = (e) => {
        setUserInput(previous => ({ ...previous, [e.target.name]: e.target.value }));
    };

    return (
        <main className="flex flex-col  gap-7 h-screen justify-center pt-8 pb-7 lg:p-0 lg:flex-row-reverse">
            <section className="lg:w-[50vw] flex flex-col justify-center items-center gap-7">
                <h1 className="hidden lg:block text-3xl max-w-[381px] font-light">Sua nova experiência em compras online</h1>
                <img src={imgLogo} alt="" className="lg:h-[150px] lg:w-[383px] object-cover" onClick={() => navigate("/")} />
            </section>
            <section className="lg:w-[50vw] lg:bg-slate-100 lg:h-screen flex flex-col lg:justify-center items-center">
                <form className="flex flex-col justify-center items-center bg-white px-5 py-[14px] max-w-[450px] w-full" onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="text-black text-2xl font-semibold pb-6">Fazer Login</h1>
                    <div className="flex flex-col gap-5 w-full items-center justify-center">
                        <label className="text-black flex flex-col w-full justify-center items-center" >
                            <h1 className="pb-2 pl-2 w-full max-w-[280px]">E-mail*</h1>
                            <input placeholder="Digite seu e-mail" required type="email" onChange={(e) => handleLoginInfo(e)}
                                className=" bg-slate-100 p-3 rounded-md min-w-[260px] outline-none lg:w-[300px]"
                                name="email"
                                value={userInput.email}
                            />
                        </label>
                        <label className="text-black flex flex-col w-full justify-center items-center">
                            <h1 className="pb-2 pl-2 w-full max-w-[280px]">Senha*</h1>
                            <input placeholder="Digite sua senha" required type="password" onChange={(e) => handleLoginInfo(e)}
                                className="bg-slate-100 p-3 rounded-md min-w-[260px] outline-none lg:w-[300px]"
                                name="password"
                                value={userInput.password}
                            />
                        </label>
                    </div>
                    <button type="submit" className="w-full max-w-[300px] flex items-center justify-center bg-orange-500 h-[60px] rounded-lg font-bold mt-4 ">
                        Fazer Login
                    </button>
                    <Link to="/sign-up" className="text-stone-500 py-[10px]">
                        Não possui cadastro?<span className="text-orange-500">Clique Aqui</span>
                    </Link>
                </form>
            </section>
        </main>
    )
}
