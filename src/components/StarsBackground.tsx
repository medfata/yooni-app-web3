"use client";

import { useEffect, useRef } from "react";

export default function StarsBackground() {
  const starsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsContainerRef.current) return;
    
    const starsContainer = starsContainerRef.current;
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Random size between 1-3px
      const size = Math.random() * 2 + 1;
      
      // Random animation delay
      const delay = Math.random() * 4;
      
      // Random brightness variation
      const hue = Math.random() > 0.7 ? `hsl(${220 + Math.random() * 60}, 100%, 90%)` : '#fff';
      
      // Apply styles
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;
      star.style.backgroundColor = hue;
      
      // Add a glow effect to larger stars
      if (size > 2) {
        star.style.boxShadow = `0 0 ${size}px ${size/2}px ${hue}`;
      }
      
      starsContainer.appendChild(star);
    }
    
    // Cleanup function
    return () => {
      while (starsContainer.firstChild) {
        starsContainer.removeChild(starsContainer.firstChild);
      }
    };
  }, []);

  return <div className="stars" ref={starsContainerRef}></div>;
} 