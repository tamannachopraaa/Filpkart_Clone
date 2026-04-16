"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

interface Order {
  id: number;
  email: string;
  phone: string;
  address: string;
  total_amount: number;;
  created_at: string;
  items?: Array<{id: number; product_id: number; quantity: number; price: number}>;
  [key: string]: any;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all orders from backend (in production, would fetch only user's orders)
    const fetchOrders = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/orders`);
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load order history');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="bg-[#f1f3f6] min-h-screen">
        <Navbar />
        <div className="max-w-[1200px] mx-auto p-10 text-center">
          <p className="text-gray-600">Loading order history...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f1f3f6] min-h-screen">
      <Navbar />
      <div className="max-w-[1200px] mx-auto p-4 mt-4">
        <div className="bg-white shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6 border-b pb-4">Order History</h1>

          {error && (
            <div className="bg-red-50 p-4 rounded text-red-600 mb-4">
              {error}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No orders yet</p>
              <Link href="/">
                <button className="bg-[#2874f0] text-white px-6 py-2 rounded font-bold hover:bg-blue-700">
                  Start Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-lg">Order #{order.id}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-700">₹{parseFloat(order.total_amount).toFixed(2)}</p>
                      <p className="text-green-600 text-sm font-semibold">Confirmed</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Delivery Address:</strong> {order.shipping_address}
                    </p>
                    <p className="text-gray-500 text-xs">
                      <strong>Estimated Delivery:</strong> 5-7 Business Days from order date
                    </p>
                  </div>

                  <Link href={`/order-confirmation/${order.id}`}>
                    <button className="mt-3 text-[#2874f0] font-semibold hover:underline">
                      View Details →
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
