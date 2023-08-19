import admin from "firebase-admin";

let serviceAccount = JSON.parse(process.env.FIREBASE_CONNECTION as any);

if (admin.apps.length == 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();

export { firestore };
