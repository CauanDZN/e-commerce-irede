import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
    const routes = [
        { id: 1, title: "Home", path: "/" },
        { id: 2, title: "Produtos", path: "/produtos" },
        { id: 3, title: "Categorias", path: "/categorias" },
        { id: 4, title: "Meus Pedidos", path: "/meus-pedidos" }
    ]

    const location = useLocation()
    const [updatedLocation, setUpdatedLocation] = useState("/")

    const pathMatches= location.pathname == "/sign-in" || location.pathname == "/sign-up"
    useEffect(() => {
        setUpdatedLocation(location.pathname)
      
    }, [location])

    return (
        <nav>
            {!pathMatches?
                <ul className={`w-screen gap-10 justify-center hidden md:flex max-w-[1440px] py-3 `}>
                    {routes.map((route) => (
                        <li key={route.id} className={`${updatedLocation === route.path?"text-orange-500":"text-zinc-50"}`}>
                            <Link to={`${route.path}`}>{route.title}</Link>
                        </li>
                    ))}
                </ul>:
                <>
                </>
            }

        </nav>
    )
}