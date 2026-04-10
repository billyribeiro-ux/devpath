import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  CheckCircleIcon, WarningIcon, InfoIcon, TrophyIcon,
  XIcon
} from '@phosphor-icons/react';

export type ToastType = 'success' | 'error' | 'info' | 'achievement';

interface ToastProps {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
  duration?: number;
}

const icons = {
  success: CheckCircleIcon,
  error: WarningIcon,
  info: InfoIcon,
  achievement: TrophyIcon,
};

const colors = {
  success: 'text-neon border-neon/30 bg-neon/10',
  error: 'text-red-400 border-red-400/30 bg-red-400/10',
  info: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  achievement: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
};

export function Toast({ id, title, message, type, onClose, duration = 5000 }: ToastProps) {
  const [progress, setProgress] = useState(100);
  const Icon = icons[type];

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        onClose(id);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, id, onClose]);

  useEffect(() => {
    gsap.fromTo(
      `#toast-${id}`,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
  }, [id]);

  const handleClose = () => {
    gsap.to(`#toast-${id}`, {
      x: 100,
      opacity: 0,
      duration: 0.2,
      onComplete: () => onClose(id),
    });
  };

  return (
    <div
      id={`toast-${id}`}
      className={`relative w-80 p-4 rounded-xl border ${colors[type]} backdrop-blur-sm overflow-hidden`}
    >
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-current opacity-30 transition-all"
        style={{ width: `${progress}%` }}
      />

      <div className="flex items-start gap-3">
        <Icon size={24} weight="fill" className="flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-primary-light">{title}</h4>
          <p className="text-xs text-secondary-light mt-1">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <XIcon size={16} />
        </button>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    title: string;
    message: string;
    type: ToastType;
  }>;
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[400] flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
