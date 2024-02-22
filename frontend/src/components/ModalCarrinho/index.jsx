import { useContext, useState } from "react"
import { CartContext } from "../../context/cartContext"
import { ProductContext } from "../../context/productContext"

export default function ModalCarrinho() {
    const { cart } = useContext(CartContext)
    const { products } = useContext(ProductContext)
    
    let listCart = []
    let total = 0
    cart?.products.forEach((product, index) => {

        let teste = products?.filter(item => item.id === product.product_id)
        listCart.push({ ...teste[0], qtt: cart?.products[index].qtt })
    })
    listCart.forEach((item)=>{
        total += item.qtt * eval(item.price.replace(",","."))
    })
   

    return (
        <div  className="bg-zinc-50 text-black w-72 p-7 rounded-lg absolute top-2 right-2 z-50 shadow">
            <h1 className="pb-4 font-bold border-b-[1px] border-stone-800">Meu Carrinho</h1>
            {listCart.length>0?listCart.map((item) => (
                <div key={item.id} className="flex gap-4 pr-4 pt-4">
                
                    <img src={item.img} alt={item.tittle} className="w-20 h-[70px]" />
                    <div className="flex flex-col justify-center ">
                        <h1 className="text-[14px] font-semibold">{item.tittle}</h1>
                        <span className="text-[10px] text-stone-500">{item.category}</span>
                        <span className="text-xs font-semibold py-2">R${item.price}</span>
                        <span className="text-xs "> Qtd:{item.qtt}</span>
                    </div>
                
                    
                </div>
            )):
            <h1 className="p-4 ">
                Você não possui itens adicionados ao carrinho
                </h1>
                }
            <h1 className="py-4 border-t-[1px] border-stone-900 mt-4 text-base font-semibold">
                Valor total:
                <strong className="text-blue-900 font-bold ml-4">R$ {total}</strong> 
                </h1>
            <footer className="flex justify-between gap-2">
                <button className="text-xs w-full">Esvaziar</button>
                <button className="bg-blue-900 h-6 text-zinc-50 w-full text-xs rounded-md">Finalizar Compra</button>
            </footer>
        </div>
    )
}