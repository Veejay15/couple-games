// Couples Dare service worker: delivers the date-night reminder and opens the game when tapped.
const CACHE = "couples-dare-v1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

// Tapping the reminder focuses the game if it's open, otherwise opens it.
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of all) { if ("focus" in c) return c.focus(); }
    if (self.clients.openWindow) return self.clients.openWindow("./");
  })());
});

// The page asks the worker to (re)schedule reminders via Notification Triggers.
self.addEventListener("message", async e => {
  const msg = e.data || {};
  if (msg.type !== "schedule") return;
  const reg = self.registration;

  // Clear any reminders we scheduled before, then lay down the new ones.
  const existing = await reg.getNotifications({ includeTriggered: true, tag: "date-night" });
  existing.forEach(n => n.close());

  if (!msg.times || !("showTrigger" in Notification.prototype)) return;
  for (const t of msg.times) {
    try {
      await reg.showNotification(msg.title || "Couples Dare 💞", {
        body: msg.body || "Spice up your night — tap to play.",
        tag: "date-night-" + t,
        renotify: true,
        requireInteraction: true,
        showTrigger: new TimestampTrigger(t),
        data: { url: "./" },
        icon: msg.icon,
        badge: msg.icon
      });
    } catch (err) { /* trigger unsupported or in the past — skip */ }
  }
});
