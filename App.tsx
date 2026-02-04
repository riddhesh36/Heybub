import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Chapter } from './types';
import { CHAPTER_ORDER, AUDIO_SOURCE } from './constants';
import CustomCursor from './components/CustomCursor';
import ChapterOrigin from './components/ChapterOrigin';
import ChapterMemory from './components/ChapterMemory';
import ChapterNight from './components/ChapterNight';
import ChapterJourney from './components/ChapterJourney';
import ChapterQuestion from './components/ChapterQuestion';
import ChapterAsk from './components/ChapterAsk';
import ChapterGallery from './components/ChapterGallery';

const App: React.FC = () => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio control refs
  const volumeRef = useRef({ val: 0 });

  const currentChapter = CHAPTER_ORDER[currentChapterIndex];

  const handleNext = () => {
    if (currentChapterIndex < CHAPTER_ORDER.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    }
  };

  const startAudio = () => {
    if (!audioStarted && audioRef.current) {
      setAudioStarted(true);
      audioRef.current.volume = 0;
      audioRef.current.play().catch(e => console.error("Audio play failed", e));

      // Fade in
      gsap.to(audioRef.current, { volume: 0.4, duration: 5 });
    }
  };

  const handleIntensityChange = (intensity: number) => {
    if (audioRef.current) {
      gsap.to(audioRef.current, { volume: 0.3 + (intensity * 0.4), duration: 2 });
    }
  };

  // Render current chapter component
  const renderChapter = () => {
    switch (currentChapter) {
      case Chapter.ORIGIN:
        return <ChapterOrigin onComplete={handleNext} onInteractionStart={startAudio} />;
      case Chapter.MEMORY:
        return <ChapterMemory onComplete={handleNext} />;
      case Chapter.NIGHT:
        return <ChapterNight onComplete={handleNext} />;
      case Chapter.JOURNEY:
        return <ChapterJourney onComplete={handleNext} />;
      case Chapter.QUESTION:
        return <ChapterQuestion onComplete={handleNext} setIntensity={handleIntensityChange} />;
      case Chapter.ASK:
        return <ChapterAsk onComplete={handleNext} />;
      case Chapter.GALLERY:
        return <ChapterGallery />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden selection:bg-accent selection:text-white">
      <CustomCursor />

      <audio ref={audioRef} loop src={AUDIO_SOURCE} preload="auto" />

      {/* Noise Overlay for texture */}
      <div className="noise-overlay" />

      {/* Main Content Area */}
      <main className="w-full h-full relative z-10">
        {renderChapter()}
      </main>

      {/* Progress Indicator (Subtle) */}
      <div className="fixed bottom-8 right-8 z-20 flex gap-2">
        {CHAPTER_ORDER.map((_, idx) => (
          <div
            key={idx}
            className={`w-1 h-1 rounded-full transition-all duration-500 ${idx === currentChapterIndex ? 'bg-accent scale-150' : idx < currentChapterIndex ? 'bg-ink/50' : 'bg-ink/10'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default App;