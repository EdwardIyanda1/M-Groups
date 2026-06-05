// src/components/Layout.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Wallet, ShoppingCart, Search, LogOut } from 'lucide-react';

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F2] text-black antialiased selection:bg-[#B9E88A]">
      
      {/* Neo-Brutalist Global Header Navbar */}
      <nav className="bg-white border-b-4 border-black sticky top-0 z-50 px-4 py-4 md:px-12 select-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Brand Identity Badge */}
          <Link 
            to="/" 
            onClick={() => setMenuOpen(false)} 
            className="flex items-center gap-2 border-2 border-black bg-[#B9E88A] px-3.5 py-1.5 font-sans font-black text-sm uppercase tracking-tight shadow-[2px_2px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000000] transition-all"
          >
            <Wallet size={16} strokeWidth={2.5} />
            <span>M-Groups</span>
          </Link>

          {/* Desktop Navigation Link Arrays */}
          <div className="hidden md:flex items-center gap-6 text-xs font-black uppercase tracking-wider">
            <Link to="/" className="hover:text-[#3B52F6] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#3B52F6] transition-colors">About</Link>
            <Link to="/services" className="hover:text-[#3B52F6] transition-colors">Loans</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-[#3B52F6] transition-colors">Dashboard</Link>
                <Link to="/cart" className="flex items-center gap-1.5 hover:text-[#3B52F6] transition-colors">
                  <ShoppingCart size={14} strokeWidth={2.5} /> Cart
                </Link>
                <Link to="/search" className="hover:text-[#3B52F6] transition-colors">
                  <Search size={14} strokeWidth={2.5} />
                </Link>
                
                {(user?.role === 'manager' || user?.is_staff) && (
                  <Link to="/admin" className="bg-[#FFFF00] border-2 border-black px-2.5 py-1 text-[11px] shadow-[2px_2px_0px_#000000]">
                    Admin Panel
                  </Link>
                )}
                
                <button 
                  onClick={logout} 
                  className="bg-[#FF6B6B] border-2 border-black text-black px-3 py-1 rounded-none text-xs font-black shadow-[2px_2px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-1"
                >
                  Logout <LogOut size={12} strokeWidth={2.5} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-3 py-1.5 hover:underline">Sign In</Link>
                <Link 
                  to="/register" 
                  className="bg-[#3B52F6] text-white border-2 border-black px-4 py-2 shadow-[2px_2px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#000000] transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Mobile Toggle */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden p-1.5 border-2 border-black bg-white shadow-[2px_2px_0px_#000000]"
          >
            {menuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
        </div>

        {/* Mobile Dropdown Collapsible Drawer */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b-4 border-black shadow-xl animate-fadeIn">
            <div className="flex flex-col p-6 space-y-4 text-xs font-black uppercase tracking-wider text-left">
              <Link to="/" onClick={() => setMenuOpen(false)} className="border-b border-gray-100 pb-2">Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="border-b border-gray-100 pb-2">About</Link>
              <Link to="/services" onClick={() => setMenuOpen(false)} className="border-b border-gray-100 pb-2">Loans</Link>
              
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="border-b border-gray-100 pb-2">Dashboard</Link>
                  <Link to="/cart" onClick={() => setMenuOpen(false)} className="border-b border-gray-100 pb-2 flex items-center gap-2"><ShoppingCart size={14}/> Cart</Link>
                  <Link to="/search" onClick={() => setMenuOpen(false)} className="border-b border-gray-100 pb-2 flex items-center gap-2"><Search size={14}/> Search</Link>
                  <button onClick={() => { setMenuOpen(false); logout(); }} className="w-full bg-[#FF6B6B] text-center border-2 border-black py-2.5 shadow-[2px_2px_0px_#000000]">Logout Account</button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full text-center border-2 border-black py-2.5 font-bold">Sign In</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="w-full text-center bg-[#3B52F6] text-white border-2 border-black py-2.5 shadow-[2px_2px_0px_#000000]">Register</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Structural Layout Viewport Body */}
      <main className="flex-grow container mx-auto p-4 sm:p-6 max-w-7xl z-10 relative">
        {children}
      </main>

      {/* Footer Component Block */}
      <footer className="bg-white text-black text-center font-mono font-bold p-6 border-t-4 border-black text-xs tracking-wider">
        &copy; 2026 M-GROUPS FINANCIAL CORE. ALL RIGHTS RESERVED ✦
      </footer>
      
    </div>
  );
}