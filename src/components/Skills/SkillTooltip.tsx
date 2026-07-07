import { Html } from '@react-three/drei';
import type { Skill } from '@/types';

interface SkillTooltipProps {
  skill: Skill;
  color: string;
}

export function SkillTooltip({ skill, color }: SkillTooltipProps) {
  return (
    <Html
      position={[0, 0.8, 0]}
      center
      zIndexRange={[100, 0]}
      distanceFactor={10}
      className="pointer-events-none"
    >
      <div 
        className="glass rounded-xl p-4 w-48 shadow-lg"
        style={{ borderColor: `${color}40`, boxShadow: `0 0 20px ${color}20` }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{skill.icon}</span>
          <h4 className="font-bold text-white tracking-wide">{skill.name}</h4>
        </div>
        
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/60">Proficiency</span>
              <span style={{ color }}>{skill.level}%</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${skill.level}%`, backgroundColor: color }}
              />
            </div>
          </div>
          
          <div className="flex justify-between text-xs pt-1">
            <span className="text-white/60">Experience</span>
            <span className="text-white">{skill.experience}</span>
          </div>
        </div>
      </div>
    </Html>
  );
}
