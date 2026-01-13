# Chef Choice Menu - Booking Workflow Documentation

## Table of Contents
1. [Overview](#overview)
2. [Booking Workflow Steps](#booking-workflow-steps)
3. [API Endpoints](#api-endpoints)
4. [Request Payload Structure](#request-payload-structure)
5. [Complete Payload Example](#complete-payload-example)
6. [Attribute Descriptions](#attribute-descriptions)
7. [Response Structure](#response-structure)
8. [Error Handling](#error-handling)
9. [Integration Guide](#integration-guide)

---

## Overview

The Chef Choice Menu booking system allows clients to:
- Select event details (type, dates, location)
- Choose food preferences (type and cuisines)
- Plan meal timings for each event date
- Select specific dishes from the menu
- Specify guest count
- Choose service providers
- Define kitchen setup and materials
- Add special requirements

The booking process is a **multi-step workflow** with 8 steps that collect data progressively and validate at each stage before submission.

---

## Booking Workflow Steps

### Step 1: Event & Date Selection
- **Purpose**: Gather basic event information
- **Data Collected**:
  - Event Type (marriage, engagement, corporate, etc.)
  - Event Dates (can select multiple dates)
- **Validation**: Both event type and at least one date must be selected

### Step 2: Food Type & Cuisines
- **Purpose**: Set food preferences
- **Data Collected**:
  - Menu Type (veg, non_veg, or both)
  - Cuisines (multiple selections from available cuisines)
- **Validation**: Menu type must be selected, at least one cuisine must be chosen

### Step 3: Meal Planning
- **Purpose**: Define meal schedule for each event date
- **Data Collected**:
  - Meal timings per date (breakfast, lunch, dinner, evening_snacks)
  - Optional: Specific time for each meal
- **Validation**: Each selected date must have at least one meal configured (unless skipped)
- **Skip Option**: Can skip to discuss meals with chef later

### Step 4: Menu Selection
- **Purpose**: Choose specific dishes for each meal on each date
- **Data Collected**:
  - Dishes by date and meal type
  - System validates available dishes based on selected cuisines
- **Validation**: At least one dish must be selected across all dates

### Step 5: Guest Count
- **Purpose**: Specify number of guests
- **Data Collected**:
  - Adults count
  - Children count
  - Babies count
- **Validation**: At least one adult or child must be counted

### Step 6: Service Providers
- **Purpose**: Select chef/service provider
- **Data Collected**:
  - Provider IDs (can select multiple providers)
- **Validation**: At least one provider must be selected (unless skipped)
- **Skip Option**: Can skip to find providers later

### Step 7: Kitchen & Materials
- **Purpose**: Define kitchen setup and available materials
- **Data Collected**:
  - Kitchen Type (own_kitchen or provided_kitchen)
  - Kitchen Appliances (oven, refrigerator, microwave, etc.)
  - Utensils (cutlery, cookware, serving plates, etc.)
  - Provided Materials
- **Validation**: Kitchen type must be selected

### Step 8: Review & Event Address
- **Purpose**: Final review and address selection
- **Data Collected**:
  - Event Address ID
  - Display all collected information for confirmation
- **Validation**: Address must be selected
- **Action**: Submit or update the booking

---

## API Endpoints

### Create Booking Request
**Endpoint**: `POST /api/event-booking-requests/`

**Authentication**: Bearer Token (from AuthService)

**Headers**:
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer <access_token>
```

### Update Booking Request
**Endpoint**: `PATCH /api/event-booking-requests/{booking_id}/`

**Authentication**: Bearer Token

**Headers**: Same as Create

---

## Request Payload Structure

### Main Payload Object
```typescript
{
  event_type: string;
  event_address: string;                          // Address ID (UUID)
  dates: Record<string, string>;                  // Date mapping object
  food_cuisines_preferences: {
    type: string;                                 // "veg" | "non_veg" | "both"
    cuisines: string[];                          // Array of cuisine values
  };
  meal_timings: Record<string, {
    time: string;                                 // Optional: specific time
    meals: string[];                             // Array of meal types
  }>;
  menu_items_details: {
    items: Array<{
      date: string;                              // YYYY-MM-DD format
      mealType: string;                          // breakfast, lunch, dinner, evening_snacks
      dishId: number;                            // ID of the dish
      name: string;                              // Dish name
      cuisine: string;                           // Cuisine type
      category: string;                          // Food category
    }>;
  };
  booking_teams: any;                            // Currently empty object
  guests: {
    adults: number;
    children: number;
    babies: number;
  };
  client_materials: {
    provided_materials: string[];
    kitchen_type: string;                        // "own_kitchen" | "provided_kitchen"
    kitchen_appliances: string[];                // Array of appliance values
    utensils: string[];                          // Array of utensil values
  };
  services_selections: {
    providers: string[];                         // Array of provider UUIDs
  };
  other_requirements: {
    additional_services: string[];               // Array of service values
    ambience: string[];                          // Array of ambience preferences
    transportation: string[];                    // Array of transportation options
    special_requests: string;                    // Free text special requests
    dietary_restrictions: string[];              // Array of restrictions
    entertainment: string[];                     // Array of entertainment options
  };
}
```

---

## Complete Payload Example

```json
{
  "event_type": "marriage",
  "event_address": "f0463639-8583-4d0c-9ad0-c9a43e9c62ca",
  "dates": {
    "2026-01-22": "2026-01-22",
    "2026-01-23": "2026-01-23"
  },
  "food_cuisines_preferences": {
    "type": "veg",
    "cuisines": ["north_indian", "south_indian"]
  },
  "meal_timings": {
    "2026-01-22": {
      "time": "08:00 AM",
      "meals": ["breakfast", "lunch"]
    },
    "2026-01-23": {
      "time": "07:00 PM",
      "meals": ["dinner"]
    }
  },
  "menu_items_details": {
    "items": [
      {
        "date": "2026-01-22",
        "mealType": "breakfast",
        "dishId": 5,
        "name": "Puri Bhaji",
        "cuisine": "north_indian",
        "category": "Indian"
      },
      {
        "date": "2026-01-22",
        "mealType": "lunch",
        "dishId": 12,
        "name": "Biryani",
        "cuisine": "north_indian",
        "category": "Indian"
      },
      {
        "date": "2026-01-23",
        "mealType": "dinner",
        "dishId": 36,
        "name": "Plain Dosa",
        "cuisine": "south_indian",
        "category": "Indian"
      }
    ]
  },
  "booking_teams": {},
  "guests": {
    "adults": 50,
    "children": 20,
    "babies": 2
  },
  "client_materials": {
    "provided_materials": [],
    "kitchen_type": "own_kitchen",
    "kitchen_appliances": ["oven", "refrigerator", "gas_stove"],
    "utensils": ["cutlery", "serving_plates", "glassware"]
  },
  "services_selections": {
    "providers": [
      "637d66d7-47a0-4d1a-b332-140b3c48423d",
      "12345678-1234-1234-1234-123456789abc"
    ]
  },
  "other_requirements": {
    "additional_services": ["bartender", "waiters", "photography"],
    "ambience": ["lights", "decorations"],
    "transportation": ["valet_parking"],
    "special_requests": "Please ensure all vegetarian options. No onion or garlic.",
    "dietary_restrictions": ["vegan", "gluten_free"],
    "entertainment": ["music", "dj"]
  }
}
```

---

## Attribute Descriptions

### Event Type
- **Field**: `event_type`
- **Type**: String
- **Values**: marriage, engagement, corporate, birthday, anniversary, etc.
- **Description**: The type of event being planned
- **Required**: Yes
- **Example**: `"marriage"`

### Event Address
- **Field**: `event_address`
- **Type**: String (UUID)
- **Description**: UUID of the selected event address from user's saved addresses
- **Required**: Yes
- **Example**: `"f0463639-8583-4d0c-9ad0-c9a43e9c62ca"`

### Dates
- **Field**: `dates`
- **Type**: Object (Record<string, string>)
- **Format**: Keys and values are YYYY-MM-DD format
- **Description**: Event dates selected by the user
- **Required**: Yes (at least one date)
- **Example**:
  ```json
  {
    "2026-01-22": "2026-01-22",
    "2026-01-23": "2026-01-23"
  }
  ```

### Food Type
- **Field**: `food_cuisines_preferences.type`
- **Type**: String
- **Values**: "veg", "non_veg", "both"
- **Description**: Food category preference
- **Required**: Yes

### Cuisines
- **Field**: `food_cuisines_preferences.cuisines`
- **Type**: Array of Strings
- **Values**: north_indian, south_indian, chinese, italian, mexican, thai, continental, mediterranean, japanese, lebanese, american, french
- **Description**: Selected cuisine types
- **Required**: Yes (at least one)
- **Example**: `["north_indian", "south_indian"]`

### Meal Timings
- **Field**: `meal_timings`
- **Type**: Object (Record<string, { time: string; meals: string[] }>)
- **Structure**:
  - **Date Key**: YYYY-MM-DD format
  - **time**: Optional, specific time preference (e.g., "08:00 AM")
  - **meals**: Array of meal types (breakfast, lunch, dinner, evening_snacks)
- **Required**: Yes (unless skipped in Step 3)
- **Example**:
  ```json
  {
    "2026-01-22": {
      "time": "08:00 AM",
      "meals": ["breakfast", "lunch"]
    }
  }
  ```

### Menu Items Details
- **Field**: `menu_items_details.items`
- **Type**: Array of Menu Item Objects
- **Structure for each item**:
  - **date**: YYYY-MM-DD format
  - **mealType**: breakfast, lunch, dinner, evening_snacks
  - **dishId**: Numeric ID of the dish
  - **name**: Name of the dish (string)
  - **cuisine**: Cuisine type (string)
  - **category**: Food category (string)
- **Required**: Yes (at least one dish)

### Guests
- **Field**: `guests`
- **Type**: Object { adults: number, children: number, babies: number }
- **Description**: Guest count breakdown
- **Required**: Yes (at least one person)
- **Example**:
  ```json
  {
    "adults": 50,
    "children": 20,
    "babies": 2
  }
  ```

### Kitchen Type
- **Field**: `client_materials.kitchen_type`
- **Type**: String
- **Values**: "own_kitchen", "provided_kitchen"
- **Description**: Whether the chef brings their own kitchen or uses the client's
- **Required**: Yes

### Kitchen Appliances
- **Field**: `client_materials.kitchen_appliances`
- **Type**: Array of Strings
- **Values**: oven, refrigerator, microwave, gas_stove, induction_cooktop, dishwasher, chimney, mixer_grinder
- **Description**: Available kitchen appliances at the venue
- **Required**: No (depends on kitchen_type)
- **Example**: `["oven", "refrigerator", "gas_stove"]`

### Utensils
- **Field**: `client_materials.utensils`
- **Type**: Array of Strings
- **Values**: cutlery, cookware, serving_plates, glassware, cleaning_supplies
- **Description**: Available utensils at the venue
- **Required**: No
- **Example**: `["cutlery", "serving_plates", "glassware"]`

### Service Providers
- **Field**: `services_selections.providers`
- **Type**: Array of Strings (UUIDs)
- **Description**: Selected chef/service provider IDs
- **Required**: Yes (unless skipped in Step 6)
- **Example**: `["637d66d7-47a0-4d1a-b332-140b3c48423d"]`

### Additional Services
- **Field**: `other_requirements.additional_services`
- **Type**: Array of Strings
- **Values**: bartender, waiters, cleaners, decorations, photography, entertainment, valet_parking, security
- **Description**: Extra services to be provided
- **Required**: No
- **Example**: `["bartender", "waiters", "photography"]`

### Ambience
- **Field**: `other_requirements.ambience`
- **Type**: Array of Strings
- **Description**: Ambience preferences for the event
- **Required**: No
- **Example**: `["lights", "decorations"]`

### Transportation
- **Field**: `other_requirements.transportation`
- **Type**: Array of Strings
- **Description**: Transportation requirements
- **Required**: No
- **Example**: `["valet_parking"]`

### Dietary Restrictions
- **Field**: `other_requirements.dietary_restrictions`
- **Type**: Array of Strings
- **Description**: Dietary restrictions to consider
- **Required**: No
- **Example**: `["vegan", "gluten_free"]`

### Special Requests
- **Field**: `other_requirements.special_requests`
- **Type**: String (free text)
- **Description**: Additional special requirements or notes
- **Required**: No
- **Example**: `"Please ensure all vegetarian options. No onion or garlic."`

### Entertainment
- **Field**: `other_requirements.entertainment`
- **Type**: Array of Strings
- **Description**: Entertainment preferences
- **Required**: No
- **Example**: `["music", "dj"]`

---

## Response Structure

### Successful Booking Creation (201 Created)

```json
{
  "id": "de4b9ab7-c94d-46e2-8769-9ac9170db764",
  "client": {
    "id": "91e76add-9101-4378-8861-185a06df0803",
    "email": "user@gmail.com",
    "first_name": "John",
    "last_name": "Doe",
    "profile_picture": "https://api.chefchoicemenu.com/media/profile_pictures/..."
  },
  "service_provider": null,
  "event_address": {
    "id": "f0463639-8583-4d0c-9ad0-c9a43e9c62ca",
    "address_line1": "123 Main Street",
    "address_line2": "Apartment 4B",
    "city": "New York",
    "state": "New York",
    "zip_code": "10001"
  },
  "conversation": {
    "id": "2572f10a-33c3-48b2-94da-f2f7c8959ef0",
    "created_date": "2026-01-04T03:14:30.535590"
  },
  "unread_message_count": 0,
  "review": null,
  "created_date": "2026-01-04T03:14:30.527755",
  "updated_date": "2026-01-04T03:14:30.527888",
  "meta_info": {},
  "event_type": "marriage",
  "dates": {
    "2026-01-22": "2026-01-22",
    "2026-01-23": "2026-01-23"
  },
  "food_cuisines_preferences": {
    "type": "veg",
    "cuisines": ["south_indian"]
  },
  "meal_timings": {
    "2026-01-22": {
      "time": "",
      "meals": ["breakfast"]
    },
    "2026-01-23": {
      "time": "",
      "meals": ["dinner"]
    }
  },
  "menu_items_details": {
    "items": [
      {
        "date": "2026-01-22",
        "name": "Plain Dosa",
        "dishId": 36,
        "cuisine": "south_indian",
        "category": "Indian",
        "mealType": "breakfast"
      }
    ]
  },
  "booking_teams": {},
  "guests": {
    "adults": 50,
    "children": 10,
    "babies": 0
  },
  "services_selections": {
    "providers": ["637d66d7-47a0-4d1a-b332-140b3c48423d"]
  },
  "client_materials": {
    "utensils": [],
    "kitchen_type": "own_kitchen",
    "kitchen_appliances": [],
    "provided_materials": []
  },
  "service_materials": {},
  "estimated_cost": null,
  "token_amount_required": null,
  "request_status": "pending",
  "payment_details": [],
  "other_requirements": {
    "ambience": [],
    "entertainment": [],
    "transportation": [],
    "special_requests": "",
    "additional_services": [],
    "dietary_restrictions": []
  }
}
```

### Response Fields Explanation

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique booking identifier |
| client | Object | Client information (auto-populated) |
| event_address | Object | Selected event address details |
| conversation | Object | Conversation thread for this booking |
| unread_message_count | Number | Count of unread messages |
| created_date | ISO String | Booking creation timestamp |
| updated_date | ISO String | Last update timestamp |
| request_status | String | pending, approved, confirmed, rejected |
| estimated_cost | Number or null | Estimated cost (calculated by backend) |
| token_amount_required | Number or null | Token/advance amount needed |
| payment_details | Array | Payment history |
| review | Object or null | Review after completion |

---

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "event_type": ["This field may not be blank."],
  "event_address": ["Invalid UUID format."],
  "dates": ["At least one date is required."]
}
```

#### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

#### 404 Not Found
```json
{
  "detail": "Not found."
}
```

#### 500 Internal Server Error
```json
{
  "detail": "Internal server error. Please try again later."
}
```

### Error Handling Best Practices

1. **Validate on Frontend**: Use the `canProceed()` function to validate at each step
2. **Clear Error Messages**: Display specific field errors to users
3. **Retry Logic**: Implement exponential backoff for failed requests
4. **User Feedback**: Use toast notifications for success/error messages

---

## Integration Guide

### Step 1: Import Required Services and Types

```typescript
import { BookingService, Booking } from '@/services/bookingService';
import { toast } from 'react-hot-toast';
```

### Step 2: Initialize Booking Data Structure

```typescript
interface BookingData {
  eventType: string;
  dates: Date[];
  menuType: "veg" | "non_veg" | "both" | "";
  cuisines: string[];
  mealConfig: Record<string, { meals: string[]; time: string }>;
  isMealConfigSkipped: boolean;
  isServiceProviderSkipped: boolean;
  selectedMenu: string[];
  selectedMealTypes: string[];
  selectedDishIds: Record<string, Record<string, number[]>>;
  guests: { adults: number; children: number; babies: number };
  serviceProviders: string[];
  eventAddressId?: string;
  clientMaterials: {
    providedMaterials: string[];
    kitchenType: "own_kitchen" | "provided_kitchen" | "";
    kitchenAppliances: string[];
    utensils: string[];
  };
  otherRequirements: {
    additionalServices: string[];
    ambience: string[];
    transportation: string[];
    specialRequests: string;
    dietaryRestrictions: string[];
    entertainment: string[];
  };
}
```

### Step 3: Build the Payload

```typescript
const buildBookingPayload = (data: BookingData): any => {
  return {
    event_type: data.eventType,
    event_address: data.eventAddressId,
    dates: data.dates.reduce((acc, date) => {
      const dateStr = getLocalDateKey(date); // YYYY-MM-DD format
      return { ...acc, [dateStr]: dateStr };
    }, {}),
    food_cuisines_preferences: {
      type: data.menuType,
      cuisines: data.cuisines,
    },
    meal_timings: data.mealConfig,
    menu_items_details: {
      items: Object.entries(data.selectedDishIds).flatMap(([date, meals]) =>
        Object.entries(meals).flatMap(([mealType, dishIds]) =>
          dishIds.map((dishId) => {
            const dish = availableDishes.find((d) => d.id === dishId);
            return {
              date,
              mealType,
              dishId,
              name: dish?.name || "",
              cuisine: dish?.cuisine || "",
              category: dish?.category || "",
            };
          })
        )
      ),
    },
    booking_teams: {},
    guests: data.guests,
    client_materials: {
      provided_materials: data.clientMaterials.providedMaterials,
      kitchen_type: data.clientMaterials.kitchenType,
      kitchen_appliances: data.clientMaterials.kitchenAppliances,
      utensils: data.clientMaterials.utensils,
    },
    services_selections: {
      providers: data.serviceProviders,
    },
    other_requirements: {
      additional_services: data.otherRequirements.additionalServices,
      ambience: data.otherRequirements.ambience,
      transportation: data.otherRequirements.transportation,
      special_requests: data.otherRequirements.specialRequests,
      dietary_restrictions: data.otherRequirements.dietaryRestrictions,
      entertainment: data.otherRequirements.entertainment,
    },
  };
};
```

### Step 4: Create Booking

```typescript
const handleCreateBooking = async (data: BookingData) => {
  try {
    const payload = buildBookingPayload(data);
    const response = await BookingService.createBooking(payload);
    
    toast.success("Booking request submitted successfully!");
    
    // Reset form or navigate
    setData(INITIAL_DATA);
    router.push('/bookings');
    
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create booking';
    toast.error(errorMessage);
    console.error('Booking creation error:', error);
  }
};
```

### Step 5: Update Booking

```typescript
const handleUpdateBooking = async (bookingId: string, data: BookingData) => {
  try {
    const payload = buildBookingPayload(data);
    const response = await BookingService.updateBooking(bookingId, payload);
    
    toast.success("Booking updated successfully!");
    
    // Refresh booking data or navigate
    router.push(`/bookings/${bookingId}`);
    
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update booking';
    toast.error(errorMessage);
    console.error('Booking update error:', error);
  }
};
```

### Step 6: Fetch Bookings

```typescript
const fetchUserBookings = async () => {
  try {
    const response = await BookingService.getBookings();
    // response.results contains array of Booking objects
    // response.count contains total count
    // response.next, response.previous for pagination
    return response;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    toast.error('Failed to load bookings');
  }
};
```

### Helper Function: Get Local Date Key

```typescript
const getLocalDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
```

---

## Key Points to Remember

1. **Date Handling**: Always use `YYYY-MM-DD` format for dates in API calls
2. **UUID Format**: Event address ID must be a valid UUID
3. **At Least One**: Each required section needs at least one selection
4. **Optional Fields**: meal_timings and special_requests can be empty strings
5. **Arrays**: Cuisines, service providers, and menu items must be arrays
6. **Validation**: Validate on both frontend and backend
7. **Async Operations**: All API calls are async and should be awaited
8. **Error Messages**: Provide clear feedback to users on validation failures

---

## Example Workflow Implementation

```typescript
// Complete booking flow
const completeBookingFlow = async () => {
  // Step 1: Validate all data
  if (!isAllDataValid(bookingData)) {
    toast.error("Please complete all required steps");
    return;
  }

  // Step 2: Build payload
  const payload = buildBookingPayload(bookingData);

  // Step 3: Log payload (for debugging)
  console.log("Booking payload:", JSON.stringify(payload, null, 2));

  // Step 4: Make API call
  try {
    setIsSubmitting(true);
    
    if (existingBookingId) {
      await BookingService.updateBooking(existingBookingId, payload);
      toast.success("Booking updated successfully!");
    } else {
      await BookingService.createBooking(payload);
      toast.success("Booking created successfully!");
    }

    // Step 5: Navigate or reset
    router.push('/bookings');
  } catch (error) {
    handleBookingError(error);
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Testing the API

### Using cURL for Create Booking

```bash
curl -X POST http://127.0.0.1:8000/api/event-booking-requests/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_access_token>" \
  -d @booking_payload.json
```

### Using cURL for Update Booking

```bash
curl -X PATCH http://127.0.0.1:8000/api/event-booking-requests/<booking_id>/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_access_token>" \
  -d @booking_payload.json
```

---

## Support & Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check if token is valid and not expired
2. **400 Bad Request**: Validate payload structure matches expected format
3. **404 Not Found**: Verify booking ID exists
4. **Empty Dates Object**: Ensure at least one date is selected
5. **Null Address ID**: User must select an address before submission

### Debug Tips

1. Console log the payload before sending
2. Check network tab in browser DevTools
3. Verify all required fields are present
4. Ensure date format is YYYY-MM-DD
5. Check that UUIDs are valid format

---

**Document Version**: 1.0  
**Last Updated**: January 4, 2026  
**API Base URL**: Configured via `NEXT_PUBLIC_API_BASE_URL`
