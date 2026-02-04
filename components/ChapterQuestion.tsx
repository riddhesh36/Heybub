import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Props {
  onComplete: () => void;
  setIntensity: (val: number) => void; // Controls audio volume/pitch
}

const ChapterQuestion: React.FC<Props> = ({ onComplete, setIntensity }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
      gsap.from('.choice', { y: 50, opacity: 0, stagger: 0.2, delay: 0.5, duration: 1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChoice = (type: 'quiet' | 'wild' | 'forever') => {
    const ctx = gsap.context(() => {
      // Animate out other choices
      gsap.to('.choice', { opacity: 0, pointerEvents: 'none', duration: 0.5 });
      
      // Visual feedback based on choice
      let color = '#fff';
      if (type === 'quiet') {
        color = '#a8a29e';
        setIntensity(0.5);
      } else if (type === 'wild') {
        color = '#c2410c';
        setIntensity(1.0);
      } else {
        color = '#1a1a1a';
        setIntensity(0.8);
      }

      const ripple = document.createElement('div');
      ripple.className = 'fixed rounded-full z-0 pointer-events-none';
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      ripple.style.background = color;
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      containerRef.current?.appendChild(ripple);

      gsap.to(ripple, {
        scale: 300,
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        onComplete: () => {
             onComplete();
        }
      });

    }, containerRef);
  };

  return (
    <div ref={containerRef} className="h-full w-full bg-paper text-ink flex flex-col items-center justify-center relative">
      <h2 className="font-serif text-3xl md:text-4xl mb-16 italic opacity-80">What do you want this to feel like?</h2>
      
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 z-10">
        <button 
          onClick={() => handleChoice('quiet')}
          className="choice group flex flex-col items-center gap-4 transition-transform hover:scale-110 focus:outline-none"
        >
          <div className="w-4 h-4 rounded-full border border-ink group-hover:bg-ink transition-colors"></div>
          <span className="font-mono text-sm tracking-widest uppercase">Quiet</span>
        </button>

        <button 
          onClick={() => handleChoice('wild')}
          className="choice group flex flex-col items-center gap-4 transition-transform hover:scale-110 focus:outline-none"
        >
           <div className="w-4 h-4 rotate-45 border border-ink group-hover:bg-accent group-hover:border-accent transition-colors"></div>
           <span className="font-mono text-sm tracking-widest uppercase">Intense</span>
        </button>

        <button 
          onClick={() => handleChoice('forever')}
          className="choice group flex flex-col items-center gap-4 transition-transform hover:scale-110 focus:outline-none"
        >
           <div className="w-4 h-4 rounded-full border border-ink border-double group-hover:bg-ink transition-colors"></div>
           <span className="font-mono text-sm tracking-widest uppercase">Eternal</span>
        </button>
      </div>
    </div>
  );
};

export default ChapterQuestion;