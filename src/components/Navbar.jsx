import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FiUser, FiMenu, FiX, FiSettings, FiBell, FiHelpCircle, FiHome, FiCreditCard } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = {
    name: "Guest User",
    email: "guest@example.com",
    avatar: null,
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-white/20 border-b border-white/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          BIIT Sports
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 relative">

          <Link to="/" className="hover:text-green-500 transition font-medium">Home</Link>
          <Link to="/features" className="hover:text-green-500 transition font-medium">Features</Link>
          <Link to="/events" className="hover:text-green-500 transition font-medium">Events</Link>

          {/* Profile Icon */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100/40 text-green-700 backdrop-blur-sm hover:bg-green-200/50 transition"
            >
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <FiUser size={16} />
              )}
            </button>

            {/* Animated Right-Aligned Dropdown */}
            {profileOpen && (
              <div className="absolute top-12 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-3 z-50 animate-dropdown-fade">
                {/* User Info */}
                <div className="flex items-center px-4 py-3 space-x-3">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <FiUser />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{user.name}</span>
                    <span className="text-sm text-gray-500 truncate">{user.email}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-2"></div>

                {/* Normal Options */}
                <Link to="/dashboard" className="flex items-center px-4 py-2 hover:bg-green-50 transition">
                  <FiHome className="mr-2" /> Dashboard
                </Link>
                <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-green-50 transition">
                  <FiUser className="mr-2" /> Profile
                </Link>
                <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-green-50 transition">
                  <FiSettings className="mr-2" /> Settings
                </Link>
                <Link to="/notifications" className="flex items-center px-4 py-2 hover:bg-green-50 transition">
                  <FiBell className="mr-2" /> Notifications
                </Link>
                <Link to="/help" className="flex items-center px-4 py-2 hover:bg-green-50 transition">
                  <FiHelpCircle className="mr-2" /> Help
                </Link>
                <Link to="/billing" className="flex items-center px-4 py-2 hover:bg-green-50 transition">
                  <FiCreditCard className="mr-2" /> Billing
                </Link>

                {/* Divider */}
                <div className="border-t border-gray-200 my-2"></div>

                {/* Danger Section (Always Red) */}
                <div className="flex flex-col">
                  <Link
                    to="/logout"
                    className="px-4 py-2 font-medium text-red-600 rounded hover:bg-red-100 transition"
                  >
                    Logout
                  </Link>
                  <Link
                    to="/delete-account"
                    className="px-4 py-2 font-medium text-red-600 rounded hover:bg-red-100 transition"
                  >
                    Delete Account
                  </Link>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center text-green-700 focus:outline-none"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <Link to="/" className="block px-6 py-3 hover:bg-green-50 transition">Home</Link>
          <Link to="/features" className="block px-6 py-3 hover:bg-green-50 transition">Features</Link>
          <Link to="/events" className="block px-6 py-3 hover:bg-green-50 transition">Events</Link>
          <Link to="/dashboard" className="block px-6 py-3 hover:bg-green-50 transition">Dashboard</Link>
          <Link to="/profile" className="block px-6 py-3 hover:bg-green-50 transition">Profile</Link>
          <Link to="/settings" className="block px-6 py-3 hover:bg-green-50 transition">Settings</Link>
          <Link to="/notifications" className="block px-6 py-3 hover:bg-green-50 transition">Notifications</Link>
          <Link to="/help" className="block px-6 py-3 hover:bg-green-50 transition">Help</Link>
          <Link to="/billing" className="block px-6 py-3 hover:bg-green-50 transition">Billing</Link>
          <Link to="/logout" className="block px-6 py-3 hover:bg-red-100 text-red-600 font-medium transition">Logout</Link>
          <Link to="/delete-account" className="block px-6 py-3 hover:bg-red-100 text-red-600 font-medium transition">Delete Account</Link>
        </div>
      )}

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes dropdown-fade {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-dropdown-fade {
            animation: dropdown-fade 0.2s ease-out forwards;
          }
        `}
      </style>
    </nav>
  );
}