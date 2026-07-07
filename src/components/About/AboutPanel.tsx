import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/constants';

interface AboutPanelProps {
  isVisible: boolean;
}

export function AboutPanel({ isVisible }: AboutPanelProps) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none flex items-center justify-end px-6 md:px-20 z-10 transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-lg pointer-events-auto"
      >
        <div className="glass-hover rounded-2xl p-8 relative overflow-hidden">
          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-70" />
          
          <h2 className="text-3xl font-bold mb-6 text-gradient inline-block">
            System Data: Profile
          </h2>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-sm font-mono text-primary/70 mb-2 tracking-widest uppercase">
                Biography
              </h3>
              <p className="text-textMuted text-sm leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-sm font-mono text-primary/70 mb-2 tracking-widest uppercase">
                Education
              </h3>
              <p className="text-white text-sm">
                {PERSONAL_INFO.education}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-sm font-mono text-primary/70 mb-2 tracking-widest uppercase">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {PERSONAL_INFO.interests.map((interest, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/80"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-sm font-mono text-primary/70 mb-2 tracking-widest uppercase">
                Career Goal
              </h3>
              <p className="text-accent text-sm italic opacity-90 border-l-2 border-accent/50 pl-3">
                "{PERSONAL_INFO.careerGoal}"
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
