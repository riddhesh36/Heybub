import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  onComplete: () => void;
}

const ChapterMemory: React.FC<Props> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro
      gsap.fromTo('.memory-text', 
        { opacity: 0, filter: 'blur(20px)' }, 
        { opacity: 1, filter: 'blur(0px)', duration: 2, stagger: 1 }
      );

      // Melting effect loop
      const turbulence = document.querySelector('#melt-turbulence');
      const displacement = document.querySelector('#melt-displacement');
      
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(turbulence, { attr: { baseFrequency: "0.02 0.05" }, duration: 4, ease: "sine.inOut" });
      tl.to(displacement, { attr: { scale: 10 }, duration: 4, ease: "sine.inOut" }, "<");

      // Mouse interaction to increase melting
      const onMouseMove = (e: MouseEvent) => {
        const xPercent = e.clientX / window.innerWidth;
        const meltIntensity = 10 + (xPercent * 40);
        gsap.to(displacement, { attr: { scale: meltIntensity }, duration: 0.5 });
      };
      
      window.addEventListener('mousemove', onMouseMove);
      
      // Auto advance after lingering
      gsap.delayedCall(12, () => {
         gsap.to(containerRef.current, { opacity: 0, duration: 2, onComplete });
      });

      return () => window.removeEventListener('mousemove', onMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="h-full w-full flex flex-col items-center justify-center p-8 text-center bg-paper text-ink">
      <div className="max-w-2xl relative" style={{ filter: 'url(#melt)' }}>
        <p className="font-serif text-4xl md:text-6xl mb-8 memory-text leading-tight">
          It started with something sweet.
        </p>
        <p className="font-serif text-2xl md:text-3xl opacity-70 memory-text italic">
          Messy. Imperfect.
        </p>
        <p className="font-serif text-2xl md:text-3xl opacity-60 memory-text mt-12">
          Everything melted away<br/>except you.
        </p>
      </div>
    </div>
  );
};

export default ChapterMemory;