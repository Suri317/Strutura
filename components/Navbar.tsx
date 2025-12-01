import React, { useState, useEffect } from 'react';
import { UserType } from '../types';
import { Hammer, HardHat, Home, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeView: UserType;
  setActiveView: (view: UserType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-3 md:py-4 border-slate-200 shadow-sm' : 'bg-transparent py-4 md:py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="bg-brand-600 p-1.5 rounded-lg">
            <Hammer className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className={`font-display font-bold text-xl md:text-2xl tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
            Structura
          </span>
        </div>

        {/* Mobile View Switcher (Visible on Mobile) */}
        <div className="md:hidden flex items-center bg-slate-100/80 backdrop-blur rounded-full p-1 border border-slate-200 mx-auto absolute left-1/2 -translate-x-1/2 shadow-inner">
           <button
             onClick={() => setActiveView(UserType.HOMEOWNER)}
             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
               activeView === UserType.HOMEOWNER
                 ? 'bg-white text-brand-600 shadow-sm'
                 : 'text-slate-400'
             }`}
           >
             <Home className="w-3 h-3" />
             Home
           </button>
           <button
             onClick={() => setActiveView(UserType.CONTRACTOR)}
             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
               activeView === UserType.CONTRACTOR
                 ? 'bg-white text-blue-600 shadow-sm'
                 : 'text-slate-400'
             }`}
           >
             <HardHat className="w-3 h-3" />
             Pro
           </button>
        </div>

        {/* Desktop View Switcher */}
        <div className="hidden md:flex items-center bg-white/50 p-1 rounded-full border border-slate-200 backdrop-blur-sm shadow-sm">
          <button
            onClick={() => setActiveView(UserType.HOMEOWNER)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeView === UserType.HOMEOWNER
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Home className="w-4 h-4" />
            Homeowners
          </button>
          <button
            onClick={() => setActiveView(UserType.CONTRACTOR)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeView === UserType.CONTRACTOR
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <HardHat className="w-4 h-4" />
            Contractors
          </button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            How it works
          </a>
          <a href="#waitlist" className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
            Join Waitlist
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-900 p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-900">How it works</a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-900">Features</a>
              <a href="#waitlist" onClick={() => setMobileMenuOpen(false)} className="bg-brand-600 text-white w-full py-3 rounded-lg font-bold text-center">
                Get Early Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;