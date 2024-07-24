import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

let projectIdStore = (set) => ({
  projectData: {},
  setProjectData: async (id) => {
    const projectRef = doc(db, "project", id);
    const projectDoc = await getDoc(projectRef);
    set({ projectData: projectDoc.data() });
  },
});

projectIdStore = devtools(projectIdStore);

export const useProjectIdStore = create(projectIdStore);
