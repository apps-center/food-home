/* ============================================
   FOOD HOME - Thème clair/sombre
   Préférence dans localStorage['food_home_theme'] : "auto" | "light" | "dark".
   "auto" suit le réglage système. Pose data-theme="light|dark" sur <html>.
   Chargé dans le <head> de chaque page (et des iframes) pour éviter le flash.
   ============================================ */
(function () {
  var KEY = "food_home_theme";

  function pref() {
    try { return localStorage.getItem(KEY) || "auto"; } catch (e) { return "auto"; }
  }
  function systemDark() {
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function resolve(p) {
    return p === "dark" || (p === "auto" && systemDark()) ? "dark" : "light";
  }
  function apply() {
    document.documentElement.setAttribute("data-theme", resolve(pref()));
  }

  // API publique : change la préférence, applique, et notifie les iframes.
  window.setThemePref = function (p) {
    try {
      if (p === "auto") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, p);
    } catch (e) {}
    apply();
    try {
      var frames = document.querySelectorAll("iframe");
      for (var i = 0; i < frames.length; i++) {
        try { frames[i].contentWindow.postMessage({ type: "THEME_CHANGED" }, "*"); } catch (e) {}
      }
    } catch (e) {}
  };
  window.getThemePref = pref;

  // Suivre le système quand on est en "auto".
  if (window.matchMedia) {
    try {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        if (pref() === "auto") apply();
      });
    } catch (e) {}
  }
  // Cas iframe : le parent notifie un changement -> ré-appliquer (localStorage partagé).
  window.addEventListener("message", function (e) {
    if (e && e.data && e.data.type === "THEME_CHANGED") apply();
  });

  apply();
})();
