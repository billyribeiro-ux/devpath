import {
  PaletteIcon,
  StackIcon,
  AtomIcon,
  UserIcon,
  CrownIcon,
} from '@phosphor-icons/react';

/** Shared role list: Roadmap + Start Learning modal stay in sync. */
export const learningRoles = [
  { id: 'frontend', label: 'Front-end Developer', icon: PaletteIcon, desc: 'UI & interactions' },
  { id: 'fullstack', label: 'Full-stack Engineer', icon: StackIcon, desc: 'End-to-end systems' },
  { id: 'svelte', label: 'Svelte Specialist', icon: AtomIcon, desc: 'Modern frameworks' },
  { id: 'ui', label: 'UI Engineer', icon: UserIcon, desc: 'Design systems' },
  {
    id: 'principal',
    label: 'Principal · HTML/CSS (L7)',
    icon: CrownIcon,
    desc: 'Platform CSS & semantics · 2026 track',
  },
] as const;

export type LearningRoleId = (typeof learningRoles)[number]['id'];
