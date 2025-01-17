// /components/Header.tsx
import React from "react";
import SearchBar from "./search-bar"; // Import SearchBar component

const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-gray-800 bg-opacity-50 text-white shadow-md flex items-center justify-between p-4">
      {/* Title */}
      <div className="text-2xl font-semibold">Sangihe Island</div>

      {/* Menu Items */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="hover:text-blue-400">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-400">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-400">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Search Bar */}
      <SearchBar />
    </header>
  );
};

export default Header;
