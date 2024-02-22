import tenis from "../../assets/tenis.webp"
import { Link, useNavigate } from "react-router-dom"
import imgDesk from "../../assets/promo-banner-desk.png"
import imgMob from "../../assets/promo-banner-mobile.png"
import { useContext } from "react"
import { CartContext } from "../../context/cartContext"
import { UserContext } from "../../context/userContext"
import { ProductContext } from "../../context/productContext"
function Card({ highlighted }) {
    const { cart, setCart } = useContext(CartContext)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const handleCart = (product) => {
        if (user) {
            if (cart) {
                let cartLocal = cart
                let indexProd = cartLocal.products.findIndex((item) => item.product_id === product.id)
                if (indexProd > -1) {
                    let products = []
                    cart.products.forEach((product, index) => {
                        if (index !== indexProd) {
                            products.push(product)
                        }
                    })
                    setCart(previous => ({ ...previous, products: [...products, { product_id: product.id, qtt: cart.products[indexProd].qtt += 1 }] }))
                }
                else {
                    setCart(previous => ({ ...previous, products: [...cart.products, { product_id: product.id, qtt: 1 }] }))
                }
            } else {
                setCart({
                    id_user: user.id,
                    products: [
                        {
                            product_id: product.id,
                            qtt: 1
                        }
                    ]
                })
            }
        } else {
            navigate("/sign-in")
        }
    }
    
    return (
        <div className=" shadow-sm w-36 h-52 md:w-44 md:h-64 rounded-md bg-white">
            <img src={highlighted.img} alt="card produto " className="h-24 md:h-32 w-44 object-cover" />
            <div className="px-3 py-2 ">
                <h1 className="text-blue-900 font-bold">{highlighted.tittle}</h1>
                <span className="text-stone-500">{highlighted.category}</span>
                <h3 className="text-orange-500 font-semibold">{highlighted.price}</h3>
                <button className="bg-blue-900 w-20 h-6 rounded-md text-center text-[12px]"
                    onClick={() => handleCart(highlighted)}
                > Comprar </button>
            </div>

        </div>
    )
}
function Promo() {
    const promo = { imgMob: imgMob, imgDesk: imgDesk }
    return (
        <div className="w-full relative md:block flex justify-center items-center  ">
            <img src={promo.imgMob} alt="Banner Promo mobile" className="md:hidden w-full max-h-[400px] object-cover" />
            <img src={promo.imgDesk} alt="Banner Promo desktop " className="hidden md:flex w-full" />
            <Link to="/promo" className="bg-orange-500 absolute bottom-10 md:right-10 lg:right-30 xl:right-60 2xl:-120 w-[331px] md:w-80 text-center h-16 rounded-md flex items-center justify-center text-xl">Aproveitar Oferta</Link>
        </div>

    )
}
function Destaques() {
    const {products} = useContext(ProductContext)
    const highlighteds = [
        { id: 1, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "R$ 220,00" },
        { id: 2, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "R$ 220,00" },
        { id: 3, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "R$ 220,00" },
        { id: 4, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "R$ 220,00" },
        { id: 5, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "R$ 220,00" },
        { id: 6, tittle: "Nique Air Surf", img: tenis, category: "Tênis", price: "R$ 220,00" },


    ]
    return (
        <div className="bg-zinc-50  w-full flex flex-col xl:px-24 justify-center items-center lg:pb-18 pb-4">

            <h1 className="text-blue-900 font-semibold text-xl py-6 pl-7  w-full">Destaques</h1>
            <div className="grid xl:grid-cols-6 xl:gap-10 lg:grid-cols-5 lg:gap-8 md:grid-cols-4 md:gap-6 grid-cols-2 gap-2 place-items-center lg:w-full">
                {products?.map((highlighted, index) => (

                    <Card key={index} highlighted={highlighted} />

                ))}
            </div>
        </div>
    )
}
export default function Home() {
    return (
        <main>
            <section className="flex flex-wrap  justify-center">
                <Promo />
                <Destaques />
            </section>
        </main>
    )
}