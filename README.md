# Kids Genius 🌈

A bilingual English + Telugu learning playground for learners from Nursery through Class 10, designed around curiosity, confidence and safe play.

## Product experience
- Colourful, responsive learning home for web and Android.
- Thirteen school-level paths: Nursery, LKG, UKG and Classes 1–10.
- A broad subject catalogue: English, Telugu, Hindi, Mathematics, Physics, Chemistry, Biology, Science, History, Geography, Civics, Economics, Social Studies, Computer Science, Environmental Studies, Life Skills, Art & Creativity, Physical Education and Commerce basics.
- English/Telugu interface toggle.
- Interactive sample quiz with answer feedback and star rewards.
- Parent-first safety principles: no public chat, public child profiles, behavioural advertising or location tracking.
- Reduced-motion support and responsive layouts for phones, tablets and desktop.

## Technology
- Web: Next.js, React and TypeScript (apps/web).
- Android: Expo + React Native (apps/mobile).
- Shared age bands, subjects and quiz data (packages/learning).
- Supabase schema foundation and row-level security migration (supabase/migrations).

## Parent login and learner progress

1. Create a Supabase project and copy its Project URL and anon/public key into the web deployment environment as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Run `supabase/migrations/0001_initial_schema.sql`, `0002_learning_progress_accounts.sql`, and `0003_parent_auth_and_age_ranges.sql` in order in the Supabase SQL editor.
3. Enable email/password authentication and configure the Site URL plus allowed redirect URLs for your deployed web domain. Keep email confirmation enabled for parent sign-up.
4. Deploy again. Parents can create an account, confirm their email, sign in, and create separate learner nicknames. The app uses Supabase Auth sessions; progress can be saved to the selected learner, class and subject from the parent dashboard. Existing local-only accounts are not migrated automatically.

The third migration creates parent profile rows from Supabase Auth sign-ups, records the consent checkbox/version submitted during registration, and extends content age ranges to support the full school-level catalogue. Review the stored consent record and provide an appropriate privacy notice and consent withdrawal process before launch. A checkbox alone is not a legal compliance guarantee.\n\nNever use a Supabase service-role key in the browser. Complete parental consent, privacy and child-safety review before public launch.

## Run locally
Requirements: Node.js 20+ and npm.

    npm install
    npm run dev:web

For Android development:

    npm run dev:mobile

## Build the web app

    npm run build:web

## Important launch status

This repository is an actively developed MVP foundation, not yet a production-ready child learning service. The current quiz is a demonstration using sample questions. Parent registration and verified consent, real child profiles, a curriculum-aligned question banks and reviewed learning materials, audio, persistence, progress syncing, reward validation, parental dashboard, moderation/content review and production security testing still need to be implemented before public launch.

Never expose Supabase service-role credentials in client apps. Apply and test database row-level security before enabling real child accounts. Obtain appropriate parental consent and complete privacy/legal review before collecting children's data.