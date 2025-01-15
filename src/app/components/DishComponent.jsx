import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiMoneyWavy } from "react-icons/pi";
import { LiaCreditCard } from "react-icons/lia";
import { LuQrCode } from "react-icons/lu";
import Image from "next/image";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function DishComponent({ items = [], addItem, removeItem, toggleConfirm, onSaveCustomerData, clearData }) {
  const [selectedOption, setSelectedOption] = useState("Dine In");
  const [paymentSelect, setPaymentSelect] = useState("Cash");
  const [customerName, setCustomerName] = useState("");

  // Cek apakah di sisi client atau server
  const isClient = typeof window !== "undefined";

  // Fungsi untuk menghapus item dan data customer dari localStorage dan state
  const clearItemsAndCustomerData = () => {
    Swal.fire({
      title: "Clear All Data?",
      text: "This will remove all items and customer data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isClient) {
          localStorage.removeItem("items");
          localStorage.removeItem("customerData");
        }
        clearData();  // Panggil fungsi clearData dari parent untuk membersihkan state
        Swal.fire("Cleared!", "All data has been cleared.", "success");
      }
    });
  };

  const handleSelect = (option) => setSelectedOption(option);
  const handlePayment = (option) => setPaymentSelect(option);

  const saveCustomerData = () => {
    const trimmedName = customerName.trim();
    if (!trimmedName) {
      Swal.fire({
        title: "Enter Valid Customer Name",
        text: "Please enter a name.",
        icon: "error",
      });
      return;
    }

    const customerData = {
      name: trimmedName,
      serviceType: selectedOption,
      paymentMethod: paymentSelect,
    };

    onSaveCustomerData(customerData); // Kirim data ke komponen utama
  };

  useEffect(() => {
    // Cek apakah ada data pelanggan yang sudah disimpan
    if (isClient) {
      const savedCustomerData = localStorage.getItem("customerData");
      if (savedCustomerData) {
        const { name, serviceType, paymentMethod } = JSON.parse(savedCustomerData);
        setCustomerName(name || "");
        setSelectedOption(serviceType || "Dine In");
        setPaymentSelect(paymentMethod || "Cash");
      }
    }
  }, [isClient]);

  return (
    <div className="hidden xl:block xl:fixed bg-white min-w-[18rem] xl:w-[20rem] h-full top-0 right-0 z-30 lg:overflow-y-auto scrollbar-hide">
      <div className="flex flex-col h-[100svh] lg:absolute sticky w-full pt-2 font-sans">
        {/* Header */}
        <header className="pt-3 px-5 h-fit">
          <div className="flex border-b justify-between w-full">
            <div className="w-full">
              <h1 className="font-bold text-xl text-neutral-700">Table Customer</h1>
              <p className="text-sm text-neutral-600 font-sans">Data Customer</p>
              <div className="border w-full justify-center items-center gap-2 flex border-green-500 px-2 rounded-lg my-2">
                <MdDriveFileRenameOutline />
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="outline-none p-2 text-neutral-700 active:outline-none"
                  type="text"
                  placeholder="Customer Name"
                />
              </div>
            </div>
          </div>

          {/* Service Type Buttons */}
          <div className="mt-5">
            <div className="flex justify-between text-neutral-700 bg-neutral-200 h-10 font-bold rounded-xl text-xs">
              {["Dine In", "Take Away", "Delivery"].map((option) => (
                <button
                  key={option}
                  className={`px-5 w-full rounded-xl ${selectedOption === option ? "bg-green-500 text-white" : "bg-gray-200"}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Items */}
        <div className="px-5 flex-grow overflow-y-scroll scrollbar-hide flex flex-col items-start">
          <div className="w-full my-5 flex flex-col gap-3 scrollbar-hide overflow-x-scroll rounded-xl">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-start font-sans text-sm gap-2 border border-neutral-200 p-2 rounded-2xl"
              >
                <div className="item flex gap-2 justify-between">
                  <div className="border border-neutral-200 rounded-xl p-2">
                    <Image priority src={item.image} alt={item.name} width={60} height={50} />
                  </div>
                  <div className="flex flex-col justify-between py-2">
                    <h1 className="font-bold text-neutral-700">{item.name}</h1>
                    <p className="text-xs text-green-600 font-bold">
                      Rp: {item.price.toLocaleString()} <span className="text-neutral-500 pl-2">{item.qty}x</span>
                    </p>
                  </div>
                </div>
                <div className="relative p-2 flex flex-col justify-end">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-1 right-10 border hover:bg-neutral-300 bg-neutral-100 rounded-md"
                  >
                    <FaMinus className="text-green-600 text-xl p-1" />
                  </button>
                  <button
                    onClick={() => addItem(item.id)}
                    className="absolute top-1 right-1 border hover:bg-neutral-300 bg-neutral-100 rounded-md"
                  >
                    <FaPlus className="text-green-600 text-xl p-1" />
                  </button>
                  <p className="font-bold text-xs text-green-600">Rp: {(item.price * item.qty).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className="px-5 pb-5">
          <div className="flex-grow flex flex-col gap-2 grid-cols-2 bg-neutral-100 rounded-xl text-sm text-neutral-700 p-5">
            <div className="flex justify-between font-sans">
              <p>Sub Total</p>
              <p>Rp.{items.reduce((total, item) => total + item.price * item.qty, 0).toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax 5%</p>
              <p>Rp.{items.reduce((total, item) => total + item.price * item.qty * 0.05, 0).toLocaleString()}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="text-neutral-800 font-bold">Total Amount</p>
              <p className="font-bold">
                Rp.
                {items
                  .reduce((total, item) => total + item.price * item.qty * 1.05, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>

          {/* Payment Options */}
          <div className="flex justify-between my-5 gap-3 text-xs">
            {[
              { label: "Cash", icon: PiMoneyWavy },
              { label: "Debit/Credit Card", icon: LiaCreditCard },
              { label: "Qr Code", icon: LuQrCode },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex flex-col justify-center gap-2 items-center">
                <button
                  onClick={() => handlePayment(label)}
                  className={`border-2 rounded-xl py-3 px-5 ${paymentSelect === label ? "border-green-500" : "bg-white"}`}
                >
                  <Icon className="text-xs xl:text-4xl" />
                </button>
                <p>{label}</p>
              </div>
            ))}
          </div>

          {/* Place Order */}
          <button
            onClick={() => {
              saveCustomerData();
              toggleConfirm();
            }}
            className="w-full bg-green-600 text-white font-semibold p-3 rounded-xl"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default DishComponent;
