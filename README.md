# Kids Genius 🌈

A bilingual English + Telugu learning playground for children aged 1–10, designed around curiosity, confidence and safe play.

## Product experience
- Colourful, responsive learning home for web and Android.
- Five age paths from parent-assisted early discovery (1–2) to deeper problem-solving (9–10).
- Six learning worlds: English & Telugu, Maths, Science, Social Studies & GK, Life Skills, and Art & Creativity.
- English/Telugu interface toggle.
- Interactive sample quiz with answer feedback and star rewards.
- Parent-first safety principles: no public chat, public child profiles, behavioural advertising or location tracking.
- Reduced-motion support and responsive layouts for phones, tablets and desktop.

## Technology
- Web: Next.js, React and TypeScript (apps/web).
- Android: Expo + React Native (apps/mobile).
- Shared age bands, subjects and quiz data (packages/learning).
- Supabase schema foundation and row-level security migration (supabase/migrations).

## Run locally
Requirements: Node.js 20+ and npm.

    npm install
    npm run dev:web

For Android development:

    npm run dev:mobile

## Build the web app

    npm run build:web

## Important launch status

This repository is an actively developed MVP foundation, not yet a production-ready child learning service. The current quiz is a demonstration using sample questions. Parent registration and verified consent, real child profiles, a full question bank, audio, persistence, progress syncing, reward validation, parental dashboard, moderation/content review and production security testing still need to be implemented before public launch.

Never expose Supabase service-role credentials in client apps. Apply and test database row-level security before enabling real child accounts. Obtain appropriate parental consent and complete privacy/legal review before collecting children's data.