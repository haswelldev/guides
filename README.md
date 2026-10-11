# Lineage 2 Guides

Quest routes and run sheets for Lineage 2, with one version per chronicle range.
Live at <https://haswelldev.github.io/guides/>.

Built with [Astro](https://astro.build) as a static site. Every push to `main` is built and deployed to
GitHub Pages by [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

```bash
npm install
npm run dev       # http://localhost:4321/guides/
npm run build     # type-check + build to dist/
```

## How content is organised

```
src/data/chronicles.ts        ordered list of chronicles (ranges are resolved against it)
src/data/sections.ts          home page sections, in display order
src/content/guides/<guide>/
  guide.yaml                  shared by all versions: title, section, order, blurb, quest
  <version>.mdx               one chronicle version of the guide
```

URLs are short and do not include the section: `/guides/<guide>/` (e.g. `/guides/antharas/`) opens the
version for the visitor's chronicle (or the only one), and `/guides/<guide>/<version>/` is the version
itself. The folder name is the URL, so pick it once and do not rename it.

## Add a guide

Read [docs/writing-guides.md](docs/writing-guides.md) first: it covers how to plan the route and
write the stops, with the Antharas guide as the example.


1. Create `src/content/guides/<guide>/guide.yaml`:

   ```yaml
   title: Valakas
   section: epic-raid-bosses
   order: 20            # position inside the section
   blurb: One sentence for the home page card.
   quest: { id: 229, name: Test of Witchcraft }   # optional
   ```

2. Add at least one version file next to it (below). The build fails if a guide has no version.

## Add a chronicle version

Create `src/content/guides/<guide>/<version>.mdx`. Name the file after its range, e.g.
`c4-and-below.mdx`, `c5-gracia-final.mdx`, `gracia-epilogue-and-later.mdx` — the name becomes the URL.

```yaml
---
title: Antharas Run Sheet
subtitle: Audience with the Land Dragon, in a better order   # optional
description: Meta description for search and link previews.
eyebrow: Faster route                                        # optional, after "Quest 337 ·"
chronicles: { from: c5, to: gracia-final }   # leave out `from` for "and earlier", `to` for "and later"
testedOn: L2Reborn Signature                 # optional
facts:
  - { label: Level, value: 50+ }
summary:                                     # optional box at the top
  text: Inline **markdown** is allowed here.   # a sentence, and/or:
  points:                                    # key points, one line each (preferred)
    - { label: Potions, text: Buy them at the start. }
  baseline: { count: 26, label: normal guide }   # optional "26 → 18 stops" comparison
phases:                                      # optional checklist route
  - title: Start the quest
    note: optional italic note
    stops:
      - id: start              # stable slug; saved progress is keyed by it
        where: Giran, town square
        who: Gabrielle         # optional
        act: talk              # hunt | talk | move
        text:
          - "One paragraph per item. Quote lines that contain `: ` or start with `*`."
        give: [Item A]
        get: [Item B]
        group: 1 mob per person   # optional group note
        do:                       # optional green "Do" box: the one action that must be exact
          - "Answer **\"I work alone.\"**"
        warn:                     # optional red "Danger" box
          - "**Do not talk to X again** — it ends the quest."
items:                                       # optional item table
  - { item: Hamrut Leg, from: Hamrut, zone: "Giant's Cave", to: Chakiris }
sources:
  - { label: L2Hub quest 337, url: 'https://l2hub.info/quests/337-audience-with-the-land-dragon' }
---

Free prose goes here, shown between the summary and the route. These components work without imports:

<Callout title="Heads up" kind="warn">Text…</Callout>       (kind: info | warn)

<Section title="Before you start" lead="Optional lead line.">
  <Cards>
    <Card title="Tip">Text…</Card>
  </Cards>
</Section>
```

Rules the build enforces:

- Versions of one guide must not overlap (`c5 → gracia-final` and `gracia-final → …` fails).
  Gaps are allowed — a chronicle with no version shows "no version yet".
- Stop ids must be unique within a version.
- Chronicle and section ids must exist in `src/data/`.

Text fields in frontmatter accept `**bold**`, `*italic*` and `[links](url)`; everything else is escaped.

## Add a section or chronicle

- **Section:** add an entry to `src/data/sections.ts`. It shows on the home page once a guide uses it.
  Sections only group guides on the home page; they are not part of guide URLs.
- **Chronicle:** append to `src/data/chronicles.ts`. Keep the release order and never rename an id.

## Moving to a custom domain

In `astro.config.mjs` set `site` to the domain and remove `base`, then add the domain in the
repository's Pages settings. All internal links go through `href()` in `src/lib/url.ts`, so nothing else changes.
