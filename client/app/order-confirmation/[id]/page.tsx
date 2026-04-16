"use client";
import { use, useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';

export default function OrderConfirmation({ params }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  const [email, setEmail] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem('userEmail');
    setEmail(storedEmail || 'your@email.com');
    setIsHydrated(true);
  }, []);

  return (
    <main className="bg-[#f1f3f6] min-h-screen">
      <Navbar />
      <div className="max-w-[600px] mx-auto mt-12 p-8 bg-white shadow-md rounded">
        <div className="text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-4xl text-green-600">✓</div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">Thank you for shopping with Flipkart.</p>
          
          <div className="bg-gray-50 p-6 rounded mb-6 text-left border border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Order Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-bold text-gray-800">#{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold">Confirmed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="text-gray-800">5-7 Business Days</span>
              </div>
            </div>
          </div>

          {/* Email Notification Section */}
          {isHydrated && (
            <div className="bg-blue-50 p-6 rounded mb-6 text-left border border-blue-200">
              <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Confirmation Email Sent
              </h3>
              <p className="text-gray-700 mb-2">We've sent an order confirmation email to:</p>
              <p className="font-semibold text-blue-600 break-all mb-3">{email || 'your@email.com'}</p>
              <p className="text-sm text-gray-600">
                Check your email for order details, tracking information, and important updates about your delivery.
              </p>
            </div>
          )}

          {/* Order Tracking Info */}
          <div className="bg-green-50 p-6 rounded mb-6 text-left border border-green-200">
            <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
              What's Next?
            </h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>✓ Your order has been confirmed</li>
              <li>✓ Payment has been processed</li>
              <li>⏳ Your order is being prepared for shipment</li>
              <li>○ Tracking information will be available soon</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/">
              <button className="bg-[#2874f0] text-white px-8 py-3 font-bold rounded hover:bg-blue-700 transition">
                Continue Shopping
              </button>
            </Link>
            <Link href="/order-history">
              <button className="border-2 border-[#2874f0] text-[#2874f0] px-8 py-3 font-bold rounded hover:bg-blue-50 transition">
                View Order History
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
