import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, updateDoc, doc, where } from "firebase/firestore";
import { db } from "../firebase/config";
export async function createNotification(userId, type, text, data = {}) { return addDoc(collection(db, "notifications"), { userId, type, text, data, read: false, createdAt: serverTimestamp() }); }
export function listenNotifications(uid, callback) { return onSnapshot(query(collection(db, "notifications"), where("userId", "==", uid), orderBy("createdAt", "desc")), (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))); }
export const markNotificationRead = (id) => updateDoc(doc(db, "notifications", id), { read: true });
