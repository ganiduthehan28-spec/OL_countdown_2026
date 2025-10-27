// public/sw.js

const CACHE_NAME = 'ol-countdown-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add other assets you want to cache for offline use
  // e.g., '/background.jpg', '/logo192.png', etc.
];

// Install event: caches static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: cleans up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: serves cached content first, then network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://ol-countdown-9a.netlify.app/')
  );
});

// Message from client to set/update reminder
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_REMINDER') {
    const reminderTime = event.data.time; // HH:MM format
    localStorage.setItem('reminderTime', reminderTime);
    console.log('Service Worker: Reminder time set to', reminderTime);
    scheduleDailyNotification();
  }
});

// Function to schedule daily notification
function scheduleDailyNotification() {
  // Clear any existing alarms to prevent duplicates
  // (This is a simplified approach; a more robust solution might use Alarm API or PeriodicSync)
  // For now, we rely on the client to send a message to re-schedule if needed.

  const reminderTime = localStorage.getItem('reminderTime');
  if (!reminderTime) {
    console.log('Service Worker: No reminder time set.');
    return;
  }

  const [hours, minutes] = reminderTime.split(':').map(Number);
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

  // If the target time for today has already passed, schedule for tomorrow
  if (targetDate.getTime() < now.getTime()) {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  const delay = targetDate.getTime() - now.getTime();

  console.log('Service Worker: Scheduling notification in', delay / 1000 / 60, 'minutes');

  setTimeout(() => {
    showReminderNotification();
    // Re-schedule for the next day
    scheduleDailyNotification();
  }, delay);
}

// Function to show the actual notification
async function showReminderNotification() {
  const examDate = new Date('2026-02-17T00:00:00'); // Countdown target date
  const now = new Date();
  const diffDays = Math.ceil((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const title = "O/L Countdown 2026 🔔";
  const body = `${diffDays} Days Remaining! Tap to open the countdown.`;
  const icon = '/logo192.png'; // Assuming you have a logo192.png in public folder
  const badge = '/logo192.png'; // Assuming you have a logo192.png in public folder
  const sound = '/notification-sound.mp3'; // Placeholder for notification sound

  // Check if notification permission is granted
  if (Notification.permission === 'granted') {
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      badge: badge,
      vibrate: [200, 100, 200],
      data: {
        url: 'https://ol-countdown-9a.netlify.app/'
      },
      // sound: sound // Sound property is not widely supported in Notification API directly
      // For sound, you might need to play an Audio object in the service worker
    });

    // Play sound if supported (this is a workaround as 'sound' option is not standard)
    try {
      const audio = new Audio(sound);
      audio.play();
    } catch (e) {
      console.warn('Could not play notification sound:', e);
    }

  } else {
    console.warn('Notification permission not granted.');
  }
}

// Initial scheduling when service worker activates or is re-activated
self.addEventListener('activate', (event) => {
  event.waitUntil(scheduleDailyNotification());
});

// Handle push events (if using a push server, not directly from this setup)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received', event);
  // This part would be for actual push messages from a server,
  // not directly for the scheduled local notifications.
  // For local scheduling, the 'setTimeout' in scheduleDailyNotification is key.
});