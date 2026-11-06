alter table public.learning_progress
  add column if not exists grade_id text not null default 'unassigned',
  add column if not exists stars_earned integer not null default 0 check (stars_earned >= 0),
  add column if not exists lessons_completed integer not null default 0 check (lessons_completed >= 0),
  add column if not exists study_days jsonb not null default '[]'::jsonb;

alter table public.learning_progress drop constraint if exists learning_progress_pkey;
alter table public.learning_progress add constraint learning_progress_pkey primary key (child_id, subject_id, grade_id);
