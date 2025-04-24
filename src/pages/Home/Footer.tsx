import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12 ">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">BookBazaar</h2>
          <p className="text-sm">
            Discover and buy your favorite books. We offer fast delivery and top-rated service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/all-products" className="hover:text-blue-600">All Products</Link></li>
            <li><Link to="/aboutUs" className="hover:text-blue-600">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-blue-600">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-blue-600">Shipping Info</Link></li>
            <li><Link to="/returns" className="hover:text-blue-600">Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><Facebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600"><Instagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><Twitter /></a>
            <a href="mailto:info@bookbazaar.com" className="hover:text-green-600"><Mail /></a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t py-4 text-center text-sm">
        © {new Date().getFullYear()} BookBazaar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;