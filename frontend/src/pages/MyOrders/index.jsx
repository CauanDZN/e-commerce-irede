import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";

function MyOrders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders");
      const data = await response.json();
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col md:flex-row bg-white text-stone-500 w-screen px-8 md:px-12 lg:px-24 md:py-24 py-8 md:gap-8">
      <section className="bg-slate-100 py-8 px-11 flex flex-col justify-center w-full lg:max-w-[852px] md:max-w-[600px] rounded-md">
        {isLoading ? (
          <p>Carregando...</p>
        ) : orders.length === 0 ? (
          <div>
            <p>Você não tem nenhum pedido.</p>
            <p>Que tal fazer algumas compras agora?</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-container mb-8">
              <h1>Compra do dia: {order.date}</h1>
              <p>Status da Venda: {order.status}</p>
              {order.products.map((product) => (
                <div key={product.id} className="flex items-center border-b border-gray-200 py-4">
                  <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                  <div>
                    <h2 className="font-bold">{product.name}</h2>
                    <p>R$ {product.price}</p>
                    <p>Quantidade: {product.quantity}</p>
                    <p>Preço Total: R$ {product.totalPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default MyOrders;
