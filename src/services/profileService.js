import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { db, storage } from "../firebase/config";

// Default profile when a user signs up
export const defaultProfile = (user) => ({
  uid: user.uid,
  username:
    user.displayName ||
    user.email?.split("@")[0] ||
    "Snapchatter",
  email: user.email || "",
  profileImage: "",
  bio: "",
  status: "Available",
  online: true,
  lastSeen: serverTimestamp(),
});

// Create profile if it doesn't exist
export async function ensureProfile(user) {
  await setDoc(
    doc(db, "users", user.uid),
    defaultProfile(user),
    { merge: true }
  );
}

// Listen for real-time profile updates
export function listenProfile(uid, callback) {
  return onSnapshot(doc(db, "users", uid), (snap) => {
    if (snap.exists()) {
      callback({
        id: snap.id,
        ...snap.data(),
      });
    } else {
      callback(null);
    }
  });
}

// Update profile fields
export async function updateProfile(uid, data) {
  await updateDoc(doc(db, "users", uid), data);
}

// Update online/offline status
export async function setPresence(uid, online) {
  await setDoc(
    doc(db, "users", uid),
    {
      online,
      lastSeen: serverTimestamp(),
    },
    { merge: true }
  );
}

// Upload profile image to Firebase Storage
export async function uploadProfileImage(uid, file) {
  const storageRef = ref(
    storage,
    `profileImages/${uid}/${Date.now()}-${file.name}`
  );

  await uploadBytes(storageRef, file);

  const profileImage = await getDownloadURL(storageRef);

  await updateProfile(uid, {
    profileImage,
  });

  return profileImage;
}