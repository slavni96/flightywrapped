# Flighty Wrapped – React + Tailwind

Responsive “wrapped” landing + story screens built with Vite + TypeScript, KISS components, and an atomic structure.

## Why
Built out of boredom while waiting for a flight home: a fan homage to Flighty, inspired by a Reddit post comparing Flighty to Spotify Wrapped. All data comes from [flighty.com](https://flighty.com/). Flighty already shows these stats in-app—this project just makes social-ready snapshots easy. Reddit thread: <https://www.reddit.com/r/flighty/comments/1pkufe3/flighty_wrapped_2025/>

## Run
- `npm install`
- `npm run dev` for local dev
- `npm run build` for production build

## Structure
- `src/components/atoms` – buttons, badges, icons.
- `src/components/molecules` – progress bars, timeline items, stat cards.
- `src/components/organisms` – full sections (hero, upload, how-to, summaries, fleet, airlines).
- `src/data/content.ts` – static assets/copy.
- `src/utils/parseFlights.ts` – CSV parser + stats builder.
- `src/types/flight.ts` – shared types.

## UX notes
- English copy throughout; primary color `#137fec`, dark gradient background, Plus Jakarta Sans.
- Two phases: landing (hero + upload + explainer) and insights (hidden until a CSV is parsed). Story navigation supports next/prev and “Back home”.
- Parsing runs 100% in-browser (PapaParse with tab/comma delimiter auto-detect); no network calls.
