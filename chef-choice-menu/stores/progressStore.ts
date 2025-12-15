import { create } from 'zustand';

interface ProgressStore {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

export const useProgressStore = create<ProgressStore>((set) => ({
    isLoading: false,
    startLoading: () => set({ isLoading: true }),
    stopLoading: () => set({ isLoading: false }),
}));
