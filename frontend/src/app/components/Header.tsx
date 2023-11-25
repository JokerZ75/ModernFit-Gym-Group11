import Link from "next/link";
import React from "react";

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <header className="bg-blue-100 p-5 py-8 pb-7 sticky top-0 flex md:px-48 md:py-10 z-50">
      <div
        className="text-2xl md:text-4xl text-white font-extrabold my-auto"
        id="logo"
      >
        <Link href="/" className="hover:text-orange-100 transition-all duration-500">
          <h1>ModernFit</h1>
        </Link>
      </div>
      <div className="ml-auto" id="nav-container">
        {children}
      </div>
    </header>
  );
};

export default Header;
