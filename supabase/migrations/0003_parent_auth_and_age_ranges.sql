-- Parent account bootstrap and curriculum age-range correction.
-- Safe to apply after 0001_initial_schema.sql and 0002_learning_progress_accounts.sql.

alter table public.parent_accounts
  add column if not exists parental_consent_at timestamptz,
  add column if not exists consent_version text;

-- Nursery-to-Class-10 content includes ages above the original 1-10 cap.
alter table public.topics drop constraint if exists topics_age_min_check;
alter table public.topics drop constraint if exists topics_age_max_check;
alter table public.topics
  add constraint topics_age_min_check check (age_min between 1 and 18),
  add constraint topics_age_max_check check (age_max between age_min and 18);

alter table public.questions drop constraint if exists questions_age_min_check;
alter table public.questions drop constraint if exists questions_age_max_check;
alter table public.questions
  add constraint questions_age_min_check check (age_min between 1 and 18),
  add constraint questions_age_max_check check (age_max between age_min and 18);

-- Create the parent profile automatically when Supabase Auth creates a user.
-- Consent metadata is recorded only when the signup form explicitly submits it.
create or replace function public.handle_new_parent()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.parent_accounts (id, display_name, parental_consent_at, consent_version)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), 'Parent'),
    case when new.raw_user_meta_data ->> 'parental_consent' = 'true' then now() else null end,
    new.raw_user_meta_data ->> 'consent_version'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_parent on auth.users;
create trigger on_auth_user_created_parent
  after insert on auth.users
  for each row execute procedure public.handle_new_parent();

-- Keep authenticated access explicit; row-level security policies remain authoritative.
grant select, insert, update on public.parent_accounts to authenticated;
grant select, insert, update, delete on public.child_profiles to authenticated;
grant select, insert, update, delete on public.learning_progress to authenticated;
grant select, insert, update, delete on public.parental_settings to authenticated;
grant select, insert on public.quiz_attempts to authenticated;
grant select, insert on public.achievements to authenticated;
