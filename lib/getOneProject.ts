import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export async function getOneProject(id: string) {
  const snap = await getDoc(doc(db, "projects", id));
  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() };
}
