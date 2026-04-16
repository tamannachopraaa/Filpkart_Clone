"use client";
import { useCart } from '@/app/context/CartContext';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
  const savings = cart.reduce((acc, item) => acc + (Math.round(item.price * 0.25) * item.quantity), 0);

  return (
    <main className="bg-[#f1f3f6] min-h-screen">
      <Navbar />
      <div className="max-w-[1200px] mx-auto p-4 flex flex-col md:flex-row gap-4 mt-2">
        {/* Left Side: Items List */}
        <div className="flex-1">
          <div className="bg-white shadow-sm rounded-sm">
            <div className="p-4 border-b border-gray-200 font-bold text-xl">My Cart ({cart.length})</div>
            {cart.length === 0 ? (
              <div className="p-10 text-center text-gray-600">
                <p className="text-lg mb-4">Your cart is empty!</p>
                <Link href="/" className="text-[#2874f0] hover:underline font-semibold">Continue Shopping</Link>
              </div>
            ) : (
              <div>
                {cart.map(item => (
                  <div key={item.id} className="p-4 border-b border-gray-100 flex gap-4 items-start hover:bg-gray-50 transition">
                    <div className="w-24 h-24 bg-gray-50 rounded flex items-center justify-center flex-shrink-0">
                      <img src={item.image_url} alt={item.name} className="max-h-full max-w-full object-contain" onError={(e) => e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3C/svg%3E'} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 line-clamp-2">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-lg font-bold text-green-700">₹{item.price}</p>
                        <p className="text-gray-500 line-through text-sm">₹{Math.round(item.price * 1.25)}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-gray-300 rounded-sm bg-white shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className="px-3 py-2 hover:bg-gray-100 font-semibold text-gray-700">
                            −
                          </button>
                          <span className="px-4 font-medium min-w-[30px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="px-3 py-2 hover:bg-gray-100 font-semibold text-gray-700">
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="font-semibold text-gray-700 hover:text-red-600 transition text-sm">
                          REMOVE
                        </button>
                      </div>
                    </div>
                    <div className="text-right font-bold text-lg">
                      ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Price Details */}
        {cart.length > 0 && (
          <div className="w-full md:w-[360px]">
            <div className="bg-white shadow-sm rounded-sm h-fit sticky top-20">
              <div className="p-4 border-b border-gray-200 text-gray-700 font-bold text-sm uppercase">Price Details</div>
              <div className="p-4 space-y-3 text-sm border-b border-gray-100">
                <div className="flex justify-between text-gray-700">
                  <span>Price ({cart.length} {cart.length > 1 ? 'items' : 'item'})</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount</span>
                  <span>−₹{savings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
              </div>
              
              <div className="p-4 border-b border-gray-200 flex justify-between font-bold text-base">
                <span>Total Amount</span>
                <span className="text-green-700">₹{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="bg-green-50 p-3 text-green-700 text-xs font-semibold text-center border-b border-green-200">
                You will save ₹{savings.toFixed(2)} on this order
              </div>
              
              <div className="p-4">
                <Link href="/checkout">
                  <button className="w-full bg-[#fb641b] text-white py-3 font-bold rounded-sm shadow-md hover:bg-[#f05b15] transition text-base">
                    PLACE ORDER
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
