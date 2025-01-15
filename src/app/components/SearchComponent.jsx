import React, { useState, useEffect } from 'react';
import { RiMenu4Fill } from "react-icons/ri";
import { LuSettings2 } from "react-icons/lu";

function SearchComponent({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Kirimkan query pencarian ke komponen induk
    onSearch(query);
  };

  return (
    <div className='flex flex-row gap-3'>
        <button className='w-auto p-3 rounded-xl bg-white text-2xl'>
          <RiMenu4Fill />
        </button>
        <input 
          className='flex-grow rounded-xl px-5' 
          type="text" 
          value={searchQuery} 
          onChange={handleSearch} 
          placeholder='Search product here ...' 
        />
        <button className='w-auto p-3 rounded-xl bg-white text-2xl'>
          <LuSettings2 />
        </button>
    </div>
  );
}

export default SearchComponent;
