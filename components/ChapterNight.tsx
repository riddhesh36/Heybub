import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Props {
  onComplete: () => void;
}

const ChapterNight: React.FC<Props> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure cursor follows
      const moveSpotlight = (e: MouseEvent) => {
        gsap.to(spotlightRef.current, {
          background: `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, transparent 50px, #0a0a0a 250px)`,
          duration: 0.1
        });
      };
      window.addEventListener('mousemove', moveSpotlight);

      // Intro
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
      
      // Text breathes
      gsap.to('.night-text', { opacity: 0.3, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 1 });

      return () => window.removeEventListener('mousemove', moveSpotlight);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // "Easter egg" logic to advance: User must hover over specific hidden words
  const handleHoverWord = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLSpanElement;
    if (target.dataset.found === "true") return;
    
    target.dataset.found = "true";
    gsap.to(target, { color: '#f4f1ea', textShadow: '0 0 10px rgba(255,255,255,0.8)', duration: 0.5 });
    
    setRevealedCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
             gsap.delayedCall(2, () => {
                gsap.to(containerRef.current, { opacity: 0, duration: 2, onComplete });
             });
        }
        return newCount;
    });
  };

  return (
    <div ref={containerRef} className="h-full w-full bg-void text-gray-800 relative cursor-none overflow-hidden flex items-center justify-center">
      {/* The Spotlight Overlay */}
      <div 
        ref={spotlightRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, transparent 50px, #0a0a0a 250px)' }}
      />
      
      <div className="max-w-3xl text-center z-10 p-8 leading-loose font-serif text-2xl md:text-3xl select-none">
        <p className="night-text mb-8">
          The world went dark, and I saw you <span className="text-gray-900 transition-colors duration-700 hover:text-gray-600 interactive" onMouseEnter={handleHoverWord}>clearly</span>.
        </p>
        <p className="night-text mb-8">
          Silence wasn't empty anymore. It was <span className="text-gray-900 transition-colors duration-700 hover:text-gray-600 interactive" onMouseEnter={handleHoverWord}>full</span>.
        </p>
        <p className="night-text">
          Just <span className="text-gray-900 transition-colors duration-700 hover:text-gray-600 interactive" onMouseEnter={handleHoverWord}>us</span> against the noise.
        </p>
      </div>
    </div>
  );
};

export default ChapterNight;