import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceAccount from "../../comp-3018-module-4-assignment-firebase-adminsdk-fbsvc-a02a676d0b.json"; // new import

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const auth: Auth = getAuth();

const db: Firestore = getFirestore();

export { auth, db };