import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import "./serchBox.css";

function SearchBox({ onSearch }) {
  const [inputValue,setInputValue] = useState("")

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

const handleSearch = (e)=>{
    e.preventDefault()
    onSearch(inputValue)
}

  return (
    <form onSubmit={handleSearch} className="max-w-md mx-auto">
      <div className="relative search mx-4">
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          className="block w-full h-full p-2 ps-3 pe-5"
          placeholder="What do you look for..."
        />
        <button type="submit" className="btn absolute">
          <RiSearchLine />
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
