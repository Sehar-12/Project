// src/components/Payment.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { clearCart, addItemsToOrders } from '../store/CartSlice';

function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price || 0;
      const itemQuantity = item.quantity || 1;
      return total + itemPrice * itemQuantity;
    }, 0).toFixed(2);
  };

  // Payment form state
  const [selectedOption, setSelectedOption] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if payment is processing
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCardDetailsChange = (event) => {
    const { name, value } = event.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handlePayment = () => {
    if (!selectedOption) {
      toast.error('Please select a payment method.');
      return;
    }

    if (selectedOption === 'Card' && (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv)) {
      toast.error('Please fill in all the card details.');
      return;
    }

    setIsSubmitting(true);
    setPaymentStatus('');
    setIsPaymentComplete(false); // Reset payment status before starting new payment

    // Simulate payment process
    setTimeout(() => {
      toast.success('Payment successful! Redirecting to your orders...');
      setPaymentStatus('Your payment was successful.');
      setIsSubmitting(false);
      setIsPaymentComplete(true);

      // Add items to orders and clear cart after payment success
      dispatch(addItemsToOrders(cartItems));
      dispatch(clearCart());

      // Redirect to orders page after short delay to allow toast display
      setTimeout(() => {
        navigate('/orders');
      }, 1500);
    }, 5000); // Simulate payment processing with a 5-second delay
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-cover bg-center"
         style={{ backgroundImage: "url('https://www.example.com/your-background-image.jpg')" }}>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-lg p-10 bg-white rounded-xl shadow-lg shadow-indigo-500/40 space-y-8">
        <h2 className="text-4xl font-semibold text-center text-gray-800">Confirm Your Payment</h2>
        <p className="text-center text-gray-600 text-xl">
          Total amount: <strong className="text-black text-2xl">${calculateTotalPrice()}</strong>
        </p>

        {/* Payment Method Selection */}
        <div className="space-y-6">
          <h3 className="text-2xl font-medium text-gray-800">Choose Your Payment Method</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="upi"
                name="paymentOption"
                value="UPI"
                checked={selectedOption === 'UPI'}
                onChange={handleOptionChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="upi" className="text-lg text-gray-600">UPI (PhonePe, GPay, Paytm)</label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="card"
                name="paymentOption"
                value="Card"
                checked={selectedOption === 'Card'}
                onChange={handleOptionChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="card" className="text-lg text-gray-600">Credit/Debit Card</label>
            </div>
          </div>
        </div>

        {/* Card Details Form */}
        {selectedOption === 'Card' && (
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700" htmlFor="cardNumber">
                Credit Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="Enter your card number"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>

            <div className="flex space-x-6">
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700" htmlFor="expiryDate">
                  Expiry Date (MM/YY)
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={handleCardDetailsChange}
                  className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-700" htmlFor="cvv">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                  className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>
            </div>
          </form>
        )}

        {/* UPI Options */}
        {selectedOption === 'UPI' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="phonepe"
                name="upiOption"
                value="PhonePe"
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="phonepe" className="text-lg text-gray-600">PhonePe</label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="gpay"
                name="upiOption"
                value="GPay"
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="gpay" className="text-lg text-gray-600">GPay</label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="paytm"
                name="upiOption"
                value="Paytm"
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="paytm" className="text-lg text-gray-600">Paytm</label>
            </div>
          </div>
        )}

        {/* Payment Button */}
        <div className="space-y-4">
          <button
            onClick={handlePayment}
            disabled={isSubmitting || isPaymentComplete}
            className="w-full py-3 font-semibold text-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Processing...' : isPaymentComplete ? 'Payment Complete' : `Pay $${calculateTotalPrice()}`}
          </button>
        </div>

        {/* Payment Status */}
        {paymentStatus && !isSubmitting && (
          <div className="mt-6 text-center text-lg text-green-600">
            {paymentStatus}
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
