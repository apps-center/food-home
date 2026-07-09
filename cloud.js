/*
  FOOD HOME — Couche cloud (Supabase) : auth Google + sync liste partagée
  --------------------------------------------------------------------------
  Chargée après vendor/supabase.js et supabase-config.js. Expose window.FoodHomeCloud.

  Principes :
  - 100 % DÉFENSIF : si Supabase est indisponible / mal configuré / hors-ligne,
    aucune erreur ne remonte et l'app retombe sur son fonctionnement
    localStorage habituel (aucune régression par rapport au mode PIN seul).
  - La session Supabase (connexion Google) fait « pont » avec la session
    legacy (food_home_logged_in) : être connecté Google ⇒ connecté à l'app.
  - Liste de courses : une seule ligne partagée ('shared') que tous les
    membres connectés lisent/écrivent (app familiale) → sync multi-appareils.
*/
(function () {
  "use strict";

  const URL = window.FOOD_HOME_SUPABASE_URL;
  const ANON = window.FOOD_HOME_SUPABASE_ANON_KEY;
  const LIST_ID = "shared";
  const SHOPPING_KEY = "food_home_shopping_list";

  let client = null;
  let currentUser = null;
  const userCallbacks = [];

  // Création du client (sans réseau : juste un objet). getSession lit le
  // localStorage, detectSessionInUrl parse le hash après retour OAuth.
  if (window.supabase && URL && ANON) {
    try {
      client = window.supabase.createClient(URL, ANON, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    } catch (e) {
      console.warn("⚠️ Supabase createClient KO :", e);
    }
  } else {
    console.warn("ℹ️ Supabase non configuré (mode local seul).");
  }

  function setUser(user) {
    currentUser = user || null;
    if (currentUser) {
      // Pont avec la session legacy (gate PIN existante).
      localStorage.setItem("food_home_logged_in", "true");
      localStorage.setItem("food_home_login_time", Date.now().toString());
    }
    userCallbacks.forEach((cb) => {
      try {
        cb(currentUser);
      } catch (_) {}
    });
  }

  // Résout avec l'utilisateur courant (ou null). À appeler au chargement.
  async function init() {
    if (!client) return null;
    try {
      const { data } = await client.auth.getSession();
      setUser(data && data.session ? data.session.user : null);
      client.auth.onAuthStateChange((_event, session) => {
        setUser(session ? session.user : null);
      });
      return currentUser;
    } catch (e) {
      console.warn("⚠️ auth.getSession KO :", e);
      return null;
    }
  }

  function onUser(cb) {
    userCallbacks.push(cb);
    cb(currentUser);
  }

  function getUser() {
    return currentUser;
  }

  function isSignedIn() {
    return !!currentUser;
  }

  function isConfigured() {
    return !!client;
  }

  async function signInWithGoogle() {
    if (!client) {
      alert(
        "La connexion Google n'est pas disponible (configuration Supabase manquante)."
      );
      return;
    }
    try {
      await client.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin + "/" },
      });
    } catch (e) {
      console.warn("⚠️ signInWithOAuth KO :", e);
      alert("Connexion Google impossible pour le moment.");
    }
  }

  async function signOut() {
    try {
      if (client) await client.auth.signOut();
    } catch (_) {}
    // Couper aussi le pont avec la session legacy, sinon la gate PIN considère
    // l'utilisateur connecté 24 h après une déconnexion Google.
    localStorage.removeItem("food_home_logged_in");
    localStorage.removeItem("food_home_login_time");
    setUser(null);
  }

  // ---- Liste de courses partagée --------------------------------------

  // Retourne le tableau d'items du cloud, ou null si indisponible.
  async function pullList() {
    if (!client || !currentUser) return null;
    try {
      const { data, error } = await client
        .from("shopping_list")
        .select("items")
        .eq("id", LIST_ID)
        .maybeSingle();
      if (error) throw error;
      return data && Array.isArray(data.items) ? data.items : [];
    } catch (e) {
      console.warn("⚠️ pullList KO :", e);
      return null;
    }
  }

  // Pousse le tableau d'items vers le cloud. Ne bloque jamais l'app.
  async function pushList(items) {
    if (!client || !currentUser) return false;
    try {
      const { error } = await client.from("shopping_list").upsert({
        id: LIST_ID,
        items: items,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      return true;
    } catch (e) {
      console.warn("⚠️ pushList KO :", e);
      return false;
    }
  }

  // Ajoute des items en FUSIONNANT avec l'état cloud (union) : ne perd jamais
  // les ajouts faits depuis un autre appareil (contrairement à un push brut qui
  // écraserait toute la liste). Met aussi à jour le localStorage local.
  async function addItemsMerged(localItems) {
    if (!client || !currentUser) return localItems;
    try {
      const cloud = await pullList();
      const set = new Set(localItems || []);
      (cloud || []).forEach((i) => set.add(i));
      const merged = [...set];
      await pushList(merged);
      localStorage.setItem(SHOPPING_KEY, JSON.stringify(merged));
      return merged;
    } catch (e) {
      console.warn("⚠️ addItemsMerged KO :", e);
      return localItems;
    }
  }

  window.FoodHomeCloud = {
    init,
    onUser,
    getUser,
    isSignedIn,
    isConfigured,
    signInWithGoogle,
    signOut,
    pullList,
    pushList,
    addItemsMerged,
    SHOPPING_KEY,
  };
})();
