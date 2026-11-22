importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAMuBjjJ3JCVFC9XYbJWJKZ-mf6nI6I-Qc",
  authDomain: "dahab-tours.firebaseapp.com",
  projectId: "dahab-tours",
  storageBucket: "dahab-tours.firebasestorage.app",
  messagingSenderId: "732016068774",
  appId: "1:732016068774:web:33560cb9a6386074becc67"
});

const messaging = firebase.messaging();

// استقبال الإشعارات حتى عندما يكون المتصفح مغلقاً أو شاشة الهاتف مقفلة
messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || (payload.data && payload.data.title) || 'شركة دهب للسياحة';
  const body = (payload.notification && payload.notification.body) || (payload.data && payload.data.body) || 'لديك تعليمات جديدة من إدارة الحملة';

  self.registration.showNotification(title, {
    body: body,
    dir: 'rtl',
    lang: 'ar',
    vibrate: [250, 100, 250],
    requireInteraction: true,
    data: { url: './index.html' }
  });
});

// فتح التطبيق عند ضغط الحاج على الإشعار
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});