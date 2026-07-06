'use client';

import { useEffect, useRef } from 'react';

/**
 * Subtle blockchain/node motion behind the hero. Canvas-based, lazy, and fully
 * disabled under prefers-reduced-motion. Purely decorative (aria-hidden).
 */
export function NodeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      // e.g. jsdom / unsupported environments - decorative only, safe to skip.
      return;
    }
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number };
    let nodes: Node[] = [];

    const seed = () => {
      const count = Math.min(28, Math.floor((width * height) / 32000));
      nodes = Array.from({ length: count }, (_, i) => ({
        // deterministic-ish spread; motion provides the life
        x: ((i * 97) % 100) / 100 * width,
        y: ((i * 53) % 100) / 100 * height,
        vx: (((i % 7) - 3) / 3) * 0.15,
        vy: (((i % 5) - 2) / 2) * 0.15,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    // Cap to ~30fps and pause when the hero is scrolled out of view, so the
    // decorative canvas never dominates the main thread (keeps TBT low/stable).
    let visible = true;
    let last = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible && !raf) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const draw = (now = 0) => {
      raf = 0;
      if (!visible) return;
      raf = requestAnimationFrame(draw);
      if (now - last < 33) return; // ~30fps
      last = now;
      ctx.clearRect(0, 0, width, height);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(30,144,255,${0.14 * (1 - d / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(216,234,246,0.85)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Defer the animation loop until the browser is idle so it never competes
    // with hydration, the hero paint (LCP), or first input.
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(draw);
    };
    const startWhenIdle = () => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) idleId = ric(kick, { timeout: 2500 });
      else timeoutId = setTimeout(kick, 1500);
    };
    startWhenIdle();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idleId !== undefined && cic) cic(idleId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-70"
    />
  );
}
