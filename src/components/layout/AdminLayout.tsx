import Navbar from "@/pages/Home/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingCart,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [userDropdown, setUserDropdown] = useState(false);
  const [orderDropdown, setOrderDropdown] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen mt-[90px]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1 ">
        {/* Sidebar */}
        <div
          className={`fixed lg:relative bg-gray-800 text-white w-64 p-4 transition-all duration-300 h-screen overflow-y-auto
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-64"
          } lg:translate-x-0 lg:block`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            {/* Close Button (Mobile View) */}
            <button className="lg:hidden text-xl" onClick={toggleSidebar}>
              <FaTimes />
            </button>
          </div>

          <ul className="space-y-3 mt-4">
            {/* User Management */}
            <li>
              <button
                className="flex items-center justify-between w-full hover:bg-gray-700 p-2 rounded"
                onClick={() => setUserDropdown(!userDropdown)}
              >
                <span className="flex items-center gap-2">
                  <FaUser /> User Management
                </span>
                <FaChevronDown
                  className={`transition-transform ${
                    userDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {userDropdown && (
                <ul className="pl-6 mt-2 space-y-2">
                  <li className="hover:bg-gray-700 p-2 rounded">
                    <Link to="/admin/users/create-user" onClick={() => setIsSidebarOpen(false)}>Create User</Link>
                  </li>
                  <li className="hover:bg-gray-700 p-2 rounded">
                    <Link to="/admin/users/manage-users" onClick={() => setIsSidebarOpen(false)}>Manage Users</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Order Management */}
            <li>
              <button
                className="flex items-center justify-between w-full hover:bg-gray-700 p-2 rounded"
                onClick={() => setOrderDropdown(!orderDropdown)}
              >
                <span className="flex items-center gap-2">
                  <FaShoppingCart /> Order Management
                </span>
                <FaChevronDown
                  className={`transition-transform ${
                    orderDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {orderDropdown && (
                <ul className="pl-6 mt-2 space-y-2">
                  <li className="hover:bg-gray-700 p-2 rounded">
                    <Link to="/admin/orders/create-order" onClick={() => setIsSidebarOpen(false)}>Create Order</Link>
                  </li>
                  <li className="hover:bg-gray-700 p-2 rounded">
                    <Link to="/admin/orders/view-orders" onClick={() => setIsSidebarOpen(false)}>View Orders</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Settings */}
            <li className="hover:bg-gray-700 p-2 rounded flex items-center gap-2">
              <FaCog />
              <Link to="/admin/settings">Settings</Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {/* Navbar for Mobile */}
          <button onClick={toggleSidebar} className="text-xl lg:hidden">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
