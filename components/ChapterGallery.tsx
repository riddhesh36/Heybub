import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const COLUMNS = 4;
const IMAGES_PER_COLUMN = 4; // Total 16 images minimum

// Local images from public folder
const IMAGE_URLS = [
    "/1aad147a-f8e9-4ae6-a910-6c1b495688d9.JPG",
    "/743B4BBF-B768-4485-ACA8-F83AA0B022ED.JPG",
    "/97CCE12B-6395-4F14-81B7-CED54B417739.JPG",
    "/IMG_0495.JPG",
    "/IMG_0616.JPG",
    "/IMG_0952.jpg",
    "/IMG_0646.JPG",
    "/IMG_2120.JPG",
    "/IMG_2176.JPG",
    "/IMG_2224.JPG",
    "/IMG_9259.JPG",
    "/IMG_9363.JPG",
    "/IMG_9677.JPG",
    "/IMG_9714.JPG",
    "/dc8b56b0-9455-44c0-9f18-f4d25f91d8af.JPG",
    "/e57aa737-f377-4d9b-bea0-3031dffc04b5.JPG"
];

const ChapterGallery: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Fade in container
            gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });

            columnsRef.current.forEach((col, index) => {
                if (!col) return;

                // Clone children for seamless loop
                // React renders the initial set, we can duplicate them in DOM or just render double in JSX.
                // Rendering double in JSX is cleaner for React.

                const duration = 20 + index * 5; // Different speeds: 20s, 25s, 30s, 35s
                const direction = index % 2 === 0 ? -1 : 1; // Alternate direction: up, down, up, down

                // For infinite scroll, we translate yPercent.
                // If direction is -1 (up), we go from 0 to -50%.
                // If direction is 1 (down), we go from -50% to 0.

                const contentHeight = col.scrollHeight / 2; // Assuming we doubled content

                gsap.to(col, {
                    yPercent: direction === -1 ? -50 : 0,
                    startAt: { yPercent: direction === -1 ? 0 : -50 },
                    duration: duration,
                    ease: "none",
                    repeat: -1
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Split images into columns
    const getColumnImages = (colIndex: number) => {
        const images = [];
        for (let i = colIndex; i < IMAGE_URLS.length; i += COLUMNS) {
            images.push(IMAGE_URLS[i]);
        }
        return images;
    };

    return (
        <div ref={containerRef} className="w-full h-full bg-paper overflow-hidden relative flex gap-4 px-4 py-8">
            {/* Title Overlay or just pure gallery? User said "add another story... create a beautiful gallery". 
          Maybe a subtle text overlay? I'll keep it pure for now to maximize visual impact of the gallery.
      */}

            {Array.from({ length: COLUMNS }).map((_, colIndex) => (
                <div key={colIndex} className="flex-1 h-[150vh] -mt-[25vh] overflow-hidden relative">
                    {/* The moving track */}
                    <div
                        ref={el => columnsRef.current[colIndex] = el}
                        className="w-full flex flex-col gap-4"
                    >
                        {/* Render Twice for Loop */}
                        {[...getColumnImages(colIndex), ...getColumnImages(colIndex)].map((src, imgIdx) => (
                            <div key={imgIdx} className="w-full aspect-[3/4] rounded-lg overflow-hidden shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                                <img
                                    src={src}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChapterGallery;
