# Onoma

A names encyclopedia — origins, meanings, and the relationships between given names.

Live at [onoma.anmitali.dev](https://onoma.anmitali.dev).

## Stack

- [Astro](https://astro.build), static output, deployed on Vercel via `@astrojs/vercel`
- Content Layer API (`src/content.config.ts`) with a Zod schema — invalid or dangling data fails the build
- Plain CSS with custom-property design tokens (no Tailwind — see [DESIGN.md](./DESIGN.md))
- Self-hosted variable fonts via Fontsource, no external font requests at runtime
- ESLint + Prettier, both Astro-aware (`eslint-plugin-astro`, `prettier-plugin-astro`)

## Adding a name

Names live as one JSON file per entry in `src/data/names/`, filename = id (e.g. `elena.json` → `/names/elena`). One file per name keeps diffs small and reviewable in a PR — a single-file dataset would turn every addition into a noisy diff on one growing array.

1. Create `src/data/names/<id>.json`:

   ```json
   {
     "name": "Elena",
     "gender": "female",
     "origin": "Greek",
     "meaning": "torch, bright one",
     "description": "A paragraph or two of prose etymology and cultural context.",
     "parent": "helena",
     "pronunciation": "eh-LEH-nah"
   }
   ```

   Required: `name`, `gender` (`female` | `male` | `unisex`), `origin`, `meaning`, `description`. Optional: `pronunciation`, `variants` (spelling forms of the same name that don't merit their own entry).

   Relationships aren't listed by hand. Instead:

   - `parent` — this name is a direct derivation of another entry (a diminutive, or the form in another language descended from it). Must reference an existing id.
   - `root` — a free-text label for a shared etymological root, for names that come from the same source independently rather than one being derived from the other (e.g. Anna and John both trace to the Hebrew root `ḥ-n-n`).

   A name's "Related names" list is computed at build time (`src/lib/related.ts`) from `parent`/`root`: its parent, its children (other entries whose `parent` points at it), its siblings (same `parent`), and anything sharing its `root`. This is a deliberate choice over a hand-maintained `related` array — with real-world naming that array has to be kept symmetric by hand (add B to A's list _and_ A to B's), and that duplication drifts out of sync as the dataset grows. If a name genuinely is _not_ derived from anything and shares no root with an existing entry, omit both fields; it'll show with no related names until something connects to it.

   Rule of thumb for what counts as a separate entry rather than a `variants` string: if it's pronounced differently, it's a different name (e.g. Alexander → Aleksandr, Alessandro, Iskander, Sasha are each their own entry with `parent: "alexander"`, not a `variants` list on Alexander).

2. Run `npm run astro sync` (or `npm run build`) to validate. A bad `gender` value or a `parent` id that doesn't exist fails the build rather than shipping silently.

## i18n

Routing uses Astro's built-in i18n (`astro.config.mjs`), with `en` as the only configured locale and `prefixDefaultLocale: false`. Right now that means routes are unprefixed (`/names/elena`), but the structure is ready to grow.

UI strings live in `src/i18n/<locale>.ts` as a flat key → string dictionary (see `src/i18n/en.ts`); pages call `useTranslations()` from `src/i18n/index.ts` to get a `t()` function. To add a locale:

1. Add the locale code to `locales` in `astro.config.mjs`.
2. Create `src/i18n/<locale>.ts`, copying the keys from `en.ts`.
3. Register it in the `dictionaries` map in `src/i18n/index.ts`.

Name _content_ (the entries themselves) isn't localized by this system — that would mean parallel per-locale data files, which is out of scope until there's a second language of entries to write.

## Commands

| Command           | Action                                   |
| :---------------- | :--------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Start the dev server at `localhost:4321` |
| `npm run build`   | Build to `./dist/`                       |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | ESLint + Prettier check                  |
| `npm run format`  | Prettier write                           |

## Deployment

Deploys to Vercel via the official Astro adapter. Push to `main`; no environment variables are required for the current feature set.

## License

Code is AGPL-3.0-only. Name entries in `src/data/names/` are published under CC BY-SA 4.0 — a separate license from the code, since the data is editorial/reference content rather than software.
