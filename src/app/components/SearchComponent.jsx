import React, { useState } from 'react';
import { RiMenu4Fill } from "react-icons/ri";
import { LuSettings2 } from "react-icons/lu";

function SearchComponent({ onSearch, collapse }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Kirimkan query pencarian ke komponen induk
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex p-2 z-50 rounded-xl flex-row items-center gap-3 mx-auto sticky top-5 bg-white shadow-md transition-all duration-300">

      {/* Input Pencarian */}
      <input
        className="flex-grow rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search product here ..."
      />

      {/* Tombol Settings */}
      <button
        onClick={collapse}
        className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-2xl transition-colors duration-200"
      >
        <LuSettings2 />
      </button>
    </div>
  );
}

export default SearchComponent;
