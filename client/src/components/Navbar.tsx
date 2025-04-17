
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import LoginButton from "./LoginButton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <Heart 
            className="w-8 h-8 text-mediai-600 animate-pulse-subtle" 
            fill="#2970ff" 
            strokeWidth={1.5} 
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-mediai-700 to-mediai-500 bg-clip-text text-transparent">
            Medi AI
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#features" 
            className="text-gray-700 hover:text-mediai-600 transition-colors"
          >
            Features
          </a>
          <a 
            href="#upload" 
            className="text-gray-700 hover:text-mediai-600 transition-colors"
          >
            Analysis
          </a>
          <a 
            href="#chat" 
            className="text-gray-700 hover:text-mediai-600 transition-colors"
          >
            Health Tips
          </a>
          <LoginButton />
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 animate-slide-up">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-gray-700 hover:text-mediai-600 py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#upload" 
              className="text-gray-700 hover:text-mediai-600 py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Analysis
            </a>
            <a 
              href="#chat" 
              className="text-gray-700 hover:text-mediai-600 py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Health Tips
            </a>
            <div onClick={() => setIsMobileMenuOpen(false)}>
              <LoginButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
