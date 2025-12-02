import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export async function deleteProject(id: string) {
  await deleteDoc(doc(db, "projects", id));
}
