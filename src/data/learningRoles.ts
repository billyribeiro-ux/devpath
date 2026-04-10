import {
  Palette,
  Stack,
  Atom,
  User,
  Crown,
} from '@phosphor-icons/react';

/** Shared role list: Roadmap + Start Learning modal stay in sync. */
export const learningRoles = [
  { id: 'frontend', label: 'Front-end Developer', icon: Palette, desc: 'UI & interactions' },
  { id: 'fullstack', label: 'Full-stack Engineer', icon: Stack, desc: 'End-to-end systems' },
  { id: 'svelte', label: 'Svelte Specialist', icon: Atom, desc: 'Modern frameworks' },
  { id: 'ui', label: 'UI Engineer', icon: User, desc: 'Design systems' },
  {
    id: 'principal',
    label: 'Principal · HTML/CSS (L7)',
    icon: Crown,
    desc: 'Platform CSS & semantics · 2026 track',
  },
] as const;

export type LearningRoleId = (typeof learningRoles)[number]['id'];
