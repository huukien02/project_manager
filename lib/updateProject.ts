import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase-config";

export async function updateProject(id: string, project: any) {
  return await updateDoc(doc(db, "projects", id), {
    ...project,
    updated_at: Timestamp.now(),
  });
}
