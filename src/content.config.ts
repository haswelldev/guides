import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { chronicleIds, indexOf } from './data/chronicles';
import { sectionIds } from './data/sections';

// src/content/guides/<guide>/guide.yaml — what all chronicle versions of a guide share.
const guides = defineCollection({
  loader: glob({
    base: './src/content/guides',
    pattern: '*/guide.yaml',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    section: z.enum(sectionIds),
    order: z.number().default(100),
    blurb: z.string(),
    quest: z.object({ id: z.number().int(), name: z.string() }).optional(),
  }),
});

// Text fields marked "inline" accept **bold**, *italic* and [links](url).
const inline = z.string();

const stop = z.object({
  // Stable slug: saved progress is keyed by it, so keep it when stops are reordered.
  id: z.string().regex(/^[a-z0-9-]+$/, 'lowercase slug'),
  where: z.string(),
  who: z.string().optional(),
  act: z.enum(['hunt', 'talk', 'move']),
  text: z.array(inline).default([]),
  give: z.array(z.string()).default([]),
  get: z.array(z.string()).default([]),
  group: z.string().optional(),
  // Green "Do" box: the one action at this stop that must be done exactly right.
  do: z.array(inline).default([]),
  // Red "Danger" box: only for mistakes that lose items or progress.
  warn: z.array(inline).default([]),
});

// src/content/guides/<guide>/<variant>.mdx — one chronicle version of a guide.
// Frontmatter holds the structured parts; the MDX body is the prose shown between summary and route.
const variants = defineCollection({
  loader: glob({
    base: './src/content/guides',
    pattern: '*/*.mdx',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: z
    .object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string(),
      eyebrow: z.string().optional(),
      chronicles: z
        .object({ from: z.enum(chronicleIds).optional(), to: z.enum(chronicleIds).optional() })
        .refine((r) => !r.from || !r.to || indexOf(r.from) <= indexOf(r.to), '`from` is after `to`'),
      testedOn: z.string().optional(),
      facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      summary: z
        .object({
          text: inline.optional(),
          // Key points, one line each: a short label and what to do. Easier to scan than a long paragraph.
          points: z.array(z.object({ label: z.string(), text: inline })).default([]),
          baseline: z.object({ count: z.number().int(), label: z.string() }).optional(),
        })
        .refine((s) => s.text || s.points.length, 'summary needs `text` or `points`')
        .optional(),
      phases: z
        .array(z.object({ title: z.string(), note: z.string().optional(), stops: z.array(stop).min(1) }))
        .optional(),
      items: z
        .array(z.object({ item: z.string(), from: inline, zone: z.string(), to: z.string() }))
        .optional(),
      sources: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    })
    .superRefine((v, ctx) => {
      const seen = new Set<string>();
      for (const s of v.phases?.flatMap((p) => p.stops) ?? []) {
        if (seen.has(s.id)) ctx.addIssue({ code: 'custom', message: `duplicate stop id "${s.id}"` });
        seen.add(s.id);
      }
    }),
});

export const collections = { guides, variants };
