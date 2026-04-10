import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export type Theme = 'dark' | 'light' | 'system';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  type: 'lesson' | 'practice' | 'review' | 'project';
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  streakFreeze: number;
  totalLessons: number;
  completedLessons: number;
  totalProjects: number;
  completedProjects: number;
  totalReviews: number;
  accuracy: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'achievement';
  read: boolean;
  createdAt: string;
}

export type LabProjectType = 'html' | 'html-css' | 'html-css-js';

export interface LabProject {
  id: string;
  name: string;
  type: LabProjectType;
  /** Multi-file lab: index.html, styles.css, script.js, … */
  files?: Record<string, string>;
  /** Legacy single-file projects (migrated in UI via getLabProjectFiles). */
  code?: string;
  updatedAt: number;
}

interface AppState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  
  // User Profile
  userName: string;
  setUserName: (name: string) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
  
  // Stats
  stats: UserStats;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  useStreakFreeze: () => boolean;
  addStreakFreeze: () => void;
  
  // Achievements
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  updateAchievementProgress: (id: string, progress: number) => void;
  
  // Daily Challenges
  dailyChallenges: DailyChallenge[];
  completeChallenge: (id: string) => void;
  refreshDailyChallenges: () => void;
  
  // Notifications
  notifications: Notification[];
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  unreadCount: () => number;

  // Roadmap
  roadmapRoleId: string;
  setRoadmapRoleId: (id: string) => void;

  /** Saved lesson / resource ids (e.g. `lesson-css-grid`) */
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  
  // Sound
  soundEnabled: boolean;
  toggleSound: () => void;
  
  // Search
  searchHistory: string[];
  addSearch: (query: string) => void;
  clearSearchHistory: () => void;
  
  // Notes
  notes: Record<string, { content: string; tags: string[]; updatedAt: string }>;
  saveNote: (id: string, content: string, tags: string[]) => void;
  deleteNote: (id: string) => void;
  
  // Mistakes
  mistakes: Array<{
    id: string;
    message: string;
    type: 'syntax' | 'runtime' | 'logic';
    count: number;
    lastOccurred: string;
  }>;
  addMistake: (mistake: Omit<AppState['mistakes'][0], 'id' | 'count' | 'lastOccurred'>) => void;
  
  // Projects
  activeProject: string | null;
  setActiveProject: (project: string | null) => void;

  /** Saved HTML lab projects (editor + preview). */
  labProjects: LabProject[];
  addLabProject: (input: {
    name: string;
    type: LabProjectType;
    files: Record<string, string>;
  }) => LabProject;
  updateLabProject: (
    id: string,
    patch: Partial<Pick<LabProject, 'name' | 'type' | 'files' | 'code'>>
  ) => void;
  removeLabProject: (id: string) => void;
}

const defaultAchievements: Achievement[] = [
  { id: 'first-lesson', title: 'First Steps', description: 'Complete your first lesson', icon: 'Footprints', progress: 0, maxProgress: 1 },
  { id: 'streak-7', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: 'Fire', progress: 0, maxProgress: 7 },
  { id: 'streak-30', title: 'Monthly Master', description: 'Maintain a 30-day streak', icon: 'Crown', progress: 0, maxProgress: 30 },
  { id: 'xp-1000', title: 'Rising Star', description: 'Earn 1,000 XP', icon: 'Star', progress: 0, maxProgress: 1000 },
  { id: 'xp-10000', title: 'Legend', description: 'Earn 10,000 XP', icon: 'Trophy', progress: 0, maxProgress: 10000 },
  { id: 'review-50', title: 'Memory Master', description: 'Complete 50 reviews', icon: 'Brain', progress: 0, maxProgress: 50 },
  { id: 'project-5', title: 'Builder', description: 'Complete 5 projects', icon: 'Hammer', progress: 0, maxProgress: 5 },
  { id: 'night-owl', title: 'Night Owl', description: 'Study after midnight', icon: 'Moon', progress: 0, maxProgress: 1 },
  { id: 'early-bird', title: 'Early Bird', description: 'Study before 6 AM', icon: 'Sun', progress: 0, maxProgress: 1 },
  { id: 'perfect-week', title: 'Perfect Week', description: 'Complete all daily challenges in a week', icon: 'CheckCircle', progress: 0, maxProgress: 7 },
];

