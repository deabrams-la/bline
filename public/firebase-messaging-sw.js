importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBEj2oJXTX-yZMwEeAcXVBgq9_Bk7YjkXs",
  authDomain: "the-b-line.firebaseapp.com",
  projectId: "the-b-line",
  storageBucket: "the-b-line.firebasestorage.app",
  messagingSenderId: "986242881238",
  appId: "1:986242881238:web:ecbd70f2d70f27fdab5b77",
});

const messaging = firebase.messaging();

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cl) => {
      if (cl.length > 0) return cl[0].focus();
      return clients.openWindow('/');
    })
  );
});
