import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ProductContext } from "../../context/productContext"


import { CartContext } from "../../context/cartContext"
import { UserContext } from "../../context/userContext"

export default function ProductDetailed(){
    const params = useParams()
    const [chosenItem, setChosenItem] = useState()
    const {products} = useContext(ProductContext)
    const{cart, setCart} = useContext(CartContext)
    const{user} = useContext(UserContext)
   
    useEffect(()=>{
        setChosenItem(products.filter((item)=>item.id===Number(params.id))[0])
    },[params])
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
    return(
        <main className="w-screen bg-white py-10 flex flex-col justify-center items-center text-blue-900 px-4">
            <div className="bg-slate-100 max-w-[600px] w-full min-w-[260px] flex  gap-10 p-4 rounded-lg flex-col md:flex-row items-center ">
                <img src={chosenItem?.img} alt={chosenItem?.tittle} className="h-64 w-72 object-cover rounded-lg  "/>
                <div className="flex flex-col justify-center p-4">
                    <h1 className="text-2xl font-semibold">{chosenItem?.tittle}</h1>
                    <span className="text-stone-500 text-lg">{chosenItem?.category}</span>
                    <p className="text-orange-500 font-semibold">{chosenItem?.price}</p>
                    <p className="text-stone-500">dent aliquid libero! Numquam vero iste deserunt, qui inventore dolorum tempora? Deserunt eveniet minima ut ad.</p>
                    <button className="bg-blue-900 text-zinc-50 my-2 h-10 rounded-lg"
                    onClick={()=>{handleCart(chosenItem)}}
                    >
                        Adicionar ao Carrinho
                    </button>
                    </div>
            </div>
        </main>
    )
}