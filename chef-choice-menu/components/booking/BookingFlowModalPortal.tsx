"use client";

import { useBookingModalStore } from "@/stores/bookingModalStore";
import BookingFlowModal from "./BookingFlowModal";

export default function BookingFlowModalPortal() {
  const { isOpen, closeModal } = useBookingModalStore();

  return <BookingFlowModal isOpen={isOpen} onClose={closeModal} />;
}
