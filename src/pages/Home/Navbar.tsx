import { useEffect, useState } from "react";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logOut } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { removeFromCart } from "@/redux/features/auth/cartSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu
  const [showSearch, setShowSearch] = useState(false); // Desktop Search
  const [showCart, setShowCart] = useState(false); // Order Cart Drawer
  const [showMobileSearch, setShowMobileSearch] = useState(false); // Mobile Search Modal

  const location = useLocation();

  useEffect(() => {
    setShowCart(false);
    setShowMobileSearch(false);
  }, [location]);

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleDeleteFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          {/* Left Side - Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold whitespace-nowrap md:pr-8 lg:-pr-0"
          >
            BookBazaar
          </NavLink>
          <Button onClick={handleLogOut}>LogOut</Button>
          {/* Center Menu - Home, About, Contact (only desktop) */}
          <div className="hidden md:flex md:space-x-4 font-medium lg:space-x-6 whitespace-nowrap md:pr-6 lg:pr-0">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <NavLink to="all-products" className="hover:text-blue-600">
              All Products
            </NavLink>
            <NavLink to="/ourServices" className="hover:text-blue-600">
              Our Services
            </NavLink>
            <NavLink to="/gallery" className="hover:text-blue-600">
              Gallery
            </NavLink>
            <NavLink to="/aboutUs" className="hover:text-blue-600">
              About Us
            </NavLink>
            <NavLink to="/contact" className="hover:text-blue-600">
              Contact
            </NavLink>
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

            <div className="relative">
              <Button
                onClick={() => setShowCart(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ShoppingCart size={24} />
              </Button>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>

            {/* Login Icon */}
            <NavLink
              to="/admin/dashboard"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <User size={24} />
            </NavLink>

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
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2"
            >
              Home
            </NavLink>
            <NavLink
              to="/allProducts"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2"
            >
              All Products
            </NavLink>
            <NavLink
              to="/ourServices"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2"
            >
              Our Services
            </NavLink>
            <NavLink
              to="/gallery"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2"
            >
              Gallery
            </NavLink>
            <NavLink
              to="/aboutUs"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2"
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2"
            >
              Contact
            </NavLink>
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
          <div className="fixed top-0 right-0 h-full bg-white shadow-xl z-50 w-full md:w-1/2 lg:w-1/3 flex flex-col p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Order</h2>
              <Button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </Button>
            </div>

            {/* Order details */}
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty</p>
            ) : (
              <div className="flex-1 space-y-4 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.images}
                        alt={item.title}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div>
                        <h4 className="font-semibold text-sm">
                          <Link to={`/book-details/${item._id}`}>{item.title}</Link> {/* Added Link */}
                        </h4>
                        <p className="text-sm text-gray-600">${item.price}</p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteFromCart(item._id)}
                    >
                      <X size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Total & View Cart fixed at bottom */}
            <div className="mt-6 border-t pt-4 sticky bottom-0 bg-white">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price, 0)
                    .toFixed(2)}
                </span>
              </div>
              <Link to="view-orders">
                <Button className="w-full mt-4">View Cart</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
