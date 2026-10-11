# Lineage 2 Guides

Astro static site, deployed to GitHub Pages (`https://haswelldev.github.io/guides/`) on push to `main`.
Structure, URLs and the guide file format: [README.md](README.md).

## Writing or editing a guide

Follow [docs/writing-guides.md](docs/writing-guides.md). The reference guide is
`src/content/guides/antharas/c5-gracia-final.mdx` — match its route logic, stop format and tone.

- Plan the route (item table → grouped hunts → hand-ins) before writing any text.
- Do not invent mechanics, names or "tested on" claims. Check names against the sources; mark anything
  untested and ask the user which server it was tested on.
- One chronicle version per file; ranges must not overlap.

## Checks

`npm run build` runs `astro check` and the content validation (schema, stop ids, chronicle ranges).
It must pass before committing.
