import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Crown, Star, Lightning, Trophy } from '@phosphor-icons/react';

interface LevelUpModalProps {
  level: number;
  onClose: () => void;
}

export default function LevelUpModal({ level, onClose }: LevelUpModalProps) {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo('.level-up-backdrop',
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
    .fromTo('.level-up-content',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.1'
    )
    .fromTo('.level-up-stars',
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' },
      '-=0.2'
    )
    .fromTo('.level-up-text',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3 },
      '-=0.2'
    );

    // Auto close after 4 seconds
    const timeout = setTimeout(onClose, 4000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  const handleClose = () => {
    gsap.to('.level-up-content', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: onClose
    });
    gsap.to('.level-up-backdrop', {
      opacity: 0,
      duration: 0.3
    });
  };

  return (
    <div 
      className="level-up-backdrop fixed inset-0 z-[600] flex items-center justify-center"
      style={{ background: 'rgba(7, 10, 18, 0.95)', backdropFilter: 'blur(20px)' }}
      onClick={handleClose}
    >
      <div 
        className="level-up-content text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Stars */}
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="level-up-stars w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-400/10 flex items-center justify-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Star size={32} className="text-yellow-400" weight="fill" />
            </div>
          ))}
        </div>

        {/* Crown */}
        <div className="level-up-text mb-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-neon/30 to-neon/10 flex items-center justify-center mb-4 animate-pulse">
            <Crown size={48} className="text-neon" weight="fill" />
          </div>
        </div>

        {/* Text */}
        <div className="level-up-text">
          <h2 className="font-display text-4xl font-bold text-primary-light mb-2">
            Level Up!
          </h2>
          <p className="text-xl text-neon font-display mb-4">
            You reached Level {level}
          </p>
          <p className="text-secondary-light mb-8">
            Keep up the amazing work!
          </p>
        </div>

        {/* Rewards */}
        <div className="level-up-text flex justify-center gap-4 mb-8">
          <div className="bg-white/5 rounded-xl px-4 py-2 flex items-center gap-2">
            <Lightning size={18} className="text-neon" />
            <span className="text-sm text-primary-light">+100 XP Bonus</span>
          </div>
          <div className="bg-white/5 rounded-xl px-4 py-2 flex items-center gap-2">
            <Trophy size={18} className="text-yellow-400" />
            <span className="text-sm text-primary-light">New Badge</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="level-up-text btn-neon px-8 py-3"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
