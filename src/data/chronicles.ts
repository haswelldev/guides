// Release order matters: guide variants declare a `from`/`to` range over this list.
// Append newer chronicles at the end; never reorder or rename ids (they are in URLs and content).
export const chronicles = [
  { id: 'c1', name: 'C1: Harbingers of War' },
  { id: 'c2', name: 'C2: Age of Splendor' },
  { id: 'c3', name: 'C3: Rise of Darkness' },
  { id: 'c4', name: 'C4: Scions of Destiny' },
  { id: 'c5', name: 'C5: Oath of Blood' },
  { id: 'interlude', name: 'Interlude' },
  { id: 'kamael', name: 'The Kamael' },
  { id: 'hellbound', name: 'Hellbound' },
  { id: 'gracia-1', name: 'Gracia Part 1' },
  { id: 'gracia-2', name: 'Gracia Part 2' },
  { id: 'gracia-final', name: 'Gracia Final' },
  { id: 'gracia-epilogue', name: 'Gracia Epilogue' },
  { id: 'freya', name: 'Freya' },
  { id: 'high-five', name: 'High Five' },
] as const;

export type ChronicleId = (typeof chronicles)[number]['id'];
export const chronicleIds = chronicles.map((c) => c.id) as [ChronicleId, ...ChronicleId[]];

/** Short label used in ranges and badges: "C5", "Gracia Final". */
export function shortName(id: ChronicleId): string {
  const name = chronicles[indexOf(id)].name;
  return name.includes(':') ? name.slice(0, name.indexOf(':')) : name;
}

export function indexOf(id: ChronicleId): number {
  return chronicleIds.indexOf(id);
}

/** Open-ended on either side: no `from` = since the first chronicle, no `to` = up to the latest. */
export interface ChronicleRange {
  from?: ChronicleId;
  to?: ChronicleId;
}

export function bounds(r: ChronicleRange): [number, number] {
  return [r.from ? indexOf(r.from) : 0, r.to ? indexOf(r.to) : chronicleIds.length - 1];
}

export function members(r: ChronicleRange): ChronicleId[] {
  const [lo, hi] = bounds(r);
  return chronicleIds.slice(lo, hi + 1);
}

export function rangeLabel(r: ChronicleRange): string {
  if (!r.from && !r.to) return 'All chronicles';
  if (!r.from) return `${shortName(r.to!)} and earlier`;
  if (!r.to) return `${shortName(r.from)} and later`;
  if (r.from === r.to) return shortName(r.from);
  return `${shortName(r.from)} – ${shortName(r.to)}`;
}
