import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 rounded-[2rem] bg-white/[0.03] backdrop-blur-md border border-white/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src={logo} alt="Modelix Logo" className="h-8 object-contain" />
                <span className="text-white font-semibold tracking-wide text-lg uppercase">MODElIX</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-200">
                <Link to="/" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Home</Link>
                <a href="#about" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">About</a>
                <a href="#contact" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Contact</a>
                <Link to="/signup" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Login / Sign Up</Link>
            </div>
            {/* Mobile Menu Icon (Hidden on desktop) */}
            <div className="md:hidden flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </nav>
    );
};

export default Navbar;
