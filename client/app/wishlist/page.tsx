"use client";
import { useState } from 'react';
import { useWishlist, WishlistContextType } from '@/app/context/WishlistContext';
import { useCart } from '@/app/context/CartContext';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image_url?: string;
  [key: string]: any;
}

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [feedback, setFeedback] = useState<Record<number, boolean>>({});

  const handleMoveToCart = (product: WishlistItem) => {
    addToCart(product);
    removeFromWishlist(product.id);
    setFeedback({ ...feedback, [product.id]: true });
    setTimeout(() => {
      setFeedback({ ...feedback, [product.id]: false });
    }, 2000);
  };

  return (
    <main className="bg-[#f1f3f6] min-h-screen">
      <Navbar />
      <div className="max-w-[1200px] mx-auto p-4 mt-4">
        <div className="bg-white shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6 border-b pb-4">My Wishlist ({wishlist.length})</h1>

          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your wishlist is empty</p>
              <Link href="/">
                <button className="bg-[#2874f0] text-white px-6 py-2 rounded font-bold hover:bg-blue-700">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {wishlist.map((product) => (
                <div key={product.id} className="bg-white p-4 border border-gray-100 rounded hover:shadow-lg transition">
                  <div className="h-48 w-full flex items-center justify-center bg-gray-50 rounded mb-3">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>

                  <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h3>
                  <p className="text-green-700 font-bold text-lg mb-3">₹{product.price}</p>

                  {feedback[product.id] && (
                    <div className="bg-green-100 text-green-700 text-xs p-2 rounded mb-2 text-center font-semibold">
                      ✓ Added to cart
                    </div>
                  )}

                  <div className="space-y-2">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="w-full bg-[#ff9f00] text-white py-2 rounded font-bold hover:bg-[#f39700] text-sm transition"
                    >
                      Move to Cart
                    </button>
                    <Link href={`/product/${product.id}`}>
                      <button className="w-full bg-[#2874f0] text-white py-2 rounded font-bold hover:bg-blue-700 text-sm">
                        View Product
                      </button>
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-full border border-gray-300 text-gray-700 py-2 rounded font-semibold hover:bg-gray-50 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
