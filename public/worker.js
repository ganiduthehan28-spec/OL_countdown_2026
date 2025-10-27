importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object. See https://firebase.google.com/docs/web/setup#config-object
// for more details.
const firebaseConfig = {
    apiKey: "<%= NEXT_PUBLIC_FIREBASE_API_KEY %>",
    authDomain: "<%= NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN %>",
    projectId: "<%= NEXT_PUBLIC_FIREBASE_PROJECT_ID %>",
    storageBucket: "<%= NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET %>",
    messagingSenderId: "<%= NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID %>",
    appId: "<%= NEXT_PUBLIC_FIREBASE_APP_ID %>",
    measurementId: "<%= NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID %>"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});