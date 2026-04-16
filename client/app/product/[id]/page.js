"use client";
import { useEffect, useState, use } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';

export default function ProductDetail({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    if (id) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      axios.get(`${apiUrl}/api/products/${id}`)
        .then(res => {
          setProduct(res.data);
          setInWishlist(isInWishlist(parseInt(id)));
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, isInWishlist]);

  const handleWishlist = () => {
    if (product) {
      if (inWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
      setInWishlist(!inWishlist);
    }
  };

  if (loading) return <div className="text-center p-10 text-gray-500">Loading...</div>;
  if (!product) return <div className="text-center p-10 text-red-500 font-bold">Product not found</div>;

  const images = product.images && Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : (product.image_url ? [product.image_url] : []);

  return (
    <main className="bg-[#f1f3f6] min-h-screen">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white px-4 py-3 text-sm text-gray-600 border-b">
        <div className="max-w-[1200px] mx-auto flex gap-2">
          <Link href="/" className="hover:text-[#2874f0] font-medium">Home</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">{product.category}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto p-4 mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left: Product Images */}
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm sticky top-20">
            {/* Main Image */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center h-80 rounded-sm mb-3 relative overflow-hidden group">
              <img 
                src={images[currentImageIndex]} 
                alt={`Product ${currentImageIndex + 1}`}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  console.warn(`Failed to load image: ${images[currentImageIndex]}`);
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12"%3EImage Error%3C/text%3E%3C/svg%3E';
                }}
              />
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 flex items-center justify-center bg-gray-100 transition ${
                      idx === currentImageIndex 
                        ? 'border-[#2874f0]' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="max-h-14 max-w-14 object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="md:col-span-2 space-y-3">
          
          {/* Product Info */}
          <div className="bg-white p-5 rounded-sm border border-gray-100 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-sm text-xs font-bold">
                <span>4.5 ★</span>
              </div>
              <span className="text-gray-600 text-sm">115,675 Ratings & 42,234 Reviews</span>
            </div>

            {/* Price Section */}
            <div className="bg-green-50 p-4 rounded-sm mb-4 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-green-700">₹{product.price}</span>
                <span className="text-gray-500 line-through text-lg">₹{Math.round(product.price * 1.5)}</span>
                <span className="ml-2 bg-[#ff9f00] text-white px-2 py-1 rounded-sm text-xs font-bold">58% OFF</span>
              </div>
              <p className="text-green-700 text-xs font-semibold">Save ₹{Math.round(product.price * 0.58)}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-600">Delivery to:</span>
                <span className="font-semibold text-gray-900">Check Pincode</span>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-600">Seller:</span>
                <span className="font-semibold text-[#2874f0]">Flipkart</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span className="text-green-600 font-semibold">In Stock - {product.stock_quantity} available</span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white p-5 rounded-sm border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">Key Highlights</h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3">
                <span className="text-gray-400 min-w-fit">Category:</span>
                <span className="text-gray-700 font-semibold uppercase">{product.category}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-gray-400 min-w-fit">Type:</span>
                <span className="text-gray-700">Premium Quality</span>
              </div>
              <div className="flex gap-3">
                <span className="text-gray-400 min-w-fit">Warranty:</span>
                <span className="text-gray-700">1 Year Manufacturer Warranty</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-5 rounded-sm border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-[#ff9f00] hover:bg-[#e68900] active:bg-[#d67800] text-white py-3 px-4 font-bold rounded-sm shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-base tracking-wide"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span>ADD TO CART</span>
            </button>
            <button className="flex-1 bg-[#fb641b] hover:bg-[#e85a0d] active:bg-[#d64800] text-white py-3 px-4 font-bold rounded-sm shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-base tracking-wide">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span>BUY NOW</span>
            </button>
            <button 
              onClick={handleWishlist}
              className={`flex-1 py-3 px-4 font-bold rounded-sm shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-base tracking-wide ${
                inWishlist 
                  ? 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800'
              }`}
            >
              <svg className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${inWishlist ? 'fill-current' : 'fill-none stroke-current'}`} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span>{inWishlist ? 'SAVED' : 'WISHLIST'}</span>
            </button>
          </div>

          {/* Benefits */}
          <div className="bg-white p-5 rounded-sm border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Why buy from Flipkart?</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl mb-2">🚚</span>
                <p className="text-xs text-gray-700"><span className="font-bold">Free Delivery</span> Across India</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl mb-2">◀</span>
                <p className="text-xs text-gray-700"><span className="font-bold">Easy Returns</span> 7 days return</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl mb-2">🛡️</span>
                <p className="text-xs text-gray-700"><span className="font-bold">Secure</span> Buyer Protection</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl mb-2">✓</span>
                <p className="text-xs text-gray-700"><span className="font-bold">Authentic</span> 100% Genuine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
