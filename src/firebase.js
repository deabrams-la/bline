import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEj2oJXTX-yZMwEeAcXVBgq9_Bk7YjkXs",
  authDomain: "the-b-line.firebaseapp.com",
  projectId: "the-b-line",
  storageBucket: "the-b-line.firebasestorage.app",
  messagingSenderId: "986242881238",
  appId: "1:986242881238:web:ecbd70f2d70f27fdab5b77",
  measurementId: "G-7886DTSPE5"
};

const VAPID_KEY = "BIMwIFSTdlrDXNRsvwMZEaLa0YLi8i6V9DtlBAqlJwzjZc8oYf8sOzSx0EYJkZBFrfdxLFXu892cJOsiMh-_BUU";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

let messaging = null;
try {
  messaging = getMessaging(app);
} catch (e) {
  console.log("Messaging not supported in this browser");
}

// Auto sign-in anonymously
export function initAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      signInAnonymously(auth).catch(console.error);
    }
  });
}

// Request notification permission and save token to Firestore
export async function requestNotificationPermission(userName) {
  if (!messaging) {
    console.log("Messaging not supported");
    return null;
  }
  
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      // Save token to Firestore so Cloud Functions can send to it
      await setDoc(doc(db, "fcmTokens", token), {
        token,
        userName: userName || "Unknown",
        createdAt: new Date(),
        platform: navigator.userAgent.includes("iPhone") ? "ios" : 
                  navigator.userAgent.includes("Android") ? "android" : "web",
      });
      console.log("🔔 Notifications enabled!");
      return token;
    }
  } catch (err) {
    console.error("Error setting up notifications:", err);
  }
  return null;
}

// Listen for foreground messages
export function onForegroundMessage(callback) {
  if (!messaging) return () => {};
  return onMessage(messaging, (payload) => {
    callback(payload);
  });
}

// Photo upload
export const storage = getStorage(app);

export async function uploadPhoto(file) {
  const name = `updates/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, name);
  
  // Compress if needed - resize large images
  let uploadFile = file;
  if (file.size > 2 * 1024 * 1024) {
    // For large files, we'll still upload but could add compression later
    console.log("Large file, uploading as-is:", (file.size / 1024 / 1024).toFixed(1) + "MB");
  }
  
  const snapshot = await uploadBytes(storageRef, uploadFile);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}