const generateDailyChallenges = (): DailyChallenge[] => [
  { id: 'dc1', title: 'Morning Lesson', description: 'Complete 1 lesson today', xp: 50, completed: false, type: 'lesson' },
  { id: 'dc2', title: 'Practice Makes Perfect', description: 'Practice code for 15 minutes', xp: 30, completed: false, type: 'practice' },
  { id: 'dc3', title: 'Memory Refresh', description: 'Complete 5 reviews', xp: 40, completed: false, type: 'review' },
  { id: 'dc4', title: 'Ship It', description: 'Submit a project feature', xp: 100, completed: false, type: 'project' },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      
      // User Profile
      userName: 'Developer',
      setUserName: (userName) => set({ userName }),
      avatar: '',
      setAvatar: (avatar) => set({ avatar }),
      
      // Stats
      stats: {
        xp: 0,
        level: 1,
        streak: 0,
        longestStreak: 0,
        streakFreeze: 1,
        totalLessons: 0,
        completedLessons: 0,
        totalProjects: 0,
        completedProjects: 0,
        totalReviews: 0,
        accuracy: 0,
      },
      addXP: (amount) => set((state) => {
        const newXP = state.stats.xp + amount;
        const newLevel = Math.floor(newXP / 1000) + 1;
        return {
          stats: {
            ...state.stats,
            xp: newXP,
            level: newLevel,
          }
        };
      }),
      incrementStreak: () => set((state) => {
        const newStreak = state.stats.streak + 1;
        return {
          stats: {
            ...state.stats,
            streak: newStreak,
            longestStreak: Math.max(newStreak, state.stats.longestStreak),
          }
        };
      }),
      useStreakFreeze: () => {
        const state = get();
        if (state.stats.streakFreeze > 0) {
          set((state) => ({
            stats: {
              ...state.stats,
              streakFreeze: state.stats.streakFreeze - 1,
            }
          }));
          return true;
        }
        return false;
      },
      addStreakFreeze: () => set((state) => ({
        stats: {
          ...state.stats,
          streakFreeze: state.stats.streakFreeze + 1,
        }
      })),
      
      // Achievements
      achievements: defaultAchievements,
      unlockAchievement: (id) => set((state) => ({
        achievements: state.achievements.map(a =>
          a.id === id ? { ...a, unlockedAt: new Date().toISOString(), progress: a.maxProgress } : a
        )
      })),
      updateAchievementProgress: (id, progress) => set((state) => ({
        achievements: state.achievements.map(a =>
          a.id === id ? { ...a, progress: Math.min(progress, a.maxProgress) } : a
        )
      })),
      
      // Daily Challenges
      dailyChallenges: generateDailyChallenges(),
      completeChallenge: (id) => set((state) => {
        const challenge = state.dailyChallenges.find(c => c.id === id);
        if (challenge && !challenge.completed) {
          get().addXP(challenge.xp);
          get().addNotification({
            title: 'Daily challenge',
            message: `Completed: ${challenge.title} (+${challenge.xp} XP)`,
            type: 'achievement',
          });
          return {
            dailyChallenges: state.dailyChallenges.map(c =>
              c.id === id ? { ...c, completed: true } : c
            )
          };
        }
        return state;
      }),
      refreshDailyChallenges: () => set({ dailyChallenges: generateDailyChallenges() }),
      
      // Notifications
      notifications: [],
      notificationsEnabled: true,
      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
      addNotification: (notification) => {
        const state = get();
        if (!state.notificationsEnabled) return;
        set((s) => ({
          notifications: [
            {
              ...notification,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
              read: false,
            },
            ...s.notifications,
          ].slice(0, 50),
        }));
      },
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n =>
          n.id === id ? { ...n, read: true } : n
        )
      })),
      clearNotifications: () => set({ notifications: [] }),
      unreadCount: () => get().notifications.filter(n => !n.read).length,
      
      // Sound
      soundEnabled: true,
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      
      // Search
      searchHistory: [],
      addSearch: (query) => set((state) => ({
        searchHistory: [query, ...state.searchHistory.filter(q => q !== query)].slice(0, 10)
      })),
      clearSearchHistory: () => set({ searchHistory: [] }),
      
      // Notes
      notes: {},
      saveNote: (id, content, tags) => set((state) => ({
        notes: {
          ...state.notes,
          [id]: { content, tags, updatedAt: new Date().toISOString() }
        }
      })),
      deleteNote: (id) =>
        set((state) => {
          const next = { ...state.notes };
          delete next[id];
          return { notes: next };
        }),
      
      // Mistakes
      mistakes: [],
      addMistake: (mistake) => set((state) => {
        const existing = state.mistakes.find(m => m.message === mistake.message);
        if (existing) {
          return {
            mistakes: state.mistakes.map(m =>
              m.message === mistake.message
                ? { ...m, count: m.count + 1, lastOccurred: new Date().toISOString() }
                : m
            )
          };
        }
        return {
          mistakes: [
            ...state.mistakes,
            {
              ...mistake,
              id: Math.random().toString(36).substr(2, 9),
              count: 1,
              lastOccurred: new Date().toISOString(),
            }
          ]
        };
      }),
      
      // Projects
      activeProject: null,
      setActiveProject: (activeProject) => set({ activeProject }),

      labProjects: [],
      addLabProject: ({ name, type, files }) => {
        const project: LabProject = {
          id: Math.random().toString(36).slice(2, 11),
          name: name.trim() || 'Untitled',
          type,
          files,
          updatedAt: Date.now(),
        };
        set((state) => ({ labProjects: [project, ...state.labProjects] }));
        return project;
      },
      updateLabProject: (id, patch) =>
        set((state) => ({
          labProjects: state.labProjects.map((p) => {
            if (p.id !== id) return p;
            const next: LabProject = {
              ...p,
              ...patch,
              name: patch.name !== undefined ? patch.name.trim() || 'Untitled' : p.name,
              updatedAt: Date.now(),
            };
            if (patch.files !== undefined) {
              return { ...next, files: patch.files, code: undefined };
            }
            return next;
          }),
        })),
      removeLabProject: (id) =>
        set((state) => ({
          labProjects: state.labProjects.filter((p) => p.id !== id),
        })),

      roadmapRoleId: 'frontend',
      setRoadmapRoleId: (roadmapRoleId) => set({ roadmapRoleId }),

      bookmarks: [],
      toggleBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(id)
            ? state.bookmarks.filter((b) => b !== id)
            : [...state.bookmarks, id],
        })),
    }),
    {
      name: 'devpath-storage',
      partialize: (state) => ({
        theme: state.theme,
        userName: state.userName,
        avatar: state.avatar,
        stats: state.stats,
        achievements: state.achievements,
        dailyChallenges: state.dailyChallenges,
        soundEnabled: state.soundEnabled,
        notificationsEnabled: state.notificationsEnabled,
        searchHistory: state.searchHistory,
        notes: state.notes,
        mistakes: state.mistakes,
        roadmapRoleId: state.roadmapRoleId,
        bookmarks: state.bookmarks,
        labProjects: state.labProjects,
      }),
    }
  )
);
