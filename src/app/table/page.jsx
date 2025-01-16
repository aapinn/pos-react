"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function OrderHistoryComponent() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    serviceType: "",
    paymentMethod: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false); // Menyimpan status jika sudah di client

  // Pastikan kita hanya mengakses localStorage setelah komponen dimuat di client
  useEffect(() => {
    setIsClient(true); // Set status ke true setelah komponen dimuat di client
  }, []);

  useEffect(() => {
    if (isClient) {
      const orders = [];
      for (const key in localStorage) {
        if (key.startsWith("order_")) {
          const orderData = JSON.parse(localStorage.getItem(key));
          if (orderData) orders.push({ ...orderData, key });
        }
      }
      orders.sort((a, b) => b.timestamp - a.timestamp);
      setOrderHistory(orders);
    }
  }, [isClient]);

  const showOrderDetails = (order) => {
    const timeOrder = new Date(order.timestamp).toLocaleString();
    const customerName = order?.customerData?.name || "No Name";
    const serviceType = order?.customerData?.serviceType || "Unknown";
    const paymentMethod = order?.customerData?.paymentMethod || "Unknown";
    const itemsList = order.items
      .map(
        (item) =>
          `<li>${item.name} - ${item.qty} x Rp ${item.price.toLocaleString()}</li>`
      )
      .join("");
    const totalPrice = (
      order.items.reduce((total, item) => total + item.price * item.qty, 0) *
      1.05
    ).toLocaleString();

    Swal.fire({
      title: "Order Details",
      html: `
          <p style="text-align: left;"><strong>Date:</strong> ${timeOrder}</p>
          <p style="text-align: left;"><strong>Name:</strong> ${customerName}</p>
          <p style="text-align: left;"><strong>Service:</strong> ${serviceType}</p>
          <p style="text-align: left;"><strong>Payment:</strong> ${paymentMethod}</p>
          <ul style="text-align: left;"><strong>Items:</strong> ${itemsList}</ul>
          <p class="font-bold" style="text-align: left; margin-bottom:15px; ">Total Price: Rp ${totalPrice} with Tax 5%</p>
        `,
      confirmButtonText: "Close",
    });
  };

  const deleteOrder = (orderKey) => {
    Swal.fire({
      title: "Enter Password",
      input: "password",
      inputPlaceholder: "Enter password to delete",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (value !== "admin") {
          return "Incorrect password!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value === "admin") {
        localStorage.removeItem(orderKey);
        setOrderHistory((prevOrders) =>
          prevOrders.filter((order) => order.key !== orderKey)
        );
        Swal.fire("Deleted!", "Your order has been deleted.", "success");
      }
    });
  };

  const startEditing = (order) => {
    setEditingOrder(order.key);
    setEditedData({
      name: order.customerData.name || "",
      serviceType: order.customerData.serviceType || "",
      paymentMethod: order.customerData.paymentMethod || "",
    });
  };

  const saveChanges = (orderKey) => {
    const updatedOrder = {
      ...orderHistory.find((order) => order.key === orderKey),
      customerData: { ...editedData },
    };
    localStorage.setItem(orderKey, JSON.stringify(updatedOrder));
    setOrderHistory((prevOrders) =>
      prevOrders.map((order) =>
        order.key === orderKey ? updatedOrder : order
      )
    );
    setEditingOrder(null);
  };

  const filteredOrders = orderHistory.filter((order) =>
    order.customerData.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isClient) return null; // Menjaga agar tidak terjadi kesalahan di sisi server

  return (
    <div className="order-history mx-5 my-5 max-w-4xl md:px-5 z-20 gap-6 mx-auto lg:ml-[15rem] font-sans">
      <h2 className="font-bold text-xl mb-4">Order History</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full mt-1"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => {
            const initial =
              order.customerData.name
                ? order.customerData.name.substring(0, 2).toUpperCase()
                : "-";
            return (
              <div
                key={index}
                className="relative w-[15rem] flex flex-col text-center border p-4 rounded-xl mb-2 bg-green-100/40"
              >
                <div className="flex flex-col">
                  <p className="font-bold border-green-600 border rounded-full absolute px-2">
                    {index + 1}
                  </p>
                  <p className="mt-5 text-7xl bg-green-600 mb-2 text-white font-semibold border rounded-full py-12 mx-4 border-green-500">
                    {initial}
                  </p>
                  <p>
                    <strong className="text-neutral-800">Customer:</strong>{" "}
                    {order?.customerData?.name || "No Name"}
                  </p>
                </div>
                <div className="flex flex-col mx-4">
                  <button
                    onClick={() => showOrderDetails(order)}
                    className="mt-4 bg-green-300 text-green-900 font-bold py-2 px-4 rounded-xl"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => deleteOrder(order.key)}
                    className="mt-4 bg-red-500 text-neutral-100 font-bold py-2 px-4 rounded-xl"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
}

export default OrderHistoryComponent;
