"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image_url?: string;
  [key: string]: any;
}

export interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on startup
  useEffect(() => {
    const savedWishlist = localStorage.getItem('flipkart_wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('flipkart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev; // Already in wishlist
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id: number) => {
    return wishlist.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
