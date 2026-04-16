"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from './components/Navbar';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  [key: string]: any;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    // Fetching data from your Express backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    axios.get(`${apiUrl}/api/products`)
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        
        // Extract unique categories
        const uniqueCategories: string[] = ['All', ...new Set(res.data.map((p: Product) => p.category) as string[])];
        setCategories(uniqueCategories);
      })
      .catch((err: any) => console.log("Error fetching products:", err));
  }, []);

  // Handle search and category filter
  useEffect(() => {
    let filtered: Product[] = products;

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p: Product) => p.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((p: Product) => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <main className="bg-[#f1f3f6] min-h-screen">
      <Navbar searchValue={searchTerm} onSearchChange={setSearchTerm} />
      
      {/* Category Filter - Enhanced Flipkart Style */}
      <div className="bg-white sticky top-[56px] z-40 shadow-md border-b-2 border-[#f1f3f6]">
        <div className="max-w-[1200px] mx-auto overflow-x-auto hide-scrollbar">
          <div className="flex gap-0 px-4 min-w-min">
            {categories.map((category: string) => {
              const getCategoryIcon = (cat: string) => {
                switch(cat) {
                  case 'All':
                    return '🛍️';
                  case 'Mobiles':
                    return '📱';
                  case 'Electronics':
                    return '⚡';
                  case 'Fashion':
                    return '👕';
                  case 'Home & Kitchen':
                    return '🏠';
                  case 'Books':
                    return '📚';
                  case 'Sports':
                    return '⚽';
                  default:
                    return '📦';
                }
              };
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex flex-col items-center gap-1 px-4 py-4 font-medium whitespace-nowrap transition-all border-b-4 text-xs ${
                    selectedCategory === category
                      ? 'text-[#2874f0] border-[#2874f0] bg-blue-50'
                      : 'text-gray-700 border-transparent hover:bg-gray-50'
                  }`}
                >
                  <span className="text-2xl">{getCategoryIcon(category)}</span>
                  <span className="max-w-[80px] truncate text-xs font-semibold">{category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Product Grid */}
      <div className="max-w-[1200px] mx-auto p-4 mt-2">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            {searchTerm && <p className="text-gray-400 text-sm mt-2">Try a different search term</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product: Product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <div className="bg-white flex flex-col h-[340px] hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 rounded-sm overflow-hidden group hover:-translate-y-1">
                  {/* Product Image Container */}
                  <div className="h-48 w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
                    {/* Discount Badge */}
                    <div className="absolute top-2 right-2 bg-[#ff9f00] text-white px-2 py-1 rounded-sm text-xs font-bold z-10 shadow-md">
                      20% OFF
                    </div>
                    
                    {/* Stock Indicator */}
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-sm text-xs font-bold z-10 shadow-md">
                      In Stock
                    </div>
                    
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        onError={(e: any) => {
                          console.warn(`Failed to load image for ${product.name}:`, product.image_url);
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <p className="text-sm">No Image</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-3 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-2 h-9 group-hover:text-[#2874f0] transition-colors">{product.name}</h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-1 mb-2">
                        <span className="flex text-xs gap-0">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </span>
                        <span className="text-xs text-gray-600 ml-1">(152)</span>
                      </div>
                    </div>
                    
                    {/* Price Section */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-700 font-bold text-lg">₹{product.price}</span>
                        <span className="text-gray-500 text-xs line-through">₹{Math.round(product.price * 1.25)}</span>
                      </div>
                      <p className="text-gray-600 text-xs mt-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                        Free delivery
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
