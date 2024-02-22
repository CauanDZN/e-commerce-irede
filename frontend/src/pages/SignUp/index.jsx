import { Link,useNavigate } from "react-router-dom";
import imgLogo from "../../assets/logo-e-rede.png"
export default function SignUp(){
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    return(
        <main className="flex flex-col h-screen justify-center gap-7 pt-8 pb-7 lg:p-0 lg:flex-row-reverse">
        <section className="lg:w-[50vw] flex flex-col justify-center items-center gap-7">
            <h1 className="hidden lg:block text-3xl max-w-[381px] font-light">Sua nova experiência em compras online</h1>
            <img src={imgLogo} alt="" className="lg:h-[150px] lg:w-[383px] object-cover"
             onClick={()=>navigate("/")}
            />
        </section>
        <section className="lg:w-[50vw] lg:bg-slate-100 lg:h-screen flex flex-col lg:justify-center items-center">
        <form className="flex flex-col justify-center items-center bg-white px-5 py-[14px] max-w-[450px] w-full" onSubmit={(e)=>handleSubmit(e)}>
            <h1 className="text-black text-2xl font-semibold pb-6">Cadastre-se</h1>
            <div className="flex flex-col gap-5 w-full items-center justify-center">
            <label className="text-black flex flex-col w-full justify-center items-center">
                    <h1 className="pb-2 pl-2 w-full max-w-[280px]">Nome*</h1>
                    <input placeholder="Digite seu nome" required className=" bg-slate-100 p-3 rounded-md min-w-[260px] outline-none lg:w-[300px]" />
                </label>
                <label className="text-black flex flex-col w-full justify-center items-center">
                    <h1 className="pb-2 pl-2 w-full max-w-[280px]">Email*</h1>
                    <input placeholder="Digite seu e-mail" required type="email" className=" bg-slate-100 p-3 rounded-md min-w-[260px] outline-none lg:w-[300px]" />
                </label>
                <label className="text-black flex flex-col w-full justify-center items-center">
                    <h1 className="pb-2 pl-2 w-full max-w-[280px]">Senha*</h1>
                    <input placeholder="Digite sua senha" required type="password" className="bg-slate-100 p-3 rounded-md min-w-[260px] outline-none lg:w-[300px]" />
                </label>

            </div>
            <button className="w-full max-w-[300px] flex items-center justify-center bg-orange-500 h-[60px] rounded-lg font-bold mt-4 ">
                Fazer Cadastro
            </button>
            <Link to="/sign-in" className="text-stone-500 py-[10px]">
                Já possui cadastro?<span className="text-orange-500">Clique Aqui</span>
            </Link>
        </form>
        </section>
        

    </main>
    )
}