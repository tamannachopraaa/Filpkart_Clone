"use client";
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';

interface NavbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export default function Navbar({ searchValue = '', onSearchChange }: NavbarProps) {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav className="bg-[#2874f0] text-white py-2 px-4 md:px-10 flex items-center justify-between sticky top-0 z-50 h-auto md:h-16 shadow-md">
      <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 flex-shrink-0">
        <div className="flex flex-col leading-none">
          <h1 className="text-lg md:text-xl italic font-bold">Flipkart</h1>
          <span className="italic text-[10px] md:text-[11px] font-medium text-[#ffe500]">Plus <span className="text-white">✦</span></span>
        </div>
      </Link>
      
      {/* Search Bar - Hidden on mobile */}
      <div className="hidden md:flex bg-white items-center px-4 py-2 rounded-sm flex-grow mx-6 max-w-[500px] shadow-sm">
        <input 
          type="text" 
          placeholder="Search for products, brands and more" 
          className="text-gray-800 outline-none w-full text-sm"
          value={searchValue}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
        <svg className="w-5 h-5 text-[#2874f0]" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
      </div>
      
      <div className="flex gap-2 md:gap-6 font-semibold items-center flex-shrink-0 text-xs md:text-sm">
        <button className="hidden md:block bg-white text-[#2874f0] px-8 py-1 rounded-sm font-bold hover:opacity-90">Login</button>
        
        <Link href="/wishlist" className="flex items-center gap-1 md:gap-2 hover:opacity-90 relative py-1">
          <span className="text-lg md:text-base">♡</span>
          <span className="hidden md:inline">Wishlist</span>
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-2 md:-right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {wishlist.length}
            </span>
          )}
        </Link>

        <Link href="/order-history" className="flex items-center gap-1 md:gap-2 hover:opacity-90 py-1">
          <span className="text-lg md:text-base">📦</span>
          <span className="hidden md:inline">Orders</span>
        </Link>
        
        <Link href="/cart" className="flex items-center gap-1 md:gap-2 hover:opacity-90 relative py-1">
          <span className="text-lg md:text-base">🛒</span>
          <span className="hidden md:inline">Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 md:-right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}