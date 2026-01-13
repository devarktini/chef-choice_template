# Quick Reference - Menu API Integration

## What Was Done

The BookingFlowModal booking flow now integrates with the `getMenuItems()` API to display dynamic menu data instead of static hardcoded values.

## 3-Step Flow

### **Step 2: Menu Type & Cuisine Selection**
```
User selects: Veg / Non-Veg / Both
     ↓
Cuisines load dynamically from API
     ↓
User clicks to select cuisines
```

**Code Location:** Lines ~1715-1778 in BookingFlowModal.tsx

**Example:**
- Select "Veg" → Shows: North Indian, South Indian, etc. (veg cuisines only)
- Select "Non-Veg" → Shows: North Indian, South Indian, etc. (non-veg variants)

### **Step 3: Meal Planning**
```
Meal types load based on selected cuisines
     ↓
User selects: Breakfast / Lunch / Dinner
     ↓
Selections stored for filtering in Step 4
```

**Code Location:** Lines ~1878-1949 in BookingFlowModal.tsx

**Note:** Meal types now come from API (no more fixed "Evening Snacks")

### **Step 4: Dish Selection**
```
Dishes load for selected cuisines + meal types
     ↓
Display as beautiful cards with images
     ↓
User searches and filters dishes
     ↓
Selects dishes to finalize menu
```

**Code Location:** Lines ~1951-2280 in BookingFlowModal.tsx

**Features:**
- Search by dish name or description
- Filter by meal type
- See veg/non-veg badges
- View "Recommended" dishes
- Click to select/deselect

## State Management

### New Data Fields
```typescript
interface BookingData {
  selectedMealTypes: string[];  // ["Breakfast", "Lunch"]
  selectedDishIds: number[];    // [101, 205, 310]
  // ... other existing fields
}
```

### Data Flow
1. **menuType** changes → Load cuisines
2. **cuisines** changes → Load meal types
3. **selectedMealTypes** changes → Load dishes
4. **selectedDishIds** updated → Store selection

## API Methods Used

```typescript
// Get cuisines for a category
MenuItemsService.getCuisinesByCategory("Veg")
// → ["North Indian", "South Indian", "Chinese", ...]

// Get meal types for a cuisine
MenuItemsService.getMealTypesByCuisine("Veg", "North Indian")
// → ["Breakfast", "Lunch", "Dinner"]

// Get dishes for cuisine + meal type
MenuItemsService.getDishesByCuisineAndMealType("Veg", "North Indian", "breakfast")
// → [{id: 1, name: "Aloo Paratha", image: "...", ...}, ...]

// Get all dishes for a cuisine (all meal types)
MenuItemsService.getAllDishesByCuisine("Veg", "North Indian")
// → [all dishes from all meal types]
```

## Visual Changes

### Step 2
**Before:** MultiSelect dropdown with static 12 cuisines
**After:** Grid of dynamic cuisine buttons that appear/change based on veg/non-veg selection

### Step 3
**Before:** Fixed 4 meal types: Breakfast, Lunch, Evening Snacks, Dinner
**After:** Dynamic meal types from API for selected cuisines (usually 3: Breakfast, Lunch, Dinner)

### Step 4
**Before:** Fake dish list with placeholder names like "North Indian Dish 1"
**After:** Real dishes with:
- Actual images from API
- Real descriptions
- Veg/Non-Veg badges
- Cuisine tags
- Meal type indicators
- "Recommended" badges
- Search and filter

## Files Modified

1. **components/booking/BookingFlowModal.tsx**
   - Added menu API state variables (line ~849)
   - Added 3 new useEffect hooks for loading cuisines/meals/dishes (lines ~874-1014)
   - Updated Step 2 cuisine selection (lines ~1715-1778)
   - Updated Step 3 meal planning (lines ~1878-1949)
   - Updated Step 4 dish selection (lines ~1951-2280)
   - Added Leaf and Flame icons to imports

2. **services/menuItemsService.ts** (already created)
   - No changes needed, fully functional

## Removed Code
- Static `CUISINES` constant (~12 items)
- Static `MEAL_TYPES` constant (~4 items)
- Dummy dish generation: `Array.from({ length: 8 }, ...)` loop

## Testing Checklist

- [ ] Select Veg → cuisines load
- [ ] Select Non-Veg → different cuisines load  
- [ ] Select cuisines → meal types load
- [ ] Select meals → dishes appear
- [ ] Search dishes → results filter
- [ ] Filter by meal → only that meal's dishes show
- [ ] Click dish → selection toggle works
- [ ] Images load → no broken images
- [ ] Go back to Step 2 → data persists
- [ ] Submit booking → selectedDishIds sent to backend

## Common Issues

**Cuisines not loading?**
- Check menuType is selected
- Check MenuItemsService can reach API
- Look at browser console for errors

**Meal types not loading?**
- Check cuisines are selected
- Try different cuisine combinations

**Dishes not showing?**
- Check meal types are selected
- Check selected cuisines have dishes in API
- Try searching instead of filtering

**Images not loading?**
- Check image URLs in API response
- Browser might be blocking images
- Fallback emoji (🍽️) shows if no image

## Next Steps for Backend

When submitting booking, `selectedDishIds` will contain numeric IDs like: `[101, 205, 310]`

Backend should:
1. Look up full dish details using these IDs
2. Store dish information with booking
3. Use for meal preparation and billing

Example payload:
```json
{
  "event_type": "marriage",
  "food_cuisines_preferences": {
    "type": "veg",
    "cuisines": ["North Indian", "South Indian"]
  },
  "selected_meal_types": ["Breakfast", "Lunch"],
  "selected_dish_ids": [101, 205, 310]
}
```
