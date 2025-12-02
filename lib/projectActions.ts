import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase-config";

export async function createProject(project: any) {
  return await addDoc(collection(db, "projects"), {
    ...project,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  });
}
