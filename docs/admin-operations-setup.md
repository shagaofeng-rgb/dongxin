# Website operations backend setup

1. Use the dedicated Supabase project and apply both migrations in `supabase/migrations/` in filename order. The second migration adds indexes for visitor-journey and inquiry lookups.
2. Add the three Supabase connection variables from `.env.example` to the deployment environment.
3. In Supabase Authentication URL configuration, add:
   - `https://qzdxrv.com/auth/callback`
   - `https://www.qzdxrv.com/auth/callback`
   - the corresponding preview deployment callback when required.
4. Verify the Supabase Authentication email sender and redirect allowlist before relying on password recovery in production.
5. In a private terminal session, set `ADMIN_BOOTSTRAP_EMAIL` and `ADMIN_BOOTSTRAP_PASSWORD`, then run `pnpm admin:provision` once. These values must not be committed or added to public environment variables.

The standalone sign-in page is available at `https://qzdxrv.com/login`; successful sign-in opens the independent admin workspace. Website events are posted through server routes; browser clients never receive the service-role key. Visitor reporting stores country-level and device-level context only and does not retain raw IP addresses.
