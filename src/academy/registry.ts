import type { AcademyTrack } from './types';
import { htmlSemanticsTrack } from './tracks/htmlSemantics';
import { htmlCssSeoTrack } from './tracks/htmlCssSeo';

export const academyTracksById: Record<string, AcademyTrack> = {
  [htmlSemanticsTrack.id]: htmlSemanticsTrack,
  [htmlCssSeoTrack.id]: htmlCssSeoTrack,
};

export const academyMenuEntries: {
  trackId: string | null;
  /** Scroll to Roadmap section when chosen */
  action?: 'roadmap';
  label: string;
  description: string;
  disabled?: boolean;
}[] = [
  {
    trackId: 'html-semantics',
    label: htmlSemanticsTrack.menuLabel,
    description: htmlSemanticsTrack.menuDescription,
  },
  {
    trackId: 'html-css-seo',
    label: htmlCssSeoTrack.menuLabel,
    description: htmlCssSeoTrack.menuDescription,
  },
  {
    trackId: null,
    label: 'HTML / CSS / JavaScript',
    description: 'DOM, events, modules — browser + UI engineering track — coming next',
    disabled: true,
  },
  {
    trackId: null,
    action: 'roadmap',
    label: 'Browse full role paths',
    description: 'Roadmap · all role curricula in the main scroll',
    disabled: false,
  },
];

export function getAcademyTrack(id: string): AcademyTrack | undefined {
  return academyTracksById[id];
}
