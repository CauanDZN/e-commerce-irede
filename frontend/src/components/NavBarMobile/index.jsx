import { useLocation } from "react-router-dom"
import { routes } from "../../routes"
import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import { Link } from "react-router-dom"
export default function NavBarMobile({showMob, setShowMob}) {
    const location = useLocation()
    const { user, setUser } = useContext(UserContext)
    return (
        <div className={` ${showMob?"flex":"hidden"} w-screen peer-focus:hidden fixed top-0 left-0 z-50`} onClick={()=>setShowMob(false)}>
            <div className="h-screen md:hidden w-full  max-w-[264px] p-6 bg-white opacity-100 flex flex-col ">
                <h1 className="text-black font-semibold pb-4">Páginas</h1>
                <ul className="flex-1 flex flex-col">
                    {routes.map((route) => (
                        <Link key={route.id} to={route.path}
                            className={`text-xs p-3 rounded-md font-semibold
                        ${route.path === location.pathname ? "text-orange-500 bg-slate-100" : "text-stone-500 bg-white"}`}
                        >{route.tittle}
                        </Link>
                    ))}
                </ul>

                
                    {user ? <div className="text-blue-900 px-4 h-8 border-t-[1px] rounded-b-md border-stone-500 focus:bg-slate-100"
                    onClick={()=>setUser(null)}
                    >
                        Sair
                    </div> :
                        <div className="flex items-center gap-2">
                            <Link to="/sign-up" className="text-stone-500 text-xs flex-1 ">Cadastre-se</Link>
                            <Link to="/sign-in" className="text-white text-xs bg-blue-900 flex-1 px-2 text-center py-1 rounded-md">Entrar</Link>
                        </div>
                    }
                
            </div>
            <div className="w-full h-screen bg-black opacity-40">

            </div>
        </div>
    )
}