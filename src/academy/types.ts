export type LessonBlock =
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; title: string; text: string };

export type AcademyLesson = {
  id: string;
  /** Short label in lesson switcher */
  shortTitle: string;
  title: string;
  blocks: LessonBlock[];
  /** What to do in the editor */
  exercise: string;
  starterHtml: string;
};

export type AcademyTrack = {
  id: string;
  menuLabel: string;
  menuDescription: string;
  dialogTitle: string;
  lessons: AcademyLesson[];
  /** Allow application/ld+json scripts in iframe preview (other script still stripped). */
  allowJsonLdScriptsInPreview?: boolean;
};
