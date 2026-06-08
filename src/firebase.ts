/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2kg2e2AVUIdpSRnOuc3-ocPh_Q9jKB3g",
  authDomain: "swiftserve-rider.firebaseapp.com",
  projectId: "swiftserve-rider",
  storageBucket: "swiftserve-rider.firebasestorage.app",
  messagingSenderId: "983726897569",
  appId: "1:983726897569:web:5ecab770ff6c8aff4873e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
