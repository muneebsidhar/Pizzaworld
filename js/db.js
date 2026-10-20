/* ============================================================
   DB layer — Pizza World Phase 2 (Firebase Realtime Database)
   If Firebase is not configured yet, every function fails
   gracefully (returns null) so the site keeps working on
   WhatsApp-only mode.
   ============================================================ */
const DB = (() => {
  const VERSION = "2026-10-19e"; // bump when db.js changes — check via DB.version
  let db = null, ready = false;

  /* Accept BOTH variable names: the site's FIREBASE_CONFIG and the
     Firebase console's copy-paste name (firebaseConfig), so pasting the
     console code verbatim also works. */
  function CFG() {
    if (typeof FIREBASE_CONFIG !== "undefined" && FIREBASE_CONFIG &&
        FIREBASE_CONFIG.apiKey && !String(FIREBASE_CONFIG.apiKey).includes("PASTE_YOUR"))
      return FIREBASE_CONFIG;
    if (typeof firebaseConfig !== "undefined" && firebaseConfig &&
        firebaseConfig.apiKey && !String(firebaseConfig.apiKey).includes("PASTE_YOUR"))
      return firebaseConfig;
    return null;
  }

  const configured = () => !!CFG();

  function init() {
    if (ready) return true;
    const cfg = CFG();
    if (!cfg) { console.warn("[DB] Firebase not configured — running WhatsApp-only mode. Type DB.debug() in the console to see why."); return false; }
    try {
      if (!firebase.apps.length) firebase.initializeApp(cfg);
      db = firebase.database();
      ready = true;
      return true;
    } catch (e) { console.warn("[DB] init failed:", e.message); return false; }
  }

  const ORDERS = () => db.ref("pw/orders");
  const COUNTER = () => db.ref("pw/counter");

  /* Reserve the next order number atomically: PW-1001, PW-1002, ... */
  async function nextOrderNumber() {
    const snap = await COUNTER().transaction(c => (c || 1000) + 1);
    return "PW-" + snap.snapshot.val();
  }

  /* Save a new order. Returns the order id (e.g. "PW-1001") or null. */
  async function saveOrder(order) {
    if (!init()) return null;
    const id = await nextOrderNumber();
    const now = Date.now();
    await ORDERS().child(id).set({
      id, status: "new", createdAt: now,
      history: { "new": now },
      ...order
    });
    return id;
  }

  /* Live list of ALL orders (kitchen). Uses polling with once("value")
     instead of a persistent on("value") stream — one-off reads are far
     more reliable on flaky networks/proxies that break Firebase's
     long-lived WebSocket stream. Same callback API as before. */
  function listenOrders(cb, intervalMs = 4000) {
    if (!init()) return () => {};
    let stopped = false;
    const ref = ORDERS();
    async function poll() {
      if (stopped) return;
      try {
        const snap = await ref.once("value");
        const list = [];
        snap.forEach(c => list.push(c.val()));
        list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
        cb(list.reverse());
      } catch (e) { console.warn("[DB] order poll failed:", e.message); }
      if (!stopped) setTimeout(poll, intervalMs);
    }
    poll();
    return () => { stopped = true; };
  }

  /* Live single order (tracking page). Polling, same reason as above. */
  function listenOrder(id, cb, intervalMs = 4000) {
    if (!init()) return () => {};
    let stopped = false;
    const ref = ORDERS().child(id);
    async function poll() {
      if (stopped) return;
      try { cb((await ref.once("value")).val()); }
      catch (e) { console.warn("[DB] order poll failed:", e.message); }
      if (!stopped) setTimeout(poll, intervalMs);
    }
    poll();
    return () => { stopped = true; };
  }

  /* Kitchen changes status. Also stamps history. */
  async function setStatus(id, status) {
    if (!init()) return false;
    const now = Date.now();
    await ORDERS().child(id).update({
      status, ["history/" + status]: now
    });
    return true;
  }

  /* Type DB.debug() in the browser console — it prints exactly why the
     database is not connecting. Send the printed table to Musa. */
  function debug() {
    const c = CFG();
    const out = {
      dbJsLoaded: true,
      firebaseSdkLoaded: typeof firebase !== "undefined",
      FIREBASE_CONFIG: typeof FIREBASE_CONFIG !== "undefined" ? "defined" : "MISSING",
      firebaseConfig: typeof firebaseConfig !== "undefined" ? "defined" : "MISSING",
      configured: configured(),
      apiKeyStartsWith: c ? String(c.apiKey).slice(0, 8) + "..." : "(none)"
    };
    if (out.configured === false) {
      if (out.FIREBASE_CONFIG === "MISSING" && out.firebaseConfig === "MISSING")
        out.hint = "Config file is not the one being loaded: wrong folder, file not saved, or old file cached. Try Ctrl+F5.";
      else if (!c)
        out.hint = "Config found but apiKey is empty or still the PASTE_YOUR placeholder.";
      if (!out.firebaseSdkLoaded)
        out.hint = (out.hint ? out.hint + " " : "") + "Firebase SDK scripts did not load — check internet.";
    }
    console.table(out);
    return out;
  }

  return { VERSION, version: VERSION, init, configured, debug, saveOrder, listenOrders, listenOrder, setStatus };
})();

const ORDER_STATUSES = ["new", "accepted", "preparing", "ready", "dispatched", "delivered"];
const STATUS_LABEL = {
  new: "📥 New order", accepted: "✅ Accepted", preparing: "👨‍🍳 Preparing",
  ready: "📦 Ready", dispatched: "🛵 On the way", delivered: "🏠 Delivered",
  cancelled: "❌ Cancelled"
};
