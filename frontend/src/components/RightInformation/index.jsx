import { ProductContext } from "../../context/productContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export function RightInformation() {
  const { products } = useContext(ProductContext);
  const categories = [...new Set(products.map((product) => product.categoria_nome))];

  return (
    <ul className="font-semibold text-[10px] min-w-32">
      <p className="pb-[14px] ">Categorias</p>
      {categories.map((category, index) => (
        <li key={index} className="pl-[2px] pb-2">
          <Link to={`/produtos?categoria=${category}`} className="text-white font-light">
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}