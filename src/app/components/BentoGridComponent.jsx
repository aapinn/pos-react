import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "../../components/ui/bento-grid";
import { products } from "../data";
import SearchComponent from "./searchComponent";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function BentoGridComponent({ addItem }) {
  // State untuk menyimpan produk yang difilter
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [lottieLoaded, setLottieLoaded] = useState(false); // State untuk lottie

  // Fungsi untuk menangani pencarian dari komponen SearchComponent
  const handleSearchFromParent = (searchQuery) => {
    // Periksa apakah query pencarian kosong
    if (!searchQuery) {
      setFilteredProducts(products); // Jika kosong, tampilkan semua produk
      return;
    }

    const filteredItems = products.filter((product) => {
      // Pastikan firstName ada dan merupakan string sebelum memanggil toLowerCase()
      return product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredProducts(filteredItems); // Set produk yang difilter
  };

  // Efek untuk memuat Lottie sebelum komponen render
  useEffect(() => {
    setLottieLoaded(true); // Set Lottie loaded saat pertama kali dimount
  }, []);

  return (
    <div className="max-w-4xl md:px-5 z-20 gap-6 xl:mr-[18rem] mx-auto lg:ml-[13rem] font-sans">
      <SearchComponent onSearch={handleSearchFromParent} />

      {/* Menampilkan pesan jika tidak ada produk yang ditemukan */}
      {filteredProducts.length === 0 ? (
        <div className="relative m-auto w-full h-svh flex flex-col items-center py-5">
          <h1 className="italic">Produk tidak ditemukan</h1>

          {/* Pastikan Lottie hanya ditampilkan jika sudah dimuat */}
          {lottieLoaded && (
            <DotLottieReact
              className="w-[50rem]"
              src="https://lottie.host/c9819c4c-e787-4e0a-b86c-edfe66588b60/2dTfNBA4z2.lottie"
              loop
              autoplay
            />
          )}
        </div>
      ) : (
        <BentoGrid>
          {filteredProducts.map((item) => (
            <BentoGridItem
              key={item.id}
              title={item.name}
              description={item.description || "No description available"}
              header={item.image || <Skeleton />}
              alt={item.name}
              price={`Rp.${item.price.toLocaleString()}`}
              rate={item.rate || "N/A"}
              id={item.id}
              addItem={addItem}
            />
          ))}
        </BentoGrid>
      )}
    </div>
  );
}

// Skeleton placeholder untuk header/gambar
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
