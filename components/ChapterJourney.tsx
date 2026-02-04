import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  onComplete: () => void;
}

const ChapterJourney: React.FC<Props> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal drift animation
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - window.innerWidth;
      
      gsap.fromTo(track, 
        { x: 0 }, 
        { x: -totalWidth, duration: 15, ease: 'none' }
      );

      // Parallax elements floating
      gsap.to('.floating', {
         y: 'random(-50, 50)',
         rotation: 'random(-5, 5)',
         duration: 4,
         repeat: -1,
         yoyo: true,
         ease: 'sine.inOut',
         stagger: 0.5
      });

      // Advance
      gsap.delayedCall(14, () => {
         gsap.to(containerRef.current, { x: -100, opacity: 0, duration: 1.5, ease: 'power2.in', onComplete });
      });

    }, containerRef);
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="h-full w-full bg-paper text-ink overflow-hidden flex items-center">
      <div ref={trackRef} className="flex items-center gap-32 md:gap-64 px-[50vw] whitespace-nowrap">
        
        <div className="flex flex-col gap-4 floating opacity-80">
          <span className="font-mono text-xs tracking-[0.2em] uppercase">The Destination</span>
          <span className="font-serif text-6xl md:text-8xl italic">Didn't matter</span>
        </div>

        <div className="flex flex-col gap-4 floating mt-32 opacity-60">
           <div className="w-64 h-1 bg-ink/20 rounded-full"></div>
           <span className="font-serif text-4xl md:text-5xl">The miles between us</span>
        </div>

        <div className="flex flex-col gap-4 floating -mt-20 opacity-90">
           <span className="font-serif text-7xl md:text-9xl font-light tracking-tighter mix-blend-multiply">Disappeared</span>
        </div>

        <div className="flex flex-col gap-4 floating mt-12">
            <span className="font-mono text-sm">Coordinates: Unknown</span>
            <span className="font-serif text-5xl md:text-6xl italic">Just Motion.</span>
        </div>
        
      </div>
    </div>
  );
};

export default ChapterJourney;