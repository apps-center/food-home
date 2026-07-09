/*
  FOOD HOME — Service Worker
  --------------------------------------------------------------------------
  Rôle actuel :
    1. Rendre l'app installable (PWA) et fonctionnelle hors-ligne.
    2. Poser les fondations des notifications push (handlers 'push' /
       'notificationclick') — l'envoi réel viendra plus tard côté serveur
       (Vercel Function / Supabase Edge Function avec clés VAPID).

  Stratégie de cache : « réseau d'abord » pour tout le même-origine.
    - En ligne  : on sert toujours la version fraîche (pas de contenu périmé
      après un déploiement) et on met une copie en cache.
    - Hors-ligne: on retombe sur la copie en cache ; pour une navigation, on
      retombe sur la page d'accueil mise en cache.
  Bumper CACHE_VERSION invalide l'ancien cache au prochain déploiement.
*/

const CACHE_VERSION = "food-home-v3";

// Ressources de base pré-mises en cache à l'installation (coquille + données).
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/home.html",
  "/eat.html",
  "/courses.html",
  "/recipes.json",
  "/theme.js",
  "/pwa.js",
  "/vendor/supabase.js",
  "/supabase-config.js",
  "/cloud.js",
  "/manifest.webmanifest",
  "/css/tokens.css",
  "/css/common.css",
  "/css/eat.css",
  "/css/courses.css",
  "/css/home.css",
  "/css/login.css",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      // addAll échoue si une seule requête échoue → on tolère les absences.
      .then((cache) =>
        Promise.allSettled(CORE_ASSETS.map((url) => cache.add(url)))
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_VERSION)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // On ne gère que les GET même-origine (on laisse passer Google/Supabase, etc.).
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Copie en cache uniquement les réponses valides.
        if (response && response.status === 200 && response.type === "basic") {
          const copy = response.clone();
          caches
            .open(CACHE_VERSION)
            .then((cache) => cache.put(request, copy))
            .catch(() => {}); // quota plein, etc. : on ignore silencieusement
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        // Fallback navigation → page d'accueil hors-ligne.
        if (request.mode === "navigate") {
          return (await caches.match("/")) || (await caches.match("/index.html"));
        }
        return Response.error();
      })
  );
});

/* ==========================================================================
   NOTIFICATIONS PUSH — fondations (inactives tant qu'aucun serveur n'envoie)
   ========================================================================== */

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (_) {
    data = { body: event.data ? event.data.text() : "" };
  }
  const title = data.title || "FOOD HOME";
  const options = {
    body: data.body || "",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data: { url: data.url || "/" },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((list) => {
        for (const client of list) {
          if (client.url.includes(target) && "focus" in client)
            return client.focus();
        }
        if (self.clients.openWindow) return self.clients.openWindow(target);
      })
  );
});
