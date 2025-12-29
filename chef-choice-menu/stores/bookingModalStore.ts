import { create } from 'zustand';

interface BookingModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useBookingModalStore = create<BookingModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
