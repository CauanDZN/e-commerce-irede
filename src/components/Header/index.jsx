import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoERede from "../../assets/logo-e-rede.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { CartContext } from "../../context/cartContext";
import ModalCarrinho from "../ModalCarrinho";
import { ProductContext } from "../../context/productContext";
import NavBarMobile from "../NavBarMobile";




function Botoes() {
    const { user } = useContext(UserContext) ? useContext(UserContext) : { user: false }
    const { cart } = useContext(CartContext)
    const [totalItemsCart, setTotalItemsCart] = useState(0)
    useEffect(() => {
        let total = 0
        cart?.products.forEach((product) => {
            total += product.qtt
        })
        setTotalItemsCart(total)
    }, [cart])

    return (
        <div className="flex justify-center items-center md:w-full max-w-[289px] gap-5">
            {user ?
                <div className="flex items-center justify-center gap-5">
                    <img src={user.avatar} alt={user} className="h-10 w-10 rounded-full hidden lg:block" />
                    <h1 className="hidden lg:block">Olá , {user.name}</h1>
                </div>

                :
                <>
                    <Link to="sign-up" className="hidden md:flex">Cadastre-se</Link>
                    <Link to="sign-in" className="bg-orange-500 h-10 w-32 rounded-lg items-center justify-center  hidden md:flex">Entrar</Link>
                </>

            }
            <div className="flex items-center justify-center">
                <button className="peer absolute">
                    <MdOutlineShoppingCart className="text-white text-2xl " />
                </button>

                {totalItemsCart > 0 &&
                    <div className="h-2 w-2 flex justify-center items-center rounded-full relative -top-4 -right-2 bg-red-500 p-3 ">{totalItemsCart} </div>
                }
                <div className="peer-focus:block hidden">
                    <ModalCarrinho />
                </div>
            </div>
        </div>
    )
}


function InputHeader() {
    const [searchKey, setSearchKey] = useState('')
    const [filteredList, setFilteredList] = useState()
    const {products}= useContext(ProductContext)
    const navigate = useNavigate()
    const listFoundItems = () => {
        if(searchKey.length>=2){
            setFilteredList(products.filter((item)=> item.tittle.toLowerCase().includes(searchKey.toLowerCase())
            ||item.category.toLowerCase().includes(searchKey.toLowerCase())
            ))
        }else{
            setFilteredList("")
        }
        
    }
    const handleSearchInput = (e) => {
        setSearchKey(e.target.value)
        listFoundItems()
    }
    const handleSearchedItemChosen=(id)=>{
        setSearchKey("")
        setFilteredList("")
        navigate(`/produtos/${id}`)
    }
    return (
        <div className="text-stone-500 text-base px-3 w-full md:max-w-[520px] h-11 relative">
            <input className="bg-zinc-50 flex gap-2 w-full left-0 rounded-md
                items-center px-3 absolute h-11
                 outline-none
                  placeholder:text-stone-500 pl-11"
                placeholder="Buscar"
                onChange={(e) => handleSearchInput(e)}
                value={searchKey}
            />
            <IoMdSearch className="text-2xl absolute h-11 ml-3 left-0" />
            {filteredList&&filteredList.map((itemList)=>(
                <div key={itemList.id} className="flex justify-between w-full bg-zinc-50 text-blue-900 px-4 py-2 shadow-sm z-20 relative top-10"
                onClick={()=>{handleSearchedItemChosen(itemList.id)}}
                >
                   <h1>{itemList.tittle}</h1> <span className="text-stone-500 text-xs">Categoria:{itemList.category}</span>
                </div>
            ))}

        </div>
    )
}


function LogoHeader() {
    return (
        <div className="flex flex-col justify-center items-start md:w-full max-w-[206px]">
            <img src={logoERede} alt="Logo E-rede" className=" h-[28px]" />
        </div>

    )
}
function MenuHamburguer() {
    return (
        <div className=" flex justify-start items-center md:hidden">
            <GiHamburgerMenu className="text-2xl" />
        </div>
    )
}

export default function Header() {
    const location = useLocation()
    const pathMatches = location.pathname === "/sign-up" || location.pathname === "/sign-in"
    const [showMob, setShowMob] = useState(false)
    return (
        <>
            {!pathMatches ?
                <header className={`p-8 lg:px-[107px] w-full max-w-[1440px]`}>

                    <div className={`flex flex-row justify-between  place-content-between items-center  w-full max-w-[1226px] pb-3 md:pb-0}`}>
                        <div onClick={()=>setShowMob(true)}>
                        <MenuHamburguer />
                        </div>
                        
                        <NavBarMobile showMob={showMob} setShowMob={setShowMob}/>
                        <LogoHeader />
                        <div className="hidden md:flex w-full md:max-w-[300px] lg:max-w-[520px]">
                            <InputHeader />
                        </div>

                        <Botoes />

                    </div>
                    <div className="flex md:hidden">
                        <InputHeader />
                    </div>

                </header>
                :
                <></>
            }
        </>



    )
}