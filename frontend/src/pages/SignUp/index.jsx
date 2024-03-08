import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../../assets/logo-e-rede.png";
import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { jwtDecode } from "jwt-decode";

export default function SignUp() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            nome: nome,
            email: email,
            senha: senha
        };

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                const decoded = jwtDecode(data.token);
                localStorage.setItem("token", data.token);
                setUser(decoded);
                navigate("/");
            } else {
                console.error('Erro ao cadastrar usuário');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };

    return (
        <main className="flex flex-col h-screen justify-center gap-7 pt-8 pb-7 lg:p-0 lg:flex-row-reverse">
            <section className="lg:w-[50vw] flex flex-col justify-center items-center gap-7">
                <h1 className="hidden lg:block text-3xl max-w-[381px] font-light">Sua nova experiência em compras online</h1>
                <img src={imgLogo} alt="" className="lg:h-[150px] lg:w-[383px] object-cover" onClick={() => navigate("/")} />
            </section>
            <section className="lg:w-[50vw] lg:bg-slate-100 lg:h-screen flex flex-col lg:justify-center items-center">
                <form className="flex flex-col justify-center items-center bg-white px-5 py-[14px] max-w-[450px] w-full" onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="text-black text-2xl font-semibold pb-6">Cadastre-se</h1>
                    <div className="flex flex-col gap-5 w-full items-center justify-center">
                        <label className="text-black flex flex-col w-full justify-center items-center">
                            <h1 className="pb-2 pl-2 w-full max-w-[280px]">Nome*</h1>
                            <input placeholder="Digite seu nome" required className=" bg-slate-100 p-3 rounded-md min-w-[260px] outline-none lg:w-[300px]" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </label>
                        <label className="text-black flex flex-col w-full justify-center items-center">
                            <h1 className="pb-2 pl-2 w-full max-w-[280px]">Email*</h1>
                            <input placeholder="Digite seu e-mail" required type="email" className=" bg-slate-100 p-3 rounded-md min-w-[260px] outline-none lg:w-[300px]" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className="text-black flex flex-col w-full justify-center items-center">
                            <h1 className="pb-2 pl-2 w-full max-w-[280px]">Senha*</h1>
                            <input placeholder="Digite sua senha" required type="password" className="bg-slate-100 p-3 rounded-md min-w-[260px] outline-none lg:w-[300px]" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </label>
                    </div>
                    <button type="submit" className="w-full max-w-[300px] flex items-center justify-center bg-orange-500 h-[60px] rounded-lg font-bold mt-4 ">
                        Fazer Cadastro
                    </button>
                    <Link to="/sign-in" className="text-stone-500 py-[10px]">
                        Já possui cadastro?<span className="text-orange-500">Clique Aqui</span>
                    </Link>
                </form>
            </section>
        </main>
    );
}
