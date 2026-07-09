/*
  FOOD HOME — Enregistrement du Service Worker (PWA)
  Chargé dans le <head> des 4 pages (comme theme.js). Idempotent : le
  navigateur dédoublonne par scope, donc l'appeler depuis plusieurs pages
  (y compris les iframes eat/courses) ne pose pas de problème.
*/
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => console.log("✅ Service Worker enregistré", reg.scope))
      .catch((err) => console.warn("⚠️ Échec enregistrement Service Worker", err));
  });
}
