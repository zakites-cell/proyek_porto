import { useMemo, memo } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = memo(function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const { progress, active } = useProgress();
  const displayProgress = useMemo(() => Math.round(progress), [progress]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: 'easeInOut' },
          }}
          onAnimationComplete={(definition) => {
            if (
              typeof definition === 'object' &&
              definition !== null &&
              'opacity' in definition &&
              definition.opacity === 0
            ) {
              onComplete();
            }
          }}
          role="progressbar"
          aria-valuenow={displayProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading 3D scene"
        >
          {/* Logo */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-gradient text-5xl font-bold tracking-wider">
              PORTFOLIO
            </h1>
            <p className="text-center text-sm tracking-[0.3em] text-white/40 mt-2 font-mono">
              INITIALIZING WORLD
            </p>
          </motion.div>

          {/* Progress bar container */}
          <div className="w-72 md:w-96">
            {/* Percentage */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono text-white/50 tracking-widest">
                LOADING ASSETS
              </span>
              <span className="text-sm font-mono text-primary tabular-nums">
                {displayProgress}%
              </span>
            </div>

            {/* Bar track */}
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, #00CFFF 0%, #7B61FF 50%, #74F9FF 100%)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* Decorative dots */}
            <div className="flex justify-center gap-1.5 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary/60"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
