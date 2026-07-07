import { useState, useEffect, useCallback } from 'react';

interface ScrollProgress {
  progress: number;
  activeSection: number;
  scrollToSection: (index: number) => void;
}

export function useScrollProgress(sectionCount: number): ScrollProgress {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

        setProgress(scrollPercent);

        const sectionIndex = Math.min(
          Math.floor(scrollPercent * sectionCount),
          sectionCount - 1,
        );
        setActiveSection(sectionIndex);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [sectionCount]);

  const scrollToSection = useCallback(
    (index: number) => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = (index / sectionCount) * docHeight;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    },
    [sectionCount],
  );

  return { progress, activeSection, scrollToSection };
}
