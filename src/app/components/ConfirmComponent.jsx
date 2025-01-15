import Image from 'next/image';
import React from 'react';
import Swal from 'sweetalert2';

export const ConfirmComponent = ({ items, dataCustomer, clearData }) => {
  // Fungsi untuk memproses seluruh items dan menyimpan ke localStorage
  const ConfirmAll = (items) => {
    if (!items || items.length === 0) {
      Swal.fire({
        title: "Empty Dish",
        text: "Check your items again",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Order Placed",
        text: "Thank you for your order!",
        icon: "success",
      }).then(() => {
        // Simpan data statis ke localStorage dengan ID unik
        const orderData = {
          timestamp: new Date().toISOString(),
          items,
          customerData: dataCustomer,
        };
        const orderKey = `order_${Date.now()}`;
        localStorage.setItem(orderKey, JSON.stringify(orderData));

        clearData(); // Hapus semua data items setelah konfirmasi
      });
    }
  };

  return (
    <div className="relative font-sans w-full h-full rounded-xl border-2 flex flex-col justify-between scrollbar-hide border-green-300 shadow-xl bg-white overflow-y-scroll">
      <div className="p-3 flex flex-col">
        {/* Detail Customer */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-neutral-700">Customer Details</h2>
          <p className="text-sm text-neutral-600">
            <strong>Name:</strong> {dataCustomer.name || "-"}
          </p>
          <p className="text-sm text-neutral-600">
            <strong>Service Type:</strong> {dataCustomer.serviceType || "-"}
          </p>
          <p className="text-sm text-neutral-600">
            <strong>Payment Method:</strong> {dataCustomer.paymentMethod || "-"}
          </p>
        </div>

        {/* Daftar Items */}
        <div className="flex w-full flex-col gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-start font-sans text-sm gap-2 border border-neutral-200 p-2 rounded-2xl"
            >
              <div className="item flex gap-2 justify-between">
                <div className="border border-neutral-200 rounded-xl p-2">
                  <Image
                    priority
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={50}
                  />
                </div>
                <div className="flex flex-col justify-between py-2">
                  <h1 className="font-bold text-neutral-700">{item.name}</h1>
                  <p className="text-xs text-green-600 font-bold">
                    Rp: {item.price.toLocaleString()}
                    <span className="text-neutral-500 pl-2">{item.qty}x</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer dengan Checkout */}
      <footer className="w-full sticky bottom-0">
        <div className="flex-grow flex flex-col gap-2 grid-cols-2 bg-neutral-100 text-sm text-neutral-700 p-5">
          <div className="flex justify-between font-sans">
            <p>Sub Total</p>
            <p>
              Rp.
              {items
                .reduce((total, item) => total + item.price * item.qty, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Tax 5%</p>
            <p>
              Rp.
              {items
                .reduce((total, item) => total + item.price * item.qty * 0.05, 0)
                .toLocaleString()}
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p className="border-t-neutral-700 text-neutral-800 font-bold">
              Total Amount
            </p>
            <p className="font-bold">
              Rp.
              {items
                .reduce(
                  (total, item) =>
                    total + item.price * item.qty + item.price * item.qty * 0.05,
                  0
                )
                .toLocaleString()}
            </p>
          </div>
        </div>
        <button
          onClick={() => ConfirmAll(items)}
          className="w-full bg-green-600 text-white font-semibold p-3 rounded-xl"
        >
          Checkout
        </button>
      </footer>
    </div>
  );
};
