"use client";

import { useEffect, useState } from "react";

/**
 * A long sales page buries its own buy button. This bar keeps the price and the
 * action in reach the whole way down: it stays hidden over the hero (where the
 * hero CTA already does the job) and slides up once the reader has scrolled past
 * it. Dismissible, because a bar you cannot close is a bar people resent.
 */
export function StickyBuyBar({ href, cta }: { href: string; cta: string }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-50 px-[12px] pb-[12px] transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[120%] opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[660px] items-center gap-[14px] rounded-2xl border border-[#4A3A11] bg-[#141922]/95 px-[18px] py-[12px] shadow-[0_12px_44px_rgba(0,0,0,0.55)] backdrop-blur">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-bold text-[#EDF1F6]">KYA Method Stack</div>
          <div className="text-[13px] text-[#93A0B1]">&#8358;300,000 &middot; one payment, once</div>
        </div>
        <a
          href={href}
          className="focus-ring flex-none rounded-xl bg-[#E8B44A] px-[20px] py-[11px] text-[15px] font-bold text-[#0B0E13] no-underline transition-transform hover:-translate-y-[1px]"
        >
          {cta}
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="flex-none text-[20px] leading-none text-[#93A0B1] hover:text-[#EDF1F6]"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
