import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../../assets/logo-e-rede.png";
import {  useContext, useState } from "react";
import { UserContext } from "../../context/userContext";

export default function SignIn() {
    const navigate= useNavigate()
    const {setUser} = useContext(UserContext)

    const[userInput, setUserInput]=useState({email:"", password:""})
    const userTeste = {email:"darlan.mendes@irede.org.br", password:"123456"}

    function testeLogin(){
        if(userInput.email === userTeste.email && userInput.password === userTeste.password){
           setUser({email:userInput.email, name:"Darlan Mendes", id:1233, avatar:"https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"})
           window.location.href="/"
          
        }else{
            alert("Erro ao tentar se logar")
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        testeLogin()
    }
    const handleLoginInfo=(e)=>{
            setUserInput(previous=>({...previous,[e.target.name]:e.target.value}))
    }

    return (
        <main className="flex flex-col  gap-7 h-screen justify-center pt-8 pb-7 lg:p-0 lg:flex-row-reverse">
            <section className="lg:w-[50vw] flex flex-col justify-center items-center gap-7">
                <h1 className="hidden lg:block text-3xl max-w-[381px] font-light">Sua nova experiência em compras online</h1>
                <img src={imgLogo} alt="" className="lg:h-[150px] lg:w-[383px] object-cover"
                onClick={()=>navigate("/")}
                />
            </section>
            <section className="lg:w-[50vw] lg:bg-slate-100 lg:h-screen flex flex-col lg:justify-center items-center">
            <form className="flex flex-col justify-center items-center bg-white px-5 py-[14px] max-w-[450px] w-full" onSubmit={(e)=>handleSubmit(e)}>
                <h1 className="text-black text-2xl font-semibold pb-6">Fazer Login</h1>
                <div className="flex flex-col gap-5 w-full items-center justify-center">
                    <label className="text-black flex flex-col w-full justify-center items-center" >
                        <h1 className="pb-2 pl-2 w-full max-w-[280px]">Email*</h1>
                        <input placeholder="Digite seu e-mail" required type="email" onChange={(e)=>handleLoginInfo(e)}
                        className=" bg-slate-100 p-3 rounded-md min-w-[260px] outline-none lg:w-[300px]" 
                        name="email"
                        value={userInput.email}
                        />
                    </label>
                    <label className="text-black flex flex-col w-full justify-center items-center">
                        <h1 className="pb-2 pl-2 w-full max-w-[280px]">Senha*</h1>
                        <input placeholder="Digite sua senha" required type="password" onChange={(e)=>handleLoginInfo(e)}
                        className="bg-slate-100 p-3 rounded-md min-w-[260px] outline-none lg:w-[300px]" 
                        name="password"
                        value={userInput.password}
                        />
                    </label>

                </div>
                <button className="w-full max-w-[300px] flex items-center justify-center bg-orange-500 h-[60px] rounded-lg font-bold mt-4 ">
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