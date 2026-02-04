import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface ChapterAskProps {
  onComplete: () => void;
}

const ChapterAsk: React.FC<ChapterAskProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow fade in
      gsap.fromTo('.final-q',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 3, delay: 1, ease: 'power2.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleYes = () => {
    if (answered) return;
    setAnswered(true);

    const ctx = gsap.context(() => {
      // Ethereal ending
      gsap.to('.options', { opacity: 0, duration: 1 });
      gsap.to('.final-q', { scale: 1.1, color: '#c2410c', duration: 2 });

      const finalMsg = document.createElement('div');
      finalMsg.innerText = "It was always you.";
      finalMsg.className = "absolute font-mono text-xs tracking-[0.5em] uppercase opacity-0 mt-32";
      containerRef.current?.appendChild(finalMsg);

      gsap.to(finalMsg, { opacity: 0.6, y: -20, duration: 3, delay: 1 });

      // Transition to next chapter
      gsap.delayedCall(5, onComplete);

    }, containerRef);
  };

  // The "No" button runs away - classic trope reimagined with physics?
  // Or better, it just morphs into "Yes"
  const handleNoHover = (e: React.MouseEvent) => {
    const btn = e.currentTarget as HTMLButtonElement;
    gsap.to(btn, {
      x: gsap.utils.random(-100, 100),
      y: gsap.utils.random(-100, 100),
      opacity: 0.5,
      duration: 0.3
    });
    btn.innerText = "Yes"; // It becomes Yes
  };

  return (
    <div ref={containerRef} className="h-full w-full bg-paper flex flex-col items-center justify-center p-8 text-ink">
      <h1 className="final-q font-serif text-5xl md:text-7xl italic text-center leading-tight mb-24">
        Will you be<br />my Valentine?
      </h1>

      <div className="options flex gap-16 font-mono text-sm tracking-widest uppercase interactive">
        <button
          onClick={handleYes}
          className="hover:underline underline-offset-8 transition-all hover:text-accent focus:outline-none"
        >
          Yes
        </button>
        <button
          onMouseEnter={handleNoHover}
          onClick={handleYes} // Even if clicked, it says yes
          className="opacity-50 hover:opacity-100 transition-opacity focus:outline-none"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ChapterAsk;