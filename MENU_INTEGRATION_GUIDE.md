# MenuItemsService Integration Guide

## Overview
This guide explains how to integrate the new `MenuItemsService` and the two new UI components (`CuisineAndMealSelector` and `MenuSelection`) into your BookingFlowModal.

## Components Created

### 1. **MenuItemsService** (`services/menuItemsService.ts`)
Central service for querying the API menu data with hierarchical filtering.

**Key Methods:**
- `getMenuItems()` - Fetch and cache all menu data
- `getCategories()` - Get ["Veg", "Non-Veg"]
- `getCuisinesByCategory(category)` - Get cuisines for Veg/Non-Veg
- `getMealTypesByCuisine(category, cuisine)` - Get meal types (breakfast, lunch, dinner)
- `getDishesByCuisineAndMealType(category, cuisine, mealType)` - Get actual dishes
- `getAllDishesByCuisine(category, cuisine)` - Get all dishes for a cuisine (deduped)

### 2. **CuisineAndMealSelector** (`components/booking/CuisineAndMealSelector.tsx`)
UI for selecting cuisines and meal types dynamically from the API.

**Features:**
- Dynamically loads cuisines based on selected Veg/Non-Veg category
- Shows available meal types across selected cuisines
- Beautiful grid UI with selection checkmarks
- Loading and error states
- Integration tips

**Props:**
```typescript
{
  selectedCategory: string;      // "Veg" or "Non-Veg"
  selectedCuisines: string[];    // Selected cuisine names
  selectedMealTypes: string[];   // Selected meal types
  onCuisinesChange: (cuisines) => void;
  onMealTypesChange: (mealTypes) => void;
  mealConfig: Record<string, { meals: string[]; time: string }>;
}
```

### 3. **MenuSelection** (`components/booking/MenuSelection.tsx`)
UI for selecting actual dishes from the filtered menu.

**Features:**
- Loads dishes based on selected cuisines and meal types
- Shows dish images, descriptions, veg/non-veg badges
- Searchable by name and description
- Filterable by meal type
- Beautiful card UI with animations
- Shows "Recommended" badges

**Props:**
```typescript
{
  selectedCategory: string;      // "Veg" or "Non-Veg"
  selectedCuisines: string[];    // Selected cuisine names
  selectedMealTypes: string[];   // Selected meal types
  selectedDishIds: number[];     // Selected dish IDs
  onSelectDishes: (dishIds) => void;
  mealConfig: Record<string, { meals: string[]; time: string }>;
}
```

## Integration Steps

### Step 1: Import the Service and Components in BookingFlowModal

```typescript
import { MenuItemsService } from '@/services/menuItemsService';
import { CuisineAndMealSelector } from './CuisineAndMealSelector';
import { MenuSelection } from './MenuSelection';
```

### Step 2: Update BookingData Interface

Update your booking data state to store selected dishes by ID:

```typescript
interface BookingData {
  // ... existing fields
  menuType: 'veg' | 'non_veg' | 'both';
  selectedCuisines: string[];      // NEW: Store cuisine names
  selectedMealTypes: string[];     // NEW: Store meal type names
  selectedDishIds: number[];       // NEW: Store dish IDs from API
  mealConfig: Record<string, {
    meals: string[];
    time: string;
  }>;
}
```

### Step 3: Replace Step 2 (Menu Type Selection)

**Current Code Location:** BookingFlowModal.tsx, Step 2 handler

**Current:**
```typescript
// Step 2: Menu Type
case 2:
  // Just sets menuType, doesn't load cuisines
  break;
```

**Replace With:**
```typescript
// Step 2: Menu Type Selection
case 2:
  // menuType is selected, cuisines will load dynamically in Step 3
  // The MenuItemsService will fetch cuisines in CuisineAndMealSelector
  break;
```

### Step 4: Replace Step 3 (Cuisine & Meal Selection)

**Current Code Location:** BookingFlowModal.tsx, Step 3 content

**Replace Static Code:**
```typescript
// OLD - Remove these static constants
const CUISINES = [
  { value: 'north_indian', label: 'North Indian' },
  { value: 'south_indian', label: 'South Indian' },
  // ... etc
];

const MEAL_TYPES = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  // ... etc
];
```

**With New Dynamic Component:**
```typescript
{step === 3 && (
  <CuisineAndMealSelector
    selectedCategory={data.menuType === 'veg' ? 'Veg' : data.menuType === 'non_veg' ? 'Non-Veg' : 'Veg'}
    selectedCuisines={data.selectedCuisines}
    selectedMealTypes={data.selectedMealTypes}
    onCuisinesChange={(cuisines) => 
      setData({ ...data, selectedCuisines: cuisines })
    }
    onMealTypesChange={(mealTypes) => 
      setData({ ...data, selectedMealTypes: mealTypes })
    }
    mealConfig={data.mealConfig}
  />
)}
```

### Step 5: Replace Step 4 (Menu Selection)

**Current Code Location:** BookingFlowModal.tsx, Step 4 dish selection

