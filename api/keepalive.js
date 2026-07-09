/*
  FOOD HOME — Keep-alive Supabase (fonction serverless Vercel)
  --------------------------------------------------------------------------
  Déclenchée par le cron défini dans vercel.json (une fois par jour). Fait une
  requête REST légère vers Supabase pour marquer de l'activité et EMPÊCHER la
  mise en pause de l'offre gratuite (~7 j d'inactivité) — le piège qui avait
  rendu l'ancien projet irrécupérable.

  Les valeurs sont publiques (URL + clé anon) : on peut les mettre en dur, avec
  repli sur des variables d'environnement Vercel si tu préfères les y stocker.
*/
const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://trvacvthdbeqczaqtorj.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRydmFjdnRoZGJlcWN6YXF0b3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1ODMzNzMsImV4cCI6MjA5OTE1OTM3M30.Y8YbsWXVZcZMYegNd8gqQ7Q5F-dJzfYjG4qVQSoevoc";

export default async function handler(req, res) {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/shopping_list?select=id&limit=1`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    res.status(200).json({ ok: true, ping: r.status, at: new Date().toISOString() });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
