'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface VaidaHeaderProps {
  variant?: 'home' | 'ai';
}

export function VaidaHeader({ variant = 'home' }: VaidaHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[rgba(253,249,245,0.72)] border-b border-[rgba(201,115,143,0.12)]">
      <div className="max-w-[1140px] mx-auto px-[26px]">
        {variant === 'home' ? (
          <nav className="flex justify-between items-center py-[22px]">
            <Link 
              href="/vaida" 
              className="font-serif font-bold text-[1.15rem] tracking-[0.2em] text-[#7E3B54]"
            >
              VAIDA V. STONE
            </Link>
            
            <button 
              className="md:hidden bg-transparent border-0 text-[1.5rem] text-[#7E3B54] cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Menu"
            >
              ☰
            </button>
            
            <ul className={`
              ${menuOpen ? 'flex' : 'hidden'} 
              md:flex flex-col md:flex-row 
              absolute md:static top-full left-0 right-0 
              bg-[rgba(253,249,245,0.98)] md:bg-transparent 
              p-4 md:p-0 gap-0 md:gap-[30px] list-none
            `}>
              {['Home', 'About', 'Speaking', 'The Book'].map(item => (
                <li key={item} className="py-3 md:py-0 border-b border-[#F6DCE5] md:border-0">
                  <Link href="/vaida" className="text-[#4A3B41] text-[0.94rem] font-medium relative group">
                    {item}
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[1.5px] bg-[#C9738F] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
              <li className="py-3 md:py-0 border-b border-[#F6DCE5] md:border-0">
                <Link href="/vaida/ai" className="text-[#4A3B41] text-[0.94rem] font-medium relative group">
                  Free AI Gift
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[1.5px] bg-[#C9738F] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li className="py-3 md:py-0 md:border-0">
                <Link href="/vaida" className="text-[#4A3B41] text-[0.94rem] font-medium relative group">
                  Contact
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[1.5px] bg-[#C9738F] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="flex justify-between items-center py-[18px]">
            <Link 
              href="/vaida" 
              className="font-serif font-bold text-[1rem] tracking-[0.14em] text-[#7E3B54]"
            >
              ALWAYS ENOUGH™ <span className="text-[#CBA167] mx-[0.4em]">×</span> RUME DOMINIC
            </Link>
            <Link 
              href="#start" 
              className="bg-[#C9738F] text-white font-bold py-[10px] px-[20px] rounded-full text-[0.9rem] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_22px_rgba(201,115,143,0.4)]"
            >
              Start free →
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
