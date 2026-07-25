'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VaidaCaptureFormProps {
  variant?: 'home' | 'ai';
}

export function VaidaCaptureForm({ variant = 'home' }: VaidaCaptureFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          source: variant === 'home' ? 'Vaida Home - 6-Week Reset & Community' : 'Vaida AI Landing Page' 
        })
      });
      
      if (res.ok) {
        setStatus('success');
        setMessage(variant === 'home' ? 'Welcome to the Always ENOUGH™ community...' : 'Redirecting to your gift...');
        setEmail('');
        setTimeout(() => {
          router.push(`/access?source=${variant === 'home' ? 'vaida-home' : 'vaida'}`);
        }, 800);
      } else {
        const data = await res.json();
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  return (
    <section className="py-[90px] px-[20px] md:px-[26px] bg-[#FDF9F5] border-t border-[rgba(201,115,143,0.15)]" id="start">
      <div className="max-w-[720px] mx-auto text-center">
        <span className="inline-block py-[5px] px-[16px] rounded-full bg-[#FBEDF1] border border-[#F6DCE5] text-[#A64E6E] font-bold text-[0.75rem] tracking-[0.25em] uppercase mb-[16px]">
          {variant === 'home' ? 'Join The Movement' : 'Free Gift Access'}
        </span>
        <h2 className="font-serif font-semibold text-[clamp(2rem,4.5vw,3rem)] text-[#7E3B54] mb-[14px] leading-[1.08]">
          {variant === 'home' ? 'Join the Always ENOUGH™ Community' : 'Claim Your Free AI Gift'}
        </h2>
        <p className="text-[#8A7680] text-[1.05rem] max-w-[54ch] mx-auto mb-[40px] leading-relaxed">
          {variant === 'home' 
            ? 'Enter your email to receive weekly reflections on financial courage, simple money systems for women 40+, and priority waitlist access to upcoming 6-Week Reset cohorts.'
            : 'Enter your email below. The 9-Day Blueprint and your invite to our private AI workshops will be sent instantly.'}
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-[16px] justify-center max-w-[520px] mx-auto">
          <input 
            type="email" 
            placeholder="Your best email address" 
            required 
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 bg-white border border-[#F6DCE5] p-[16px_24px] rounded-full text-[1rem] text-[#4A3B41] font-sans outline-none transition-all duration-300 focus:border-[#C9738F] focus:shadow-[0_0_0_3px_rgba(201,115,143,0.15)] disabled:opacity-60 shadow-sm"
          />
          <button 
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="inline-block font-bold text-[1rem] py-[16px] px-[32px] rounded-full transition-all duration-300 border-2 border-[#C9738F] bg-[#C9738F] text-white shadow-[0_10px_24px_rgba(201,115,143,0.35)] hover:-translate-y-[3px] hover:shadow-[0_16px_34px_rgba(201,115,143,0.45)] disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto w-full"
          >
            {status === 'loading' 
              ? 'Sending...' 
              : variant === 'home' ? 'Join Community' : 'Send me the blueprint'}
          </button>
        </form>
        
        {message && (
          <div className={`mt-[20px] font-bold text-[1.05rem] ${status === 'success' ? 'text-[#C9738F]' : 'text-[#A64E6E]'}`}>
            {message}
          </div>
        )}

        {variant === 'home' && (
          <p className="text-[0.82rem] text-[#8A7680] mt-[20px] opacity-80">
            We respect your privacy. No spam, ever. Unsubscribe with one click anytime.
          </p>
        )}
      </div>
    </section>
  );
}

