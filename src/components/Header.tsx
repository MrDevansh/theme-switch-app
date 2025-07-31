import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import BrandLogo from '../assets/BrandLogo.svg';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-[#191919] shadow-md py-3 text-[#232B2B] dark:text-[#F0ECE5] transition-all select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold flex items-center gap-2">
          <img src={BrandLogo} alt="Brand Logo" className="w-8 h-8 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((nav) => (
            <Link
              key={nav.to}
              to={nav.to}
              className={`hover:text-[#0D9488] ${
                location.pathname === nav.to ? 'text-[#B68C63] underline underline-offset-4' : ''
              }`}
            >
              {nav.label}
            </Link>
          ))}
        </nav>

        {/* Theme Selector */}
        <div className="flex items-center gap-4">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
            className="px-2 py-1 rounded border"
          >
            <option value="theme1">Theme 1</option>
            <option value="theme2">Theme 2</option>
            <option value="theme3">Theme 3</option>
          </select>

          {/* Hamburger Icon */}
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white dark:bg-[#191919] shadow-md">
          {navLinks.map((nav) => (
            <Link
              key={nav.to}
              to={nav.to}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm font-medium ${
                location.pathname === nav.to ? 'text-[#B68C63]' : 'text-[#232B2B] dark:text-white'
              } hover:text-[#0D9488]`}
            >
              {nav.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
