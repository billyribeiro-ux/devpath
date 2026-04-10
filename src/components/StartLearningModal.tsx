import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { learningRoles } from '@/data/learningRoles';
import { useAppStore } from '@/store/appStore';
import { academyMenuEntries } from '@/academy/registry';
import {
  BookOpen,
  Article,
  Code,
  MapTrifold,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLaunchAcademy: (trackId: string) => void;
  onGoRoadmap: () => void;
};

function academyEntryIcon(entry: (typeof academyMenuEntries)[number]) {
  if (entry.action === 'roadmap') return MapTrifold;
  if (entry.trackId === 'html-semantics') return BookOpen;
  if (entry.trackId === 'html-css-seo') return Article;
  return Code;
}

export default function StartLearningModal({
  open,
  onOpenChange,
  onLaunchAcademy,
  onGoRoadmap,
}: Props) {
  const roadmapRoleId = useAppStore((s) => s.roadmapRoleId);
  const setRoadmapRoleId = useAppStore((s) => s.setRoadmapRoleId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        overlayClassName="fixed inset-0 z-[400] bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        className={cn(
          'fixed z-[410] max-h-[min(90vh,720px)] w-[min(26rem,calc(100vw-1.5rem))] max-w-none translate-x-[-50%] translate-y-[-50%] gap-0 overflow-y-auto border border-white/10 bg-[rgba(10,12,18,0.98)] p-0 text-primary-light shadow-2xl sm:max-w-none'
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Start learning</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <div className="card-dark p-6">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.08em] text-secondary-light">
              Lesson tracks
            </span>
            <div className="space-y-2">
              {academyMenuEntries.map((entry, i) => {
                const Icon = academyEntryIcon(entry);
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={entry.disabled}
                    onClick={() => {
                      if (entry.disabled) return;
                      if (entry.action === 'roadmap') {
                        onGoRoadmap();
                        onOpenChange(false);
                        return;
                      }
                      if (entry.trackId) {
                        onLaunchAcademy(entry.trackId);
                        onOpenChange(false);
                      }
                    }}
                    className={cn(
                      'flex w-full items-center gap-4 rounded-lg border p-3 text-left transition-all duration-300',
                      entry.disabled
                        ? 'cursor-not-allowed border-transparent opacity-50'
                        : 'cursor-pointer border-transparent hover:border-white/10 hover:bg-white/5'
                    )}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 transition-colors">
                      <Icon
                        size={20}
                        className={
                          entry.disabled ? 'text-secondary-light/50' : 'text-secondary-light'
                        }
                        weight="regular"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block text-sm',
                          entry.disabled ? 'text-secondary-light/60' : 'text-primary-light'
                        )}
                      >
                        {entry.label}
                      </span>
                      <span className="block text-xs text-secondary-light/60">
                        {entry.description}
                      </span>
                    </div>
                    {!entry.disabled && (
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-white/30" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card-dark mt-4 p-6">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.08em] text-secondary-light">
              Select your role
            </span>
            <div className="space-y-2">
              {learningRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => {
                    setRoadmapRoleId(role.id);
                  }}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-lg border p-3 text-left transition-all duration-300',
                    roadmapRoleId === role.id
                      ? 'border-neon/50 bg-neon/10'
                      : 'border-transparent hover:bg-white/5'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors',
                      roadmapRoleId === role.id ? 'bg-neon/20' : 'bg-white/5'
                    )}
                  >
                    <role.icon
                      size={20}
                      className={
                        roadmapRoleId === role.id ? 'text-neon' : 'text-secondary-light'
                      }
                      weight={roadmapRoleId === role.id ? 'fill' : 'regular'}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block text-sm',
                        roadmapRoleId === role.id
                          ? 'text-primary-light'
                          : 'text-secondary-light'
                      )}
                    >
                      {role.label}
                    </span>
                    <span className="block text-xs text-secondary-light/60">{role.desc}</span>
                  </div>
                  <div
                    className={cn(
                      'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                      roadmapRoleId === role.id ? 'border-neon' : 'border-white/30'
                    )}
                  >
                    {roadmapRoleId === role.id && (
                      <div className="h-2 w-2 rounded-full bg-neon" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="btn-neon mt-4 w-full text-xs"
              onClick={() => {
                onGoRoadmap();
                onOpenChange(false);
              }}
            >
              View curriculum on Roadmap
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
