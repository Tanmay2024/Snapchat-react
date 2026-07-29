import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

/**
 * friendService.js
 * All Firestore business logic for the friend system lives here.
 * Components should never talk to Firestore directly for friend data.
 */

// ---------- Users ----------

export async function getUserById(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Simple client-side search (Firestore has no native text search).
// Fine for small/medium user bases used by this project.
export async function searchUsers(searchTerm, excludeUid) {
  const snapshot = await getDocs(collection(db, "users"));

  const term = searchTerm.trim().toLowerCase();

  return snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((u) => u.id !== excludeUid)
    .filter((u) =>
      term ? (u.username || "").toLowerCase().includes(term) : true
    );
}

// ---------- Friend Requests ----------

export async function sendFriendRequest(senderId, receiverId) {
  if (senderId === receiverId) return { ok: false, reason: "self" };

  // Already sent (pending) by me?
  const existingQ = query(
    collection(db, "friendRequests"),
    where("senderId", "==", senderId),
    where("receiverId", "==", receiverId)
  );
  const existing = await getDocs(existingQ);
  const stillPending = existing.docs.find(
    (d) => d.data().status === "pending"
  );
  if (stillPending) return { ok: false, reason: "already-sent" };

  // Already friends?
  const alreadyFriends = await areFriends(senderId, receiverId);
  if (alreadyFriends) return { ok: false, reason: "already-friends" };

  // Reverse pending request exists? auto-accept instead of duplicating.
  const reverseQ = query(
    collection(db, "friendRequests"),
    where("senderId", "==", receiverId),
    where("receiverId", "==", senderId),
    where("status", "==", "pending")
  );
  const reverse = await getDocs(reverseQ);
  if (!reverse.empty) {
    const reverseDoc = reverse.docs[0];
    await acceptFriendRequest(reverseDoc.id, receiverId, senderId);
    return { ok: true, autoAccepted: true };
  }

  await addDoc(collection(db, "friendRequests"), {
    senderId,
    receiverId,
    status: "pending",
    createdAt: serverTimestamp(),
  });

  return { ok: true };
}

export async function acceptFriendRequest(requestId, senderId, receiverId) {
  await updateDoc(doc(db, "friendRequests", requestId), {
    status: "accepted",
  });

  await addDoc(collection(db, "friends"), {
    users: [senderId, receiverId],
    createdAt: serverTimestamp(),
  });
}

export async function rejectFriendRequest(requestId) {
  await updateDoc(doc(db, "friendRequests", requestId), {
    status: "rejected",
  });
}

export async function cancelFriendRequest(requestId) {
  await deleteDoc(doc(db, "friendRequests", requestId));
}

async function areFriends(uidA, uidB) {
  const q = query(
    collection(db, "friends"),
    where("users", "array-contains", uidA)
  );
  const snap = await getDocs(q);
  return snap.docs.some((d) => d.data().users.includes(uidB));
}

// ---------- Realtime listeners ----------

// Incoming pending requests for the current user, with sender profile attached.
export function listenIncomingRequests(uid, callback) {
  const q = query(
    collection(db, "friendRequests"),
    where("receiverId", "==", uid),
    where("status", "==", "pending")
  );

  return onSnapshot(q, async (snapshot) => {
    const results = await Promise.all(
      snapshot.docs.map(async (d) => {
        const data = d.data();
        const sender = await getUserById(data.senderId);
        return { id: d.id, ...data, sender };
      })
    );
    callback(results);
  });
}

// Requests I have sent that are still pending.
export function listenSentRequests(uid, callback) {
  const q = query(
    collection(db, "friendRequests"),
    where("senderId", "==", uid),
    where("status", "==", "pending")
  );

  return onSnapshot(q, async (snapshot) => {
    const results = await Promise.all(
      snapshot.docs.map(async (d) => {
        const data = d.data();
        const receiver = await getUserById(data.receiverId);
        return { id: d.id, ...data, receiver };
      })
    );
    callback(results);
  });
}

// Accepted friends of the current user, with the friend's profile attached.
export function listenFriends(uid, callback) {
  const q = query(
    collection(db, "friends"),
    where("users", "array-contains", uid)
  );

  return onSnapshot(q, async (snapshot) => {
    const results = await Promise.all(
      snapshot.docs.map(async (d) => {
        const data = d.data();
        const friendUid = data.users.find((u) => u !== uid);
        const profile = await getUserById(friendUid);
        return {
          friendshipId: d.id,
          uid: friendUid,
          ...profile,
        };
      })
    );
    callback(results.filter((r) => r.uid));
  });
}
