import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function OrdersPage() {
  const orders = useSelector((state) => state.cart.orders); // Access orders from Redux store
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Log orders to see if pdfFilename is available
  console.log("Orders Data:", orders);

  // Function to handle "Read Now" button click
  const handleReadNow = (pdfPath) => {
    // Check if the pdfPath is defined
    if (pdfPath) {
      // Construct the full URL to the PDF
      const pdfUrl = `https://project-rh6i.onrender.com${pdfPath}`;
      
      // Open the PDF in a new tab
      window.open(pdfUrl, '_blank');
    } else {
      console.log("PDF not available for this book.");
    }
  };

  // If there are no orders, show a message to the user
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-800">Your Orders</h1>
        <p className="mt-4 text-xl text-gray-600">You have no orders yet.</p>
        <p className="text-lg text-gray-500 mt-2">Start shopping to add items to your orders!</p>
        <button
          onClick={() => navigate('/')} // Navigate to the home page using useNavigate
          className="mt-6 px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-12 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">Your Orders</h2>
      <ul className="space-y-6">
        {orders.map((item, index) => (
          <li key={index} className="flex items-center justify-between p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
            <div className="flex items-center">
              <img src={item.image} alt={item.title} className="w-24 h-32 object-cover rounded-lg mr-6" />
              <div className="flex flex-col">
                <strong className="text-xl font-semibold text-gray-700">{item.title}</strong>
                <div className="text-lg text-gray-600">${item.price ? item.price.toFixed(2) : '0.00'}</div>
              </div>
            </div>
            <div className="text-lg text-gray-700">Quantity: {item.quantity}</div>
            <button
              onClick={() => handleReadNow(item.pdfFilename)} // Passing the pdf path to handleReadNow
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition duration-300"
            >
              Read Now
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate('/')} // Navigate to the home page using useNavigate
          className="px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrdersPage;
