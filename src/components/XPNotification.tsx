import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { StarIcon, LightningIcon } from '@phosphor-icons/react';

interface XPNotificationProps {
  amount: number;
  reason: string;
  onComplete: () => void;
}

export default function XPNotification({ amount, reason, onComplete }: XPNotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      }
    });

    tl.fromTo('.xp-notification',
      { scale: 0, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    )
    .to('.xp-notification', {
      y: -20,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
    .to('.xp-notification', {
      scale: 0.8,
      opacity: 0,
      y: -50,
      duration: 0.3,
      delay: 2
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="xp-notification fixed bottom-8 left-1/2 -translate-x-1/2 z-[500]">
      <div className="bg-gradient-to-r from-neon/20 via-neon/30 to-neon/20 border border-neon/50 rounded-2xl px-8 py-4 flex items-center gap-4 shadow-2xl shadow-neon/20">
        <div className="w-12 h-12 rounded-full bg-neon/30 flex items-center justify-center animate-pulse">
          <LightningIcon size={24} className="text-neon" weight="fill" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-display font-bold text-neon">+{amount}</span>
            <StarIcon size={20} className="text-yellow-400" weight="fill" />
          </div>
          <p className="text-sm text-primary-light">{reason}</p>
        </div>
      </div>
    </div>
  );
}
