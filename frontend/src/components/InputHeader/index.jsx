import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { ProductContext } from "../../context/productContext";

function InputHeader() {
  const [searchKey, setSearchKey] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchKey.length >= 2) {
      setFilteredList(
        products.filter(
          (item) =>
            item.title.toLowerCase().includes(searchKey.toLowerCase()) ||
            item.category.toLowerCase().includes(searchKey.toLowerCase())
        )
      );
    } else {
      setFilteredList([]);
    }
  }, [searchKey, products]);

  const handleSearchInput = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSearchedItemChosen = (id) => {
    setSearchKey("");
    navigate(`/produtos/${id}`);
  };

  return (
    <div className="text-stone-500 text-base px-3 w-full md:max-w-[520px] h-11 relative">
      <input
        className="bg-zinc-50 flex gap-2 w-full left-0 rounded-md items-center px-3 absolute h-11 outline-none placeholder:text-stone-500 pl-11"
        placeholder="Buscar"
        onChange={handleSearchInput}
        value={searchKey}
      />
      <IoMdSearch className="text-2xl absolute h-11 ml-3 left-0" />
      {filteredList.map((itemList) => (
        <div
          key={itemList.id}
          className="flex justify-between w-full bg-zinc-50 text-blue-900 px-4 py-2 shadow-sm z-20 relative top-10"
          onClick={() => {
            handleSearchedItemChosen(itemList.id);
          }}
        >
          <h1>{itemList.title}</h1>{" "}
          <span className="text-stone-500 text-xs">Categoria:{itemList.category}</span>
        </div>
      ))}
    </div>
  );
}

export default InputHeader;
