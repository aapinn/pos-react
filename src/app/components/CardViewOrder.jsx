"use client"
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function OrderHistoryComponent() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null); // Untuk melacak order yang sedang diedit
  const [editedData, setEditedData] = useState({ name: '', serviceType: '', paymentMethod: '' });
  const [searchQuery, setSearchQuery] = useState(''); // State untuk menyimpan query pencarian

  useEffect(() => {
    // Ambil semua kunci yang berhubungan dengan data pesanan
    const orders = [];
    for (const key in localStorage) {
      if (key.startsWith('order_')) {
        const orderData = JSON.parse(localStorage.getItem(key));
        if (orderData) orders.push({ ...orderData, key }); // Menyimpan kunci sebagai bagian dari data
      }
    }
    // Urutkan berdasarkan timestamp terbaru
    orders.sort((a, b) => b.timestamp - a.timestamp);
    setOrderHistory(orders);
  }, []);

  // Fungsi untuk menghapus order dengan konfirmasi password menggunakan SweetAlert2
  const deleteOrder = (orderKey) => {
    Swal.fire({
      title: 'Enter Password',
      input: 'password',
      inputPlaceholder: 'Enter password to delete',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (value !== 'admin') {
          return 'Incorrect password!';
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value === 'admin') {
        // Hapus data order dari localStorage
        localStorage.removeItem(orderKey);
        // Perbarui state untuk menghapus order dari daftar
        setOrderHistory((prevOrders) => prevOrders.filter((order) => order.key !== orderKey));
        Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
      }
    });
  };

  // Fungsi untuk memulai edit data customer
  const startEditing = (order) => {
    setEditingOrder(order.key);
    setEditedData({
      name: order.customerData.name || '',
      serviceType: order.customerData.serviceType || '',
      paymentMethod: order.customerData.paymentMethod || '',
    });
  };

  // Fungsi untuk menyimpan perubahan pada data customer
  const saveChanges = (orderKey) => {
    const updatedOrder = {
      ...orderHistory.find(order => order.key === orderKey),
      customerData: { ...editedData },
    };
    localStorage.setItem(orderKey, JSON.stringify(updatedOrder));
    setOrderHistory((prevOrders) =>
      prevOrders.map((order) =>
        order.key === orderKey ? updatedOrder : order
      )
    );
    setEditingOrder(null); // Mengakhiri mode edit
  };

  // Filter berdasarkan nama customer
  const filteredOrders = orderHistory.filter((order) =>
    order.customerData.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="order-history my-5 max-w-4xl md:px-5 z-20 gap-6 mx-auto lg:ml-[15rem] font-sans">
      <h2 className="font-bold text-xl mb-4">Order History</h2>
      
      {/* Kolom Pencarian */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by customer name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full mt-1"
        />
      </div>
      
      <div className='flex flex-wrap gap-2'>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <div key={index} className="border p-4 rounded mb-2 bg-gray-100">
              <h3 className="font-bold">Order {index + 1}</h3>
              <p><strong>Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>

              {/* Jika sedang mengedit, tampilkan input untuk data customer */}
              {editingOrder === order.key ? (
                <div>
                  <div>
                    <label className="block">Customer Name:</label>
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                      className="border p-2 w-full mt-1"
                    />
                  </div>
                  <div>
                    <label className="block mt-2">Service Type:</label>
                    <select
                      value={editedData.serviceType}
                      onChange={(e) => setEditedData({ ...editedData, serviceType: e.target.value })}
                      className="border p-2 w-full mt-1"
                    >
                      <option value="dine_in">Dine In</option>
                      <option value="take_away">Take Away</option>
                      <option value="delivery">Delivery</option>
                    </select>
                  </div>
                  <button
                    onClick={() => saveChanges(order.key)}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div>
                  <p><strong>Customer Name:</strong> {order?.customerData?.name || "No Name"}</p>
                  <p><strong>Service Type:</strong> {order?.customerData?.serviceType || "Unknown"}</p>
                  <p><strong>Payment Method:</strong> {order?.customerData?.paymentMethod || "Unknown"}</p>
                  <button
                    onClick={() => startEditing(order)}
                    className="mt-4 bg-yellow-600 text-white py-2 px-4 rounded"
                  >
                    Edit Order
                  </button>
                </div>
              )}

              <h4 className="mt-2 font-bold">Items:</h4>
              <ul>
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.name} - {item.qty} x Rp {item.price.toLocaleString()}
                  </li>
                ))}
              </ul>
              <p className="font-bold mt-2">
                Total Price: Rp {order.items.reduce((total, item) => total + item.price * item.qty, 0).toLocaleString()}
              </p>

              <button
                onClick={() => deleteOrder(order.key)}
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded"
              >
                Delete Order
              </button>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
}

export default OrderHistoryComponent;
