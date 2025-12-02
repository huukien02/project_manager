import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

export async function getAllProjects() {
  const projectsCol = collection(db, "projects");
  const snapshot = await getDocs(projectsCol);

  const projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return projects;
}
