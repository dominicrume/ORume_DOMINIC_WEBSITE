import React from 'react';

export function VaidaFooter() {
  return (
    <footer className="py-[60px] border-t border-[rgba(201,115,143,0.15)] bg-[#FDF9F5]">
      <div className="max-w-[1140px] mx-auto px-[26px] text-center opacity-80">
        <p className="font-serif font-bold text-[1.15rem] tracking-[0.2em] text-[#7E3B54]">
          VAIDA V. STONE
        </p>
        <p className="text-[#8A7680] text-[0.8rem] mt-[10px]">
          &copy; {new Date().getFullYear()} Always ENOUGH™ · All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
