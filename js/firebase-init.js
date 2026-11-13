// تهيئة Firebase لمنصة أثمر (خطوة 1: التهيئة فقط، بدون تغيير الدخول)
// الإعدادات مأخوذة من firebase-config.js. هذا الملف classic script ليتوافق مع index.html.
(function () {
  var firebaseConfig = {
  apiKey: "AIzaSyAU1enH3pvu5rxWet0-0nD9gX9wJicrRbQ",
  authDomain: "t-ritaj-platform.firebaseapp.com",
  projectId: "t-ritaj-platform",
  storageBucket: "t-ritaj-platform.firebasestorage.app",
  messagingSenderId: "49004809799",
  appId: "1:49004809799:web:a20fe2c82febe4b9a72b62",
  measurementId: "G-303X58GLJ7"
};
  if (typeof firebase === "undefined") { console.warn("Firebase SDK غير محمّل"); return; }
  firebase.initializeApp(firebaseConfig);
  window.ATHMER_FB = { auth: firebase.auth(), db: firebase.firestore() };
})();
