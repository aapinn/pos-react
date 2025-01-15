'use client';
import { useState, useRef, useEffect } from 'react';
import { BentoGridComponent } from '../components/BentoGridComponent';
import DishComponent from '../components/DishComponent';
import { products } from '../data';
import { ConfirmComponent } from '../components/ConfirmComponent';

function Page() {
  const [items, setItems] = useState([]);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const confirmRef = useRef(null);
  const [customerData, setCustomerData] = useState({});
  
  // Mengecek apakah window (client-side) sudah tersedia
  const isClient = typeof window !== "undefined";

  // Ambil data dari localStorage hanya jika berada di client-side
  useEffect(() => {
    if (isClient) {
      const savedItems = localStorage.getItem('items');
      const savedCustomerData = localStorage.getItem('customerData');
      if (savedItems) setItems(JSON.parse(savedItems));
      if (savedCustomerData) setCustomerData(JSON.parse(savedCustomerData));
    }
  }, [isClient]);

  const clearData = () => {
    setItems([]);
    setCustomerData({});
  };

  // Simpan perubahan items ke localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('items', JSON.stringify(items));
    }
  }, [items, isClient]);

  // Simpan perubahan customerData ke localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('customerData', JSON.stringify(customerData));
    }
  }, [customerData, isClient]);

  const addItem = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setItems((prevItems) => {
        const itemIndex = prevItems.findIndex((item) => item.id === product.id);
        if (itemIndex >= 0) {
          const updatedItems = prevItems.map((item, index) =>
            index === itemIndex ? { ...item, qty: item.qty + 1 } : item
          );
          return updatedItems;
        } else {
          return [...prevItems, { ...product, qty: 1 }];
        }
      });
    }
  };

  const removeItem = (productId) => {
    setItems((prevItems) => {
      return prevItems.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.qty > 1) {
            acc.push({ ...item, qty: item.qty - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const toggleConfirmComponent = () => {
    setIsConfirmVisible((prev) => !prev);
  };

  const saveCustomerData = (data) => {
    setCustomerData(data);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (confirmRef.current && !confirmRef.current.contains(event.target)) {
        setIsConfirmVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative w-full h-full flex justify-center'>
      <div
        ref={confirmRef}
        className={`${
          isConfirmVisible
            ? 'flex opacity-100 scale-100'
            : 'hidden opacity-0 scale-50'
        } justify-center fixed z-50 w-[75%] h-[80%] duration-150`}
      >
        <div className='justify-items-center w-full xl:w-[75%] h-[80%] m-5 my-20'>
          <ConfirmComponent dataCustomer={customerData} items={items} clearData={clearData}/>
        </div>
      </div>

      <main className='w-full bg-neutral-100'>
        <section className='relative container flex lg:w-full gap-5 flex-col justify-between py-2 md:py-5'>
          <BentoGridComponent products={products} addItem={addItem} />
          <DishComponent
            items={items}
            addItem={addItem}
            removeItem={removeItem}
            toggleConfirm={toggleConfirmComponent}
            onSaveCustomerData={saveCustomerData}
            clearData={clearData}
          />
        </section>
      </main>
    </div>
  );
}

export default Page;
