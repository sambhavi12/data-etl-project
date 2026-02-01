-- Trigger to automatically create a profile for new users
-- Run this in the Supabase SQL Editor if you are getting "Foreign key violation" or RLS errors when submitting.

-- 1. Create the Function
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

-- 2. Create the Trigger
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. (Optional) Backfill for existing users (like the one you just created)
insert into public.profiles (id, email)
select id, email from auth.users
where id not in (select id from public.profiles)
on conflict do nothing;
