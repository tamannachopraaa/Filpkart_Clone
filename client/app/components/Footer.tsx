"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#172033] text-white mt-12">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase">About Flipkart</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition">Press</Link></li>
              <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition">Work with Us</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase">Help</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Track Order</Link></li>
              <li><Link href="#" className="hover:text-white transition">Cancel Order</Link></li>
              <li><Link href="#" className="hover:text-white transition">Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition">FAQs</Link></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase">Policy</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="#" className="hover:text-white transition">Return Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-white transition">Security</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Sitemap</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-sm mb-4 uppercase">Follow Us</h4>
            <div className="flex gap-4 text-xl">
              <Link href="#" className="hover:text-[#2874f0] transition">f</Link>
              <Link href="#" className="hover:text-[#2874f0] transition">𝕏</Link>
              <Link href="#" className="hover:text-[#2874f0] transition">📷</Link>
              <Link href="#" className="hover:text-[#2874f0] transition">▶</Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>© 2024 Flipkart Clone. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <span>Made with ❤️ by Developer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
