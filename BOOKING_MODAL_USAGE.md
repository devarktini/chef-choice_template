# Global Booking Modal Usage Guide

## How It Works

The BookingFlowModal is now managed globally via a Zustand store (`useBookingModalStore`). This ensures the modal appears above all other elements including the header.

## Setup Complete ✅

- ✅ Modal store created: `stores/bookingModalStore.ts`
- ✅ Modal portal added to root layout: `app/layout.tsx`
- ✅ Hero component updated to use global store

## How to Use in Any Component

To open the booking modal from any component:

```tsx
"use client";

import { useBookingModalStore } from '@/stores/bookingModalStore';

export default function MyComponent() {
  const { openModal } = useBookingModalStore();

  return (
    <button onClick={() => openModal()}>
      Explore More Services
    </button>
  );
}
```

That's it! The modal will automatically appear above the header and all other content.

## Available Store Methods

```tsx
const { isOpen, openModal, closeModal } = useBookingModalStore();

// Open the modal
openModal();

// Close the modal
closeModal();

// Check if modal is open (for conditional rendering)
if (isOpen) {
  // ...
}
```

## Why This Works

1. **Modal Portal Pattern**: The `BookingFlowModalPortal` component is rendered at the root layout level
2. **Global State**: The Zustand store manages modal state globally across the entire app
3. **Z-Index**: Since the modal is at the root level, it naturally appears above the header and all other content
4. **No Props Drilling**: Components don't need to pass modal state through props
