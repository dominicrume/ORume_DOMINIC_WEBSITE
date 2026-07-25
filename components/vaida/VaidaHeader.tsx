'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface VaidaHeaderProps {
  variant?: 'home' | 'ai';
}

export function VaidaHeader({ variant = 'home' }: VaidaHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[rgba(253,249,245,0.85)] border-b border-[rgba(201,115,143,0.15)]">
      <div className="max-w-[1140px] mx-auto px-[20px] md:px-[26px]">
        {variant === 'home' ? (
          <nav className="flex justify-between items-center py-[18px]">
            <Link 
              href="/vaida" 
              className="font-serif font-bold text-[1.15rem] tracking-[0.2em] text-[#7E3B54] hover:opacity-80 transition-opacity"
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
              md:flex flex-col md:flex-row items-start md:items-center 
              absolute md:static top-full left-0 right-0 
              bg-[rgba(253,249,245,0.98)] md:bg-transparent 
              p-5 md:p-0 gap-4 md:gap-[24px] list-none shadow-lg md:shadow-none border-b border-[#F6DCE5] md:border-0
            `}>
              {[
                { name: 'Home', href: '/vaida' },
                { name: '6-Week Reset', href: '#program' },
                { name: 'Speaking & Bio', href: '#speaker' },
                { name: 'The Method', href: '#method' },
              ].map(item => (
                <li key={item.name} className="w-full md:w-auto border-b border-[#F6DCE5] md:border-0 pb-2 md:pb-0">
                  <Link href={item.href} className="text-[#4A3B41] text-[0.92rem] font-semibold relative group hover:text-[#7E3B54] transition-colors block">
                    {item.name}
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[1.5px] bg-[#C9738F] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
              <li className="w-full md:w-auto border-b border-[#F6DCE5] md:border-0 pb-2 md:pb-0">
                <Link href="/vaida/ai" className="text-[#A64E6E] text-[0.88rem] font-bold bg-[#FBEDF1] px-[12px] py-[4px] rounded-full hover:bg-[#F6DCE5] transition-colors inline-block">
                  🎁 Free AI Bonus
                </Link>
              </li>
              <li className="w-full md:w-auto pt-2 md:pt-0">
                <Link 
                  href="https://always-enough-foundation-d97cg09.gamma.site/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#C9738F] text-white font-bold py-[9px] px-[18px] rounded-full text-[0.88rem] transition-all duration-200 hover:bg-[#7E3B54] hover:shadow-md inline-block"
                >
                  Reserve Seat (£777) →
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
            <div className="flex items-center gap-4">
              <Link href="/vaida" className="text-[0.88rem] font-semibold text-[#8A7680] hover:text-[#7E3B54] hidden sm:inline">
                ← Back to Main Site
              </Link>
              <Link 
                href="#start" 
                className="bg-[#C9738F] text-white font-bold py-[10px] px-[20px] rounded-full text-[0.9rem] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_22px_rgba(201,115,143,0.4)]"
              >
                Start free →
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

