"use client";
import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';
import Navbar from '@/app/components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { clearWishlist } = useWishlist();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Address validation
    if (!address.trim()) {
      newErrors.address = "Please enter a shipping address";
    } else if (address.trim().length < 20) {
      newErrors.address = "Address must be at least 20 characters (include street, city, state, PIN)";
    } else if (address.trim().length > 500) {
      newErrors.address = "Address cannot exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      setErrors({ cart: "Your cart is empty" });
      return;
    }

    // Check if any item is out of stock (basic check)
    const outOfStockItems = cart.filter(item => !item.id || !item.price);
    if (outOfStockItems.length > 0) {
      setErrors({ cart: "Some items in your cart are no longer available" });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/orders`, {
        items: cart,
        total_amount: subtotal,
        shipping_address: address,
        customer_email: email,
        customer_phone: phone
      });

      if (response.data.success) {
        // Save email for confirmation page
        localStorage.setItem('userEmail', email);
        // Clear cart and wishlist immediately without refresh
        clearCart();
        clearWishlist();
        router.push(`/order-confirmation/${response.data.orderId}`);
      } else {
        setErrors({ submit: response.data.error || "Order failed. Please try again." });
      }
    } catch (err: unknown) {
      console.error(err);
      let errorMessage = "Order failed. Please try again.";
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosError = err as any;
        errorMessage = axiosError.response?.data?.error || axiosError.message || errorMessage;
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="bg-[#f1f3f6] min-h-screen">
        <Navbar />
        <div className="max-w-[800px] mx-auto p-10 text-center">
          <p className="text-gray-600 text-lg">Your cart is empty. Please add items before checkout.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f1f3f6] min-h-screen">
      <Navbar />
      <div className="max-w-[800px] mx-auto p-4 flex flex-col gap-4">
        {/* Error Alert */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {errors.submit}
          </div>
        )}

        {/* Customer Contact Information */}
        <div className="bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold border-b pb-4 mb-4">CONTACT INFORMATION</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email"
              className={`w-full border p-3 outline-none rounded transition ${
                errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input 
              type="tel"
              className={`w-full border p-3 outline-none rounded transition ${
                errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="10-digit number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold border-b pb-4 mb-4">DELIVERY ADDRESS</h2>
          <textarea 
            className={`w-full border p-3 outline-none rounded transition ${
              errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
            rows={5}
            placeholder="Enter your full shipping address (e.g., House No., Street, City, State, PIN Code)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            maxLength={500}
          />
          <div className="flex justify-between mt-2">
            <p className="text-xs text-gray-500">This address will be used for delivery</p>
            <p className="text-xs text-gray-500">{address.length}/500</p>
          </div>
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold border-b pb-4 mb-4">ORDER SUMMARY</h2>
          <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <div className="flex-1">
                  <span className="text-gray-700 line-clamp-2 pr-2">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500">(x{item.quantity})</span>
                </div>
                <span className="font-semibold whitespace-nowrap ml-2">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between text-gray-600 py-2">
              <span>Delivery Charges</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between font-bold text-xl py-3 border-t border-dashed pt-4">
              <span>Total Payable</span>
              <span className="text-green-700">₹{subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Info */}
          <div className="bg-blue-50 p-3 rounded mb-4 text-sm text-gray-700">
            <p className="font-semibold mb-1">💳 Payment Method</p>
            <p>This is a demo. No actual charges will be made.</p>
          </div>

          <button 
            onClick={handlePlaceOrder}
            disabled={loading || cart.length === 0}
            className="w-full bg-[#fb641b] text-white py-4 font-bold shadow-md uppercase hover:bg-[#f05b15] disabled:opacity-50 disabled:cursor-not-allowed rounded transition"
          >
            {loading ? "Processing..." : "CONFIRM ORDER"}
          </button>
        </div>
      </div>
    </main>
  );
}
