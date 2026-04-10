import type { AcademyTrack } from './types';
import { htmlFoundationsTrack } from './tracks/htmlFoundations';
import { htmlSemanticsTrack } from './tracks/htmlSemantics';
import { htmlCssTrack } from './tracks/htmlCss';
import { htmlCssSeoTrack } from './tracks/htmlCssSeo';

export const academyTracksById: Record<string, AcademyTrack> = {
  [htmlFoundationsTrack.id]: htmlFoundationsTrack,
  [htmlSemanticsTrack.id]: htmlSemanticsTrack,
  [htmlCssTrack.id]: htmlCssTrack,
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
    trackId: 'html-foundations',
    label: htmlFoundationsTrack.menuLabel,
    description: htmlFoundationsTrack.menuDescription,
  },
  {
    trackId: 'html-semantics',
    label: htmlSemanticsTrack.menuLabel,
    description: htmlSemanticsTrack.menuDescription,
  },
  {
    trackId: 'html-css',
    label: htmlCssTrack.menuLabel,
    description: htmlCssTrack.menuDescription,
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
