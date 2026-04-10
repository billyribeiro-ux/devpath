import { useEffect, useState } from 'react';
import { 
  TargetIcon, CheckCircleIcon, LightningIcon, 
  ClockIcon, StarIcon, GiftIcon, FireIcon
} from '@phosphor-icons/react';
import { useAppStore } from '../store/appStore';
import { cn } from '@/lib/utils';

interface DailyChallengesProps {
  /** Omit outer card shell when nested inside another panel */
  embedded?: boolean;
}

export default function DailyChallenges({ embedded = false }: DailyChallengesProps) {
  const { dailyChallenges, completeChallenge } = useAppStore();
  const [timeLeft, setTimeLeft] = useState('');
  const completedCount = dailyChallenges.filter(c => c.completed).length;
  const totalXP = dailyChallenges.filter(c => c.completed).reduce((sum, c) => sum + c.xp, 0);

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'lesson': return TargetIcon;
      case 'practice': return LightningIcon;
      case 'review': return StarIcon;
      case 'project': return GiftIcon;
      default: return TargetIcon;
    }
  };

  return (
    <div className={cn(embedded ? 'p-0' : 'card-dark p-6')}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400/30 to-orange-400/10 flex items-center justify-center">
            <FireIcon size={20} className="text-orange-400" weight="fill" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-primary-light">Daily Challenges</h3>
            <span className="text-xs text-secondary-light flex items-center gap-1">
              <ClockIcon size={12} />
              Resets in {timeLeft}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-display font-bold text-neon">{completedCount}/{dailyChallenges.length}</span>
          <span className="text-xs text-secondary-light block">Completed</span>
        </div>
      </div>

      <div
        className={cn(
          'space-y-3 mb-6',
          embedded && 'max-h-[min(28vh,320px)] overflow-y-auto overscroll-contain pr-1'
        )}
      >
        {dailyChallenges.map((challenge) => {
          const Icon = getIcon(challenge.type);
          return (
            <div
              key={challenge.id}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                challenge.completed 
                  ? 'bg-neon/10 border border-neon/30' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                challenge.completed ? 'bg-neon/20' : 'bg-white/10'
              }`}>
                <Icon 
                  size={20} 
                  className={challenge.completed ? 'text-neon' : 'text-secondary-light'}
                  weight={challenge.completed ? 'fill' : 'regular'}
                />
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-medium ${challenge.completed ? 'text-primary-light' : 'text-secondary-light'}`}>
                  {challenge.title}
                </h4>
                <p className="text-xs text-secondary-light/60">{challenge.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neon">+{challenge.xp} XP</span>
                {challenge.completed ? (
                  <CheckCircleIcon size={20} className="text-neon" weight="fill" />
                ) : (
                  <button
                    type="button"
                    onClick={() => completeChallenge(challenge.id)}
                    className="btn-neon text-xs px-3 py-1.5"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress */}
      <div className="bg-white/5 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-secondary-light">Daily Progress</span>
          <span className="text-sm text-neon font-mono">{totalXP} XP earned</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-neon via-neon/80 to-neon/60 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / dailyChallenges.length) * 100}%` }}
          />
        </div>
        {completedCount === dailyChallenges.length && (
          <p className="text-xs text-neon mt-2 text-center">
            🎉 All challenges completed! Great job!
          </p>
        )}
      </div>
    </div>
  );
}
