// QuickStay Service Worker
const CACHE_NAME = 'quickstay-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/booking.html',
  '/availability.html',
  '/assets/style.css',
  '/assets/script.js',
  '/assets/booking.js',
  '/assets/availability.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline bookings
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline bookings when connection is restored
  console.log('Background sync triggered');
  // This would typically sync offline data with the server
}

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New booking update from QuickStay!',
    icon: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=192&h=192&fit=crop',
    badge: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=96&h=96&fit=crop',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Booking',
        icon: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=64&h=64&fit=crop'
      },
      {
        action: 'close',
        title: 'Close',
        icon: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=64&h=64&fit=crop'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('QuickStay', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/booking.html')
    );
  }
}); 