"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      first_name: formData.get("first_name"),
      email: formData.get("email"),
      company_website: formData.get("company_website") ?? ""
    };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-[40px]">
        <div className="text-[#5BC08A] text-[24px] mb-[10px]">✓</div>
        <div className="text-[#EDF1F6] text-[18px] font-bold mb-[8px]">You are on the list.</div>
        <div className="text-[#93A0B1] text-[15px]">We will email you the founding price link on launch day.</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Honeypot: hidden from humans, filled by bots. Server rejects non-empty. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <label htmlFor="n" className="block text-[13px] font-bold tracking-[0.04em] uppercase text-[#93A0B1] mb-[7px]">
        First name
      </label>
      <input 
        id="n" 
        name="first_name" 
        type="text" 
        placeholder="Ada" 
        autoComplete="given-name" 
        required 
        disabled={status === "loading"}
        className="w-full bg-[#0B0E13] border border-[#28313F] rounded-lg text-[#EDF1F6] p-[14px_15px] text-[17px] font-inherit mb-[16px] focus:outline-none focus:border-[#E8B44A] disabled:opacity-50"
      />
      
      <label htmlFor="e" className="block text-[13px] font-bold tracking-[0.04em] uppercase text-[#93A0B1] mb-[7px]">
        Email
      </label>
      <input 
        id="e" 
        name="email" 
        type="email" 
        placeholder="you@company.com" 
        autoComplete="email" 
        required 
        disabled={status === "loading"}
        className="w-full bg-[#0B0E13] border border-[#28313F] rounded-lg text-[#EDF1F6] p-[14px_15px] text-[17px] font-inherit mb-[16px] focus:outline-none focus:border-[#E8B44A] disabled:opacity-50"
      />
      
      {status === "error" && (
        <div className="text-red-400 text-sm mb-4">Something went wrong. Please try again.</div>
      )}

      <button 
        type="submit" 
        disabled={status === "loading"}
        className="w-full bg-[#E8B44A] text-[#171203] border-none rounded-lg p-[17px] text-[17px] font-[750] font-inherit cursor-pointer tracking-[-0.2px] hover:brightness-105 transition-all disabled:opacity-50"
      >
        {status === "loading" ? "Joining..." : "Send me the founding price"}
      </button>
    </form>
  );
}
