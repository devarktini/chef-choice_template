// /src/useStore.js
import { create } from "zustand";

export const useStore = create((set) => ({
  userInputData: [],

  addUserInputData: (newData) =>
    set((state) => {
      const exists = state.userInputData.find((item) => item.id === newData.id);
      if (exists) {
        return {
          userInputData: state.userInputData.map((item) =>
            item.id === newData.id ? newData : item
          ),
        };
      } else {
        return {
          userInputData: [...state.userInputData, newData],
        };
      }
    }),

  clearUserInputData: () => set({ userInputData: [] }),
}));
