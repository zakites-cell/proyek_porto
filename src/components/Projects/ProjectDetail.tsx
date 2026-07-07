import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <Html
      zIndexRange={[100, 0]}
      center
      className="pointer-events-none"
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="pointer-events-auto"
        >
          <div 
            className="glass-hover rounded-2xl p-6 w-[340px] md:w-[480px] shadow-2xl relative overflow-hidden"
            style={{ 
              borderColor: `${project.color}40`,
              boxShadow: `0 20px 40px -10px ${project.color}30` 
            }}
          >
            {/* Top decorative bar */}
            <div 
              className="absolute top-0 left-0 w-full h-1" 
              style={{ backgroundColor: project.color }} 
            />

            {/* Close button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white/60 hover:text-white"
            >
              ✕
            </button>

            <h3 
              className="text-2xl font-bold mb-2 tracking-tight pr-8"
              style={{ color: project.color }}
            >
              {project.title}
            </h3>
            
            <p className="text-textMuted text-sm mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono text-white/50 mb-3 uppercase tracking-wider">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 py-2.5 rounded-lg font-medium text-sm text-center transition-colors text-background"
                style={{ backgroundColor: project.color }}
              >
                Live Demo
              </a>
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 py-2.5 rounded-lg font-medium text-sm text-center transition-colors border border-white/20 hover:bg-white/5 text-white"
              >
                Source Code
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Html>
  );
}
