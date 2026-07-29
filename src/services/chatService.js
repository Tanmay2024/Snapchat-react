import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
  getDocs,
  writeBatch,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

/**
 * chatService.js
 * All Firestore business logic for 1:1 messaging lives here.
 */

// Deterministic chat id for two users, independent of order.
export function getChatId(uidA, uidB) {
  return [uidA, uidB].sort().join("_");
}

export async function sendMessage(chatId, senderId, receiverId, text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  await addDoc(collection(db, "messages"), {
    chatId,
    senderId,
    receiverId,
    text: trimmed,
    createdAt: serverTimestamp(),
    clientCreatedAt: Date.now(),
    edited: false,
    deleted: false,
    seen: false,
  });
  await setDoc(doc(db, "conversations", chatId), {
    participants: [senderId, receiverId], lastMessage: trimmed, lastMessageAt: serverTimestamp(),
    [`unread.${receiverId}`]: 1, [`unread.${senderId}`]: 0,
  }, { merge: true });
}

// Realtime message history for a chat, oldest first.
export function listenMessages(chatId, callback) {
  // Keep this query index-free. Firestore can emit updates immediately without
  // requiring a composite index; chronological ordering happens below.
  const q = query(collection(db, "messages"), where("chatId", "==", chatId));

  return onSnapshot(q, (snapshot) => {
    const timeValue = (data) => data.createdAt?.toMillis?.() ?? data.clientCreatedAt ?? 0;
    const messages = snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => timeValue(a) - timeValue(b));
    callback(messages);
  });
}

export async function editMessage(messageId, newText) {
  const trimmed = newText.trim();
  if (!trimmed) return;

  await updateDoc(doc(db, "messages", messageId), {
    text: trimmed,
    edited: true,
  });
}

// Soft delete so the conversation history stays intact for the other user.
export async function deleteMessage(messageId) {
  await updateDoc(doc(db, "messages", messageId), {
    deleted: true,
    text: "",
  });
}

// Mark every message sent *to* me in this chat as seen.
export async function markMessagesSeen(chatId, myUid) {
  const q = query(
    collection(db, "messages"),
    where("chatId", "==", chatId),
    where("receiverId", "==", myUid),
    where("seen", "==", false)
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return;

  const batch = writeBatch(db);
  snapshot.docs.forEach((d) => batch.update(d.ref, { seen: true }));
  await batch.commit();
  await setDoc(doc(db, "conversations", chatId), { [`unread.${myUid}`]: 0 }, { merge: true });
}

export function listenConversations(uid, callback) {
  // As above, sort locally so an optional Firestore composite index never
  // prevents the Recent Chats panel from receiving a realtime update.
  const q = query(collection(db, "conversations"), where("participants", "array-contains", uid));
  return onSnapshot(q, (snapshot) => {
    const timeValue = (data) => data.lastMessageAt?.toMillis?.() ?? 0;
    callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })).sort((a, b) => timeValue(b) - timeValue(a)));
  });
}

// ---------- Typing indicator ----------
// Stored as one doc per (chatId, uid) in a lightweight "typingStatus" collection.

function typingDocId(chatId, uid) {
  return `${chatId}_${uid}`;
}

export async function setTypingStatus(chatId, uid, isTyping) {
  await setDoc(
    doc(db, "typingStatus", typingDocId(chatId, uid)),
    { chatId, uid, isTyping, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

// Listens to whether the OTHER user in the chat is currently typing.
export function listenTyping(chatId, otherUid, callback) {
  return onSnapshot(
    doc(db, "typingStatus", typingDocId(chatId, otherUid)),
    (snap) => {
      callback(snap.exists() ? !!snap.data().isTyping : false);
    }
  );
}
