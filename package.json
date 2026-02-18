const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();
const db = getFirestore();

// Helper: get all FCM tokens
async function getAllTokens() {
  const snap = await db.collection("fcmTokens").get();
  return snap.docs.map(d => d.data().token).filter(Boolean);
}

// Helper: send to all tokens, clean up invalid ones
async function sendToAll(title, body, data = {}) {
  const tokens = await getAllTokens();
  if (tokens.length === 0) return;

  const message = {
    notification: { title, body },
    data: { ...data, url: "/" },
    webpush: {
      notification: {
        icon: "/favicon.png",
        badge: "/favicon.png",
        tag: "bline-" + (data.type || "general"),
        renotify: true,
      },
    },
  };

  // Send individually so we can clean up bad tokens
  const results = await Promise.allSettled(
    tokens.map(token =>
      getMessaging().send({ ...message, token })
        .catch(async (err) => {
          // Remove invalid tokens
          if (err.code === "messaging/invalid-registration-token" ||
              err.code === "messaging/registration-token-not-registered") {
            await db.collection("fcmTokens").doc(token).delete();
          }
          throw err;
        })
    )
  );

  const sent = results.filter(r => r.status === "fulfilled").length;
  console.log(`Sent ${sent}/${tokens.length} notifications`);
}

// ✅ NOTIFY: New well wish posted
exports.onNewMessage = onDocumentCreated("messages/{messageId}", async (event) => {
  const data = event.data.data();
  const author = data.author || "Someone";
  await sendToAll(
    `💛 ${author} sent a well wish`,
    data.text ? data.text.substring(0, 100) : "New message of support!",
    { type: "wish" }
  );
});

// ✅ NOTIFY: Admin update posted
exports.onNewUpdate = onDocumentCreated("updates/{updateId}", async (event) => {
  const data = event.data.data();
  const author = data.author || "Someone";
  const isPrivate = data.isPrivate || false;
  await sendToAll(
    `📌 ${author} posted an update${isPrivate ? " (Inner Circle)" : ""}`,
    data.text ? data.text.substring(0, 100) : "New update from the village!",
    { type: "update" }
  );
});

// ❌ NO notifications for: shows, music, books, advice
// (intentionally not creating triggers for those collections)
