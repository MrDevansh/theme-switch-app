import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../styles/themeStyles';
import BrandLogo from "../assets/BrandLogo.svg"

export const Sidebar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <aside className="w-64 min-h-screen p-6 bg-[#1E1E1E] text-white shadow-lg">
     <div className="mb-10">
  <Link
    to="/"
    className="text-3xl font-bold font-[Pacifico] bg-gradient-to-r from-[#FF6FD8] via-[#FFDE7D] to-[#69FF97] text-transparent bg-clip-text transition duration-300 hover:brightness-110"
  >
    <img
         src={BrandLogo}
         alt="Brand Logo"
         className="w-8 h-8 object-contain ml-[40%]"
       />
  </Link>
</div>

      <nav className="flex flex-col gap-4 text-base font-medium">
        {navLinks.map((nav) => (
          <Link
            key={nav.to}
            to={nav.to}
            className={`px-3 py-2 rounded transition-colors duration-200 ${
              location.pathname === nav.to
                ? 'bg-[#B68C63] text-white'
                : 'hover:bg-[#2E2E2E]'
            }`}
          >
            {nav.label}
          </Link>
        ))}
      </nav>
      <div className="mt-10">
        <label className="block text-sm mb-2">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as keyof typeof themes)}
          className="w-full px-3 py-2 rounded-md bg-[#2E2E2E] text-white"
        >
          <option value="theme1">Minimal Light</option>
          <option value="theme2">Dark Sidebar</option>
          <option value="theme3">Colorful Grid</option>
        </select>
      </div>
    </aside>
  );
};
