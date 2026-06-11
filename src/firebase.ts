/// <reference types="vite/client" />

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD2kg2e2AVUIdpSRnOuc3-ocPh_Q9jKB3g",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "swiftserve-rider.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "swiftserve-rider",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "swiftserve-rider.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "983726897569",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:983726897569:web:5ecab770ff6c8aff4873e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
