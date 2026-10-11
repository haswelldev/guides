// Home page sections, in display order. A section with no guides is hidden.
export const sections = [
  {
    id: 'epic-raid-bosses',
    title: 'Epic Raid Bosses',
    description: 'Access quests and run sheets for the epic bosses.',
  },
] as const;

export type SectionId = (typeof sections)[number]['id'];
export const sectionIds = sections.map((s) => s.id) as [SectionId, ...SectionId[]];
