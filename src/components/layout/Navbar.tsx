import { useState } from "react";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu
  const [showSearch, setShowSearch] = useState(false); // Desktop Search
  const [showCart, setShowCart] = useState(false); // Order Cart Drawer
  const [showMobileSearch, setShowMobileSearch] = useState(false); // Mobile Search Modal

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          {/* Left Side - Logo */}
          <h1 className="text-2xl font-bold whitespace-nowrap md:pr-8 lg:-pr-0">
            BookBazaar
          </h1>

          {/* Center Menu - Home, About, Contact (only desktop) */}
          <div className="hidden md:flex md:space-x-4 font-medium lg:space-x-6 whitespace-nowrap md:pr-6 lg:pr-0">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#" className="hover:text-blue-600">
              All Products
            </a>
            <a href="#" className="hover:text-blue-600">
              Our Services
            </a>
            <a href="#" className="hover:text-blue-600">
              Gallery
            </a>
            <a href="#" className="hover:text-blue-600">
              About Us
            </a>
            <a href="#" className="hover:text-blue-600">
              Contact
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 ">
            {/* Desktop Search */}
            <div className="hidden md:relative lg:right-6  md:block">
              <Button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 bg-transparent hover:bg-transparent focus:outline-none focus:ring-0 active:bg-transparent text-black "
              >
                <Search size={24} />
              </Button>
              {showSearch && (
                <div className="absolute top-0 right-12 bg-white shadow-lg p-2 rounded-md">
                  <Input type="text" placeholder="Search..." className="w-60" />
                </div>
              )}
            </div>

            {/* Mobile Search Button */}
            <div className="md:hidden">
              <Button
                onClick={() => setShowMobileSearch(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Search size={24} />
              </Button>
            </div>

            {/* Order Cart Button */}
            <Button
              onClick={() => setShowCart(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart size={24} />
            </Button>

            {/* Login Icon */}
            <Button className="p-2 hover:bg-gray-100 rounded-full">
              <User size={24} />
            </Button>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg py-3 space-y-2">
            <a href="#" className="block px-4 py-2">
              Home
            </a>
            <a href="#" className="block px-4 py-2">
              All Products
            </a>
            <a href="#" className="block px-4 py-2">
              Our Services
            </a>
            <a href="#" className="block px-4 py-2">
              Gallery
            </a>
            <a href="#" className="block px-4 py-2">
              About
            </a>
            <a href="#" className="block px-4 py-2">
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Search</h2>
              <Button
                onClick={() => setShowMobileSearch(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </Button>
            </div>
            <Input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      )}

      {/* Order Cart Drawer */}
      {showCart && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-30 z-40"
            onClick={() => setShowCart(false)}
          ></div>
          {/* Drawer Container */}
          <div className="fixed top-0 right-0 h-full bg-white shadow-xl z-50 w-full md:w-1/2 lg:w-1/3 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Order</h2>
              <Button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </Button>
            </div>
            {/* Order details content here */}
            <p>Your order details go here...</p>
          </div>
        </>
      )}
    </>
  );
}
