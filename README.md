# Kabeen Kim — Academic Homepage

Personal academic homepage: **https://kbannie.github.io/**

The homepage includes About Me, News, Selected Publications, Education, Work Experience, and Academic Service. Paper figures, author lists, acceptance dates, and the CV follow the supplied source documents. The current page preserves the requested publication order: UDAPose, ConFuse, CoDU, SPTC.

## Editing and publishing

The editable React source is in `site-source/`. GitHub Pages serves the generated static files in the root of the `main` branch. `.nojekyll` keeps the generated `_next` assets available.

Requires Node.js 22.13 or later:

```sh
cd site-source
npm ci
npm run dev
```

After editing, regenerate the static site:

```sh
npm run build:deploy
```

Commit and push both the source and the generated root files to `main`. GitHub Pages publishes the change automatically. The publishing script uses `.pages-generated.json` to replace only generated files; the existing `0322.Q1.html` and `caculator/` pages are preserved.

Key files:

- `site-source/app/page.tsx`: homepage content and interactions.
- `site-source/app/globals.css`: responsive styling.
- `site-source/app/layout.tsx`: page title, canonical URL, and social metadata.
- `site-source/public/`: CV, profile, institution logos, and paper figures.

This is a static site without a database or server-side API. The client-side mobile menu and expandable research details work after React loads. No secret credentials or separate hosting service are required.
