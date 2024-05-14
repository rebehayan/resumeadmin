import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

let userStore = (set) => ({
  userData: {},
  setUserData: async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    set({ userData: userDoc.data() });
  },
});

userStore = devtools(userStore);

export const useUserStore = create(userStore);
