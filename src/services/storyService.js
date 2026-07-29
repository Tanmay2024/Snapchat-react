import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase/config";
export async function uploadStory(uid, file, caption = "") { const path = `stories/${uid}/${Date.now()}-${file.name}`; await uploadBytes(ref(storage, path), file); return addDoc(collection(db, "stories"), { uid, mediaUrl: await getDownloadURL(ref(storage, path)), caption, createdAt: serverTimestamp(), expiresAt: Date.now() + 86400000 }); }
export function listenStories(callback) { return onSnapshot(query(collection(db, "stories"), where("expiresAt", ">", Date.now())), (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))); }
export async function deleteStory(id) { await deleteDoc(doc(db, "stories", id)); }
