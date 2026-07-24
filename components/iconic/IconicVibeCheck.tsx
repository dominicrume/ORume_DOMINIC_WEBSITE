/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// Extend Window interface for Pyodide
declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<any>;
  }
}

const POS = ["love","great","win","winning","excited","exciting","change","free","future","hope","best","grow","growth","happy","good","amazing","proud","success","opportunity","learn","rise","strong","gain"];
const NEG = ["hate","bad","lose","losing","fear","afraid","never","scam","fake","tired","broke","hard","sad","angry","poor","fail","failure","stuck","weak","worried","stress"];

export function IconicVibeCheck() {
  const [inputText, setInputText] = useState("This free AI course is going to change my life. I'm excited to learn and win 🚀");
  const [result, setResult] = useState<{ label: string; conf: number; type: 'js' | 'py' | null }>({ label: '', conf: 0, type: null });
  const [isPyLoading, setIsPyLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const vibeJS = (text: string) => {
    const words = text.toLowerCase().split(/\s+/).map(w => w.replace(/[.,!?;:"'()]/g, ''));
    let pos = 0, neg = 0; 
    words.forEach(w => { if(POS.includes(w)) pos++; if(NEG.includes(w)) neg++; });
    const score = pos - neg, total = pos + neg;
    const label = score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";
    const conf = total ? Math.min(96, Math.round((Math.abs(score)/total)*100)) : 50;
    return { label, conf };
  };

  const handleRunJS = () => {
    const res = vibeJS(inputText);
    setResult({ ...res, type: 'js' });
  };

  const handleRunPy = async () => {
    setIsPyLoading(true);
    setResult(prev => ({ ...prev, type: null })); // Reset badge
    
    try {
      // Load Pyodide script if not already loaded
      if (!window.loadPyodide) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }

      // @ts-ignore - pyodide instance
      if (!window.__pyodideInstance) {
        // @ts-ignore
        window.__pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/"
        });
      }

      // @ts-ignore
      const py = window.__pyodideInstance;
      const escapedText = inputText.replace(/"/g, '\\"');
      
      const code = `
positive={"love","great","win","winning","excited","exciting","change","free","future","hope","best","grow","growth","happy","good","amazing","proud","success","opportunity","learn","rise","strong","gain"}
negative={"hate","bad","lose","losing","fear","afraid","never","scam","fake","tired","broke","hard","sad","angry","poor","fail","failure","stuck","weak","worried","stress"}
def vibe_check(text):
    words=[w.strip('.,!?;:"\\'()').lower() for w in text.split()]
    score=sum(w in positive for w in words)-sum(w in negative for w in words)
    total=sum(w in positive for w in words)+sum(w in negative for w in words)
    label="Positive" if score>0 else "Negative" if score<0 else "Neutral"
    conf=min(96,round(abs(score)/total*100)) if total else 50
    return label+"|"+str(conf)
vibe_check("${escapedText}")
`;
      const out = await py.runPythonAsync(code);
      const [label, confStr] = String(out).split("|");
      
      setResult({ label, conf: Number(confStr), type: 'py' });
    } catch (err) {
      console.error("Pyodide execution failed:", err);
      // Fallback to JS if Pyodide fails
      const fallbackRes = vibeJS(inputText);
      setResult({ ...fallbackRes, type: 'js' });
    } finally {
      setIsPyLoading(false);
    }
  };

  const getEmojiAndColor = (label: string) => {
    switch(label) {
      case "Positive": return { emoji: "🔥", color: "#3FBF7F" }; // green
      case "Negative": return { emoji: "😟", color: "#D3132F" }; // red
      case "Neutral": return { emoji: "😐", color: "#C9A24B" }; // gold
      default: return { emoji: "🔥", color: "#3FBF7F" };
    }
  };

  const uiState = result.label ? getEmojiAndColor(result.label) : null;

  return (
    <section className="relative z-10 py-16" id="try">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-[720px] mx-auto">
          <div className="text-[11px] tracking-[3px] uppercase text-[#C9A24B] font-semibold">Try it now · no signup</div>
          <h2 className="font-serif font-extrabold text-[27px] md:text-[42px] leading-[1.12] tracking-[-0.3px] my-3">
            Your first AI move — live, right here.
          </h2>
          <p className="text-[#EDE7D8] opacity-82 text-[16px]">
            Don't take our word for it. Type any message and let a real AI read its vibe — then peek at the actual Python behind it, and run that Python live in your browser. This is Day 0.
          </p>
        </div>

        {/* Interactive Lab */}
        <div className="max-w-[760px] mx-auto mt-9 bg-gradient-to-b from-[#101017] to-[#0c0c11] border border-[#2C2A33] rounded-[14px] overflow-hidden shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)]">
          
          {/* Mac window header */}
          <div className="flex items-center gap-2 px-[18px] py-[13px] bg-[#0a0a0e] border-b border-[#2C2A33]">
            <div className="flex gap-[6px]">
              <i className="w-[11px] h-[11px] rounded-full bg-[#ff5f57] block"></i>
              <i className="w-[11px] h-[11px] rounded-full bg-[#febc2e] block"></i>
              <i className="w-[11px] h-[11px] rounded-full bg-[#28c840] block"></i>
            </div>
            <span className="font-mono text-[12px] text-[#A79F8E] ml-2">ai_vibe_check.py</span>
            
            <div className="ml-auto text-[10px] tracking-[1.5px] uppercase text-[#3FBF7F] flex items-center gap-[6px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3FBF7F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3FBF7F]"></span>
              </span>
              Live
            </div>
          </div>

          <div className="p-[22px]">
            <div className="text-[12px] text-[#A79F8E] mb-2">Type a message — a tweet, a caption, anything:</div>
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-[#07070b] border border-[#2C2A33] rounded-[9px] text-[#F5F1E8] font-sans text-[15px] p-[14px] resize-y min-h-[64px] outline-none focus:border-[#C9A24B] transition-colors"
            />
            
            <div className="flex flex-wrap items-center gap-[10px] mt-3">
              <button 
                onClick={handleRunJS}
                className="bg-gradient-to-r from-[#C9A24B] to-[#E7C877] text-[#1a1406] font-extrabold border-0 rounded-lg px-[22px] py-[12px] cursor-pointer text-[14px] tracking-[0.3px] hover:-translate-y-px transition-transform"
              >
                ⚡ Run the AI
              </button>
              <span className="text-[12px] text-[#A79F8E]">It reads the emotion in your words.</span>
            </div>

            {/* Output */}
            {uiState && (
              <div className="mt-[18px] border-t border-dashed border-[#2C2A33] pt-[18px] animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-[14px]">
                  <div className="text-[40px] leading-none">{uiState.emoji}</div>
                  <div className="font-serif text-[22px] font-bold">
                    {result.label}{' '}
                    <small className="block font-sans text-[12px] text-[#A79F8E] tracking-[1px] uppercase font-semibold">
                      AI vibe reading
                    </small>
                  </div>
                </div>

                <div className="mt-[14px] h-[9px] bg-[#07070b] border border-[#2C2A33] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#C9A24B] to-[#3FBF7F] transition-all duration-700 ease-out" 
                    style={{ width: `${result.conf}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-[11px] text-[#A79F8E] mt-2">
                  <span>Confidence</span>
                  <span>{result.conf}%</span>
                </div>

                {/* Real Python Code Section */}
                <div className="mt-[18px]">
                  <button 
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                    className="text-[12.5px] text-[#C9A24B] font-semibold tracking-[0.4px] cursor-pointer hover:opacity-80"
                  >
                    {isDetailsOpen ? '▾' : '▸'} See &amp; run the real Python behind this
                  </button>
                  
                  {isDetailsOpen && (
                    <div className="mt-3 animate-in fade-in duration-200">
                      <pre className="bg-[#07070b] border border-[#2C2A33] rounded-[9px] p-4 overflow-auto font-mono text-[12.5px] leading-[1.7] text-[#cdd6e6]">
<span className="text-[#6b7280]"># A tiny AI that reads emotion — real Python</span>
<br/><span className="text-[#e7c877]">def</span> <span className="text-[#39C6D6]">vibe_check</span>(text):
<br/>    positive = {"{"}<span className="text-[#7ec699]">"love","great","win","excited","change",
<br/>                "free","future","hope","best","grow","happy"</span>{"}"}
<br/>    negative = {"{"}<span className="text-[#7ec699]">"hate","bad","lose","fear","never",
<br/>                "scam","fake","tired","broke","hard","sad"</span>{"}"}
<br/>    words = [w.strip(<span className="text-[#7ec699]">".,!?"</span>).lower() <span className="text-[#e7c877]">for</span> w <span className="text-[#e7c877]">in</span> text.split()]
<br/>    score = <span className="text-[#39C6D6]">sum</span>(w <span className="text-[#e7c877]">in</span> positive <span className="text-[#e7c877]">for</span> w <span className="text-[#e7c877]">in</span> words) \
<br/>          - <span className="text-[#39C6D6]">sum</span>(w <span className="text-[#e7c877]">in</span> negative <span className="text-[#e7c877]">for</span> w <span className="text-[#e7c877]">in</span> words)
<br/>    <span className="text-[#e7c877]">return</span> <span className="text-[#7ec699]">"Positive"</span> <span className="text-[#e7c877]">if</span> score &gt; 0 <span className="text-[#e7c877]">else</span> <span className="text-[#7ec699]">"Negative"</span> <span className="text-[#e7c877]">if</span> score &lt; 0 <span className="text-[#e7c877]">else</span> <span className="text-[#7ec699]">"Neutral"</span>
                      </pre>

                      <div className="flex flex-wrap items-center gap-[10px] mt-3">
                        <button 
                          onClick={handleRunPy}
                          disabled={isPyLoading}
                          className="bg-[#12121a] border border-[#8f7433] text-[#C9A24B] font-bold rounded-[7px] px-4 py-2 text-[12.5px] hover:bg-[#1a1a24] transition-colors disabled:opacity-50"
                        >
                          ▶ Run this as real Python
                        </button>
                        
                        {isPyLoading && <span className="text-[11.5px] text-[#A79F8E] animate-pulse">Loading Python engine (Pyodide)…</span>}
                        {result.type === 'py' && !isPyLoading && (
                          <span className="text-[11.5px] text-[#3FBF7F] font-semibold">✓ Executed with real Python in your browser</span>
                        )}
                        {result.type === 'js' && !isPyLoading && result.label !== '' && (
                          <span className="text-[11.5px] text-[#A79F8E]">(Ran locally — Python engine skipped/unavailable)</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-[26px]">
          <Link 
            href="#claim" 
            className="inline-block bg-gradient-to-r from-[#C9A24B] to-[#E7C877] text-[#1a1406] font-extrabold text-[15px] rounded-md px-[28px] py-[15px] tracking-[0.4px] uppercase transition-all duration-150 hover:-translate-y-[1px] shadow-[0_16px_34px_-14px_rgba(201,162,75,0.6)]"
          >
            That was Day 0 — get all 9 free
          </Link>
        </div>
      </div>
    </section>
  );
}
