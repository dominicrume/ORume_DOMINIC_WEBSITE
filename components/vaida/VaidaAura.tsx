'use client';

import React, { useEffect, useState } from 'react';

// We inject the keyframes via a style block to ensure they are available for the dynamic classes.
// Note: Tailwind config might not have these specific custom keyframes out of the box,
// so isolating them here keeps the component self-contained without polluting global CSS.
const auraStyles = `
  @keyframes vaidaDrift {
    0%, 100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(4vw,3vw) scale(1.12); }
  }
  @keyframes vaidaFall {
    0% { transform: translateY(-40px) rotate(0); }
    100% { transform: translateY(105vh) rotate(220deg); }
  }
  
  .vaida-aura-blob-1 {
    animation: vaidaDrift 22s ease-in-out infinite;
  }
  .vaida-aura-blob-2 {
    animation: vaidaDrift 22s ease-in-out infinite;
    animation-delay: -11s;
  }
  .vaida-petal {
    position: fixed;
    top: -40px;
    z-index: -1;
    color: #F3C6D5; /* var(--petal) */
    opacity: 0.5;
    animation: vaidaFall linear infinite;
  }
`;

interface Petal {
  id: number;
  char: string;
  left: string;
  fontSize: string;
  duration: string;
  delay: string;
}

export function VaidaAura() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate petals only on the client side to avoid hydration mismatches
    // due to Math.random() usage.
    const P = ['✿', '❀', '✾'];
    const generatedPetals: Petal[] = [];
    
    // The home page uses 7 petals, the AI page uses 6. 
    // We'll use 7 as a good baseline.
    for (let i = 0; i < 7; i++) {
      generatedPetals.push({
        id: i,
        char: P[i % 3],
        left: `${Math.random() * 100}vw`,
        fontSize: `${14 + Math.random() * 16}px`,
        duration: `${14 + Math.random() * 12}s`,
        delay: `${-Math.random() * 20}s`
      });
    }
    
    setPetals(generatedPetals);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: auraStyles }} />
      
      {/* Background container */}
      <div className="fixed inset-0 z-[-2] bg-[#FDF9F5]">
        
        {/* Blob 1 */}
        <div 
          className="absolute rounded-full opacity-50 blur-[80px] vaida-aura-blob-1"
          style={{
            width: '60vw',
            height: '60vw',
            background: 'radial-gradient(circle, #F6DCE5, transparent 70%)',
            top: '-10vw',
            left: '-5vw'
          }}
        />
        
        {/* Blob 2 */}
        <div 
          className="absolute rounded-full opacity-50 blur-[80px] vaida-aura-blob-2"
          style={{
            width: '50vw',
            height: '50vw',
            background: 'radial-gradient(circle, #F3E4D0, transparent 70%)',
            bottom: '-10vw',
            right: '-8vw'
          }}
        />
      </div>

      {/* Petals layer */}
      <div aria-hidden="true">
        {petals.map(p => (
          <div 
            key={p.id}
            className="vaida-petal"
            style={{
              left: p.left,
              fontSize: p.fontSize,
              animationDuration: p.duration,
              animationDelay: p.delay
            }}
          >
            {p.char}
          </div>
        ))}
      </div>
    </>
  );
}