**Current:**
```typescript
// OLD - Dummy dish generation
const dishes = Array.from({ length: 8 }, (_, i) => ({
  key: `cuisine_dish_${i}`,
  name: `Dish ${i + 1}`,
  // ... fake data
}));
```

**Replace With New Component:**
```typescript
{step === 4 && (
  <MenuSelection
    selectedCategory={data.menuType === 'veg' ? 'Veg' : 'Non-Veg'}
    selectedCuisines={data.selectedCuisines}
    selectedMealTypes={data.selectedMealTypes}
    selectedDishIds={data.selectedDishIds}
    onSelectDishes={(dishIds) => 
      setData({ ...data, selectedDishIds: dishIds })
    }
    mealConfig={data.mealConfig}
  />
)}
```

### Step 6: Update Booking Submission

When submitting the booking, transform the selected dish IDs into full dish objects:

```typescript
const submitBooking = async () => {
  try {
    // Fetch full dish details for selected dish IDs
    const menuData = await MenuItemsService.getMenuItems();
    const selectedDishes = MenuItemsService.getDishesByIds(data.selectedDishIds);

    const bookingPayload = {
      ...data,
      dishes: selectedDishes,  // Full dish objects with all details
      // ... other fields
    };

    // Send to backend
    await BookingService.createBooking(bookingPayload);
  } catch (error) {
    console.error('Error submitting booking:', error);
  }
};
```

## Flow Diagram

```
Step 1: Service Selection
  ↓
Step 2: Menu Type Selection (Veg/Non-Veg/Both)
  ↓
Step 3: CuisineAndMealSelector
  - Loads cuisines dynamically based on Step 2 selection
  - User selects cuisines
  - Shows available meal types
  - User selects meal types (breakfast, lunch, dinner)
  ↓
Step 4: MenuSelection
  - Loads all dishes for selected cuisines & meal types
  - User can search and filter by meal type
  - User selects dishes (shown with real images & descriptions)
  ↓
Step 5-8: Proceed with payment, confirmation, etc.
```

## Data Flow Example

**Scenario: User selects Veg + North Indian Cuisine + Breakfast & Lunch**

1. Step 2: `menuType = "veg"`
2. Step 3 mounts CuisineAndMealSelector:
   - `MenuItemsService.getCuisinesByCategory("Veg")` → ["North Indian", "South Indian", ...]
   - User selects "North Indian" → `selectedCuisines = ["North Indian"]`
   - `MenuItemsService.getMealTypesByCuisine("Veg", "North Indian")` → ["Breakfast", "Lunch", "Dinner"]
   - User selects "Breakfast" and "Lunch" → `selectedMealTypes = ["Breakfast", "Lunch"]`
3. Step 4 mounts MenuSelection:
   - `MenuItemsService.getDishesByCuisineAndMealType("Veg", "North Indian", "Breakfast")` → [... breakfast dishes ...]
   - `MenuItemsService.getDishesByCuisineAndMealType("Veg", "North Indian", "Lunch")` → [... lunch dishes ...]
   - User selects 5 dishes → `selectedDishIds = [101, 205, 310, 415, 520]`
4. Submit:
   - `MenuItemsService.getDishesByIds([101, 205, 310, 415, 520])` → Full dish objects with images, descriptions, etc.

## API Data Structure

The `getMenuItems()` API returns:

```json
{
  "data": {
    "Veg": {
      "North Indian": {
        "Breakfast": [
          { id: 1, name: "Aloo Paratha", description: "...", image: "...", isVeg: 1, ... },
          ...
        ],
        "Lunch": [...],
        "Dinner": [...]
      },
      "South Indian": { ... },
      ...
    },
    "Non-Veg": { ... }
  }
}
```

## Key Points to Remember

1. **MenuItemsService** automatically caches the API response - only fetches once
2. **Meal Types from API** only include: Breakfast, Lunch, Dinner (not "Evening Snacks")
3. **Dish IDs are numeric** from the API, not string keys like "cuisine_dish_0"
4. **Categories** are always "Veg" and "Non-Veg" (capitalized)
5. **All dishes include** images, descriptions, isVeg flag, cuisine, mealTypes array, isRecommended flag
6. **Components handle loading and errors** internally - no need for separate error handling in BookingFlowModal
7. **Veg/Non-Veg Selection** in Step 2 should handle:
   - "veg" → Pass "Veg" to components
   - "non_veg" → Pass "Non-Veg" to components
   - "both" → Might need separate handling or show both categories

## Meal Type Mapping

API returns meal types with these exact values (handle case variations):
- `Breakfast`
- `Lunch`
- `Dinner`

The components handle the emoji mappings and formatting automatically.

## Next Steps

1. Remove the static CUISINES and MEAL_TYPES constants from BookingFlowModal
2. Remove the dummy dish generation code from Step 4
3. Import the new components and MenuItemsService
4. Replace Step 3 and Step 4 content as shown above
5. Update the BookingData interface as shown above
6. Test the flow by selecting different veg/non-veg and cuisines
7. Verify that dishes load correctly with images and descriptions
