import { useState, useRef } from 'react';
import { 
  User, Crown, Fire, Star, Trophy,
  SignOut, Camera, Pencil, Bell
} from '@phosphor-icons/react';
import { useAppStore } from '../store/appStore';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const {
    userName,
    setUserName,
    stats,
    achievements,
    soundEnabled,
    toggleSound,
    avatar,
    setAvatar,
    notificationsEnabled,
    setNotificationsEnabled,
  } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userName);
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'settings'>('overview');
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const progressToNextLevel = (stats.xp % 1000) / 1000 * 100;

  const handleSaveName = () => {
    if (editName.trim()) {
      setUserName(editName.trim());
      setIsEditing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: 'rgba(7, 10, 18, 0.9)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div 
        className="card-dark w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon/30 to-neon/10 flex items-center justify-center border-2 border-neon/30 overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="" className="h-full w-full object-cover" />
                ) : (
                  <User size={32} className="text-neon" weight="fill" />
                )}
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setAvatar(String(reader.result));
                  reader.readAsDataURL(file);
                  e.target.value = '';
                }}
              />
              <button
                type="button"
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-neon/20 transition-colors"
                onClick={() => avatarInputRef.current?.click()}
                aria-label="Change profile photo"
              >
                <Camera size={14} />
              </button>
            </div>
            <div>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    className="input-dark text-lg py-1 px-2"
                    autoFocus
                  />
                  <button onClick={handleSaveName} className="text-neon text-sm">Save</button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-semibold text-primary-light">{userName}</h3>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    <Pencil size={14} className="text-secondary-light" />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2 mt-1">
                <span className="pill pill-neon text-xs flex items-center gap-1">
                  <Crown size={12} weight="fill" />
                  Level {stats.level}
                </span>
                <span className="text-xs text-secondary-light">{stats.xp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <span className="text-secondary-light text-xl">×</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {(['overview', 'achievements', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab 
                  ? 'text-neon border-b-2 border-neon' 
                  : 'text-secondary-light hover:text-primary-light'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Level Progress */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-secondary-light">Progress to Level {stats.level + 1}</span>
                  <span className="text-sm text-neon font-mono">{Math.round(progressToNextLevel)}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-neon to-neon/60 rounded-full transition-all duration-500"
                    style={{ width: `${progressToNextLevel}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <Fire size={24} className="text-orange-400 mx-auto mb-2" weight="fill" />
                  <span className="text-2xl font-display font-bold text-primary-light">{stats.streak}</span>
                  <span className="text-xs text-secondary-light block">Day Streak</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <Trophy size={24} className="text-yellow-400 mx-auto mb-2" weight="fill" />
                  <span className="text-2xl font-display font-bold text-primary-light">{unlockedAchievements.length}</span>
                  <span className="text-xs text-secondary-light block">Achievements</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <Star size={24} className="text-neon mx-auto mb-2" weight="fill" />
                  <span className="text-2xl font-display font-bold text-primary-light">{stats.completedLessons}</span>
                  <span className="text-xs text-secondary-light block">Lessons</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <span className="text-2xl font-display font-bold text-primary-light">{stats.accuracy}%</span>
                  <span className="text-xs text-secondary-light block">Accuracy</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    achievement.unlockedAt 
                      ? 'bg-neon/10 border border-neon/30' 
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    achievement.unlockedAt ? 'bg-neon/20' : 'bg-white/10'
                  }`}>
                    <Trophy 
                      size={24} 
                      className={achievement.unlockedAt ? 'text-neon' : 'text-white/40'}
                      weight={achievement.unlockedAt ? 'fill' : 'regular'}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${achievement.unlockedAt ? 'text-primary-light' : 'text-secondary-light'}`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-secondary-light">{achievement.description}</p>
                    {!achievement.unlockedAt && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-secondary-light">Progress</span>
                          <span className="text-neon">{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-neon rounded-full"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {achievement.unlockedAt && (
                    <span className="text-xs text-neon font-mono">
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-secondary-light" />
                  <span className="text-primary-light">Notifications</span>
                </div>
                <button
                  type="button"
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    notificationsEnabled ? 'bg-neon' : 'bg-white/20'
                  }`}
                  aria-pressed={notificationsEnabled}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      notificationsEnabled ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  {soundEnabled ? (
                    <span className="text-lg">🔊</span>
                  ) : (
                    <span className="text-lg">🔇</span>
                  )}
                  <span className="text-primary-light">Sound Effects</span>
                </div>
                <button 
                  onClick={toggleSound}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    soundEnabled ? 'bg-neon' : 'bg-white/20'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    soundEnabled ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Fire size={20} className="text-orange-400" />
                  <span className="text-primary-light">Streak Freeze</span>
                  <span className="ml-auto text-neon font-mono">{stats.streakFreeze}</span>
                </div>
                <p className="text-xs text-secondary-light">
                  Use a streak freeze to protect your streak if you miss a day.
                </p>
              </div>

              <button
                type="button"
                className="w-full p-4 bg-red-500/10 text-red-400 rounded-xl flex items-center gap-3 hover:bg-red-500/20 transition-colors"
                onClick={() => {
                  localStorage.removeItem('devpath-storage');
                  window.location.reload();
                }}
              >
                <SignOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
