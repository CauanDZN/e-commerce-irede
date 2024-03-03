import { MdOutlineShoppingCart } from "react-icons/md";
import ModalCart from "../ModalCart";

export function CartButton({ totalItemsCart, showModal, setShowModal }) {
  return (
    <div className="flex items-center justify-center">
      <button className="peer absolute" onClick={() => setShowModal(true)}>
        <MdOutlineShoppingCart className="text-white text-2xl " />
      </button>

      {totalItemsCart > 0 && (
        <div className="h-2 w-2 flex justify-center items-center rounded-full relative -top-4 -right-2 bg-red-500 p-3 ">
          {totalItemsCart}{" "}
        </div>
      )}

      {showModal && <ModalCart onClose={() => setShowModal(false)} />}
    </div>
  );
}