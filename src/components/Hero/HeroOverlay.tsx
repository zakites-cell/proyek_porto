import { motion } from 'framer-motion';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { PERSONAL_INFO } from '@/data/constants';

interface HeroOverlayProps {
  isVisible: boolean;
}

export function HeroOverlay({ isVisible }: HeroOverlayProps) {
  const typingText = useTypingEffect(PERSONAL_INFO.profession);

  return (
    <div
      className={`fixed inset-0 pointer-events-none flex flex-col justify-center px-6 md:px-20 z-10 transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-2xl pointer-events-auto"
      >
        <p className="text-primary font-mono mb-2">Hello World, I am</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight drop-shadow-md">
          {PERSONAL_INFO.name}
        </h1>
        <h2 className="text-2xl md:text-4xl text-textMuted font-medium mb-8 h-10">
          <span className="text-gradient">{typingText}</span>
          <span className="animate-pulse">|</span>
        </h2>
        
        <p className="text-textMuted mb-8 max-w-lg leading-relaxed">
          {PERSONAL_INFO.bio}
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}
            className="glow-border px-8 py-3 rounded-full bg-surface-hover text-white font-medium hover:bg-white/10 transition-colors"
          >
            Explore
          </button>
          <a
            href={PERSONAL_INFO.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-primary/50 text-primary font-medium hover:bg-primary/10 transition-colors"
          >
            Download CV
          </a>
        </div>
      </motion.div>
    </div>
  );
}
