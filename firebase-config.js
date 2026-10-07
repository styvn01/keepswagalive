/* KeepSwagAlive Firebase configuration */
/* Firebase Web API keys are intended for client-side use. Protect your database with Firebase Security Rules. */
const KSA_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCaavYDHKcNao8LEaVNstPihTkCL27xyN8",
  authDomain: "keepswagalive.firebaseapp.com",
  projectId: "keepswagalive",
  storageBucket: "keepswagalive.firebasestorage.app",
  messagingSenderId: "325781307643",
  appId: "1:325781307643:web:8171745a8d86587a5df05e",
  measurementId: "G-H8S9RYS5M7"
};

firebase.initializeApp(KSA_FIREBASE_CONFIG);

window.KSA_FIREBASE = {
  app: firebase.app(),
  db: firebase.firestore(),
  storage: firebase.storage()
};
