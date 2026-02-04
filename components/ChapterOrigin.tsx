import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SPECIAL_DATE } from '../constants';

interface Props {
  onComplete: () => void;
  onInteractionStart: () => void;
}

const ChapterOrigin: React.FC<Props> = ({ onComplete, onInteractionStart }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const inputsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intro animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-text', 
        { y: 50, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.5, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>, nextId?: string, maxLength: number = 2) => {
    const val = e.target.value.replace(/\D/g, ''); // Keep numeric only
    
    if (val.length <= maxLength) {
      setter(val);
      onInteractionStart(); 
      
      if (val.length === maxLength && nextId) {
        document.getElementById(nextId)?.focus();
      }
    }
  };

  useEffect(() => {
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      if (day === SPECIAL_DATE.day && month === SPECIAL_DATE.month && year === SPECIAL_DATE.year) {
        // Success
        const ctx = gsap.context(() => {
          gsap.to('.input-char', { color: '#16a34a', duration: 0.5 });
          gsap.to(containerRef.current, { 
            scale: 0.95, 
            opacity: 0, 
            filter: 'blur(10px)', 
            duration: 1.5, 
            ease: 'power4.in',
            onComplete: onComplete 
          });
        }, containerRef);
        return () => ctx.revert();
      } else {
        // Subtle Resistance / Error
        const ctx = gsap.context(() => {
          // Robust shake animation using standard repeat/yoyo
          gsap.fromTo(inputsRef.current, 
            { x: 0 },
            { x: 6, duration: 0.05, repeat: 5, yoyo: true, ease: 'sine.inOut', onComplete: () => {
                gsap.set(inputsRef.current, { x: 0 });
            }}
          );
          
          gsap.to(errorRef.current, { opacity: 1, duration: 1, y: 0, ease: 'power2.out' });
          gsap.to(errorRef.current, { opacity: 0, duration: 1, delay: 2 });
          
          // Clear inputs after delay
          gsap.delayedCall(1, () => {
             setDay(''); setMonth(''); setYear('');
             document.getElementById('day-input')?.focus();
          });
        }, containerRef);
        return () => ctx.revert();
      }
    }
  }, [day, month, year, onComplete]);

  return (
    <div ref={containerRef} className="h-full w-full flex flex-col items-center justify-center relative">
      <div className="text-center mb-12 mix-blend-difference text-ink">
        <h1 className="font-serif text-3xl md:text-5xl italic reveal-text">
          Do you remember
        </h1>
        <h1 className="font-serif text-3xl md:text-5xl italic reveal-text mt-2">
          when it began?
        </h1>
      </div>

      <div ref={inputsRef} className="flex items-center gap-4 md:gap-8 font-mono text-xl md:text-2xl text-ink/80 interactive">
        <input
          id="day-input"
          type="text"
          value={day}
          onChange={(e) => handleInput(e, setDay, 'month-input', 2)}
          placeholder="DD"
          className="w-12 bg-transparent border-b border-ink/30 focus:border-ink outline-none text-center placeholder-ink/20 transition-colors input-char"
          autoComplete="off"
        />
        <span className="opacity-30">/</span>
        <input
          id="month-input"
          type="text"
          value={month}
          onChange={(e) => handleInput(e, setMonth, 'year-input', 2)}
          placeholder="MM"
          className="w-12 bg-transparent border-b border-ink/30 focus:border-ink outline-none text-center placeholder-ink/20 transition-colors input-char"
          autoComplete="off"
        />
        <span className="opacity-30">/</span>
        <input
          id="year-input"
          type="text"
          value={year}
          onChange={(e) => handleInput(e, setYear, undefined, 4)}
          placeholder="YYYY"
          className="w-20 bg-transparent border-b border-ink/30 focus:border-ink outline-none text-center placeholder-ink/20 transition-colors input-char"
          autoComplete="off"
        />
      </div>

      <div ref={errorRef} className="absolute bottom-1/4 opacity-0 transform translate-y-4 font-serif text-sm italic text-ink/50">
        That is not the day the world changed.
      </div>
    </div>
  );
};

export default ChapterOrigin;