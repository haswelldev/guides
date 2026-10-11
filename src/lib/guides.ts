import { getCollection, type CollectionEntry } from 'astro:content';
import { bounds, members, rangeLabel, type ChronicleId } from '../data/chronicles';
import { sections } from '../data/sections';
import { href } from './url';

export interface Variant {
  entry: CollectionEntry<'variants'>;
  slug: string;
  label: string;
  chronicles: ChronicleId[];
  url: string;
}

export interface Guide {
  id: string;
  data: CollectionEntry<'guides'>['data'];
  url: string;
  variants: Variant[];
  chronicles: ChronicleId[];
}

let cache: Promise<Guide[]> | undefined;

/** All guides with their chronicle versions, validated. Throws (fails the build) on bad data. */
export function loadGuides(): Promise<Guide[]> {
  return (cache ??= build());
}

async function build(): Promise<Guide[]> {
  const [guideEntries, variantEntries] = await Promise.all([
    getCollection('guides'),
    getCollection('variants'),
  ]);

  const guides = guideEntries.map((g): Guide => {
    const url = href(g.id);
    const variants = variantEntries
      .filter((v) => v.id.startsWith(`${g.id}/`))
      .map((v): Variant => {
        const slug = v.id.slice(g.id.length + 1);
        return {
          entry: v,
          slug,
          label: rangeLabel(v.data.chronicles),
          chronicles: members(v.data.chronicles),
          url: `${url}${slug}/`,
        };
      })
      .sort((a, b) => bounds(a.entry.data.chronicles)[0] - bounds(b.entry.data.chronicles)[0]);

    if (!variants.length) throw new Error(`Guide "${g.id}" has no chronicle versions (*.mdx).`);
    for (let i = 1; i < variants.length; i++) {
      const prev = variants[i - 1];
      const cur = variants[i];
      if (bounds(prev.entry.data.chronicles)[1] >= bounds(cur.entry.data.chronicles)[0]) {
        throw new Error(
          `Guide "${g.id}": versions "${prev.slug}" (${prev.label}) and "${cur.slug}" (${cur.label}) overlap.`,
        );
      }
    }

    return {
      id: g.id,
      data: g.data,
      url,
      variants,
      chronicles: variants.flatMap((v) => v.chronicles),
    };
  });

  const orphan = variantEntries.find((v) => !guides.some((g) => v.id.startsWith(`${g.id}/`)));
  if (orphan) throw new Error(`"${orphan.id}.mdx" has no guide.yaml next to it.`);

  return guides.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

/** Sections in display order, each with its guides; empty sections are dropped. */
export async function loadSections() {
  const guides = await loadGuides();
  return sections
    .map((s) => ({ ...s, guides: guides.filter((g) => g.data.section === s.id) }))
    .filter((s) => s.guides.length);
}
