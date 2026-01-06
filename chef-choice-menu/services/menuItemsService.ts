import { BookingService } from './bookingService';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  isVeg: number;
  cuisine: string;
  category: string;
  mealTypes: string[];
  image: string;
  icon: string;
  isRecommended: boolean;
  price: null | number;
}

export interface MenuMap {
  id: number;
};

export interface MenuItemsData {
  version: string;
  lastUpdated: string;
  mealTypes: string[];
  data: {
    [vegCategory: string]: {
      [cuisine: string]: {
        [mealType: string]: MenuItem[];
      };
    };
  };
}

let cachedMenuData: MenuItemsData | null = null;

export class MenuItemsService {
  /**
   * Fetch menu items from API
   */
  static async getMenuItems(): Promise<MenuItemsData> {
    if (cachedMenuData) {
      return cachedMenuData;
    }

    try {
      const response = await BookingService.getMenuItems();
      cachedMenuData = response;
      return response;
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  }

  /**
   * Get all veg/non-veg categories available
   */
  static async getCategories(): Promise<string[]> {
    const data = await this.getMenuItems();
    return Object.keys(data.data);
  }

  /**
   * Get cuisines for a specific veg/non-veg category
   */
  static async getCuisinesByCategory(category: string): Promise<string[]> {
    const data = await this.getMenuItems();
    if (data.data[category]) {
      return Object.keys(data.data[category]);
    }
    return [];
  }

  /**
   * Get meal types available for a specific cuisine
   */
  static async getMealTypesByCuisine(
    category: string,
    cuisine: string
  ): Promise<string[]> {
    const data = await this.getMenuItems();
    if (data.data[category] && data.data[category][cuisine]) {
      return Object.keys(data.data[category][cuisine]);
    }
    return [];
  }

  /**
   * Get dishes for a specific category, cuisine, and meal type
   */
  static async getDishesByCuisineAndMealType(
    category: string,
    cuisine: string,
    mealType: string
  ): Promise<MenuItem[]> {
    const data = await this.getMenuItems();
    if (
      data.data[category] &&
      data.data[category][cuisine] &&
      data.data[category][cuisine][mealType]
    ) {
      return data.data[category][cuisine][mealType];
    }
    return [];
  }

  /**
   * Get all dishes for a specific category and cuisine across all meal types
   */
  static async getAllDishesByCuisine(
    category: string,
    cuisine: string
  ): Promise<MenuItem[]> {
    const data = await this.getMenuItems();
    const dishes: MenuItem[] = [];

    if (data.data[category] && data.data[category][cuisine]) {
      const cuisineData = data.data[category][cuisine];
      Object.values(cuisineData).forEach((mealTypeDishes: any) => {
        // Remove duplicates by ID
        mealTypeDishes.forEach((dish: MenuItem) => {
          if (!dishes.find((d) => d.id === dish.id)) {
            dishes.push(dish);
          }
        });
      });
    }

    return dishes;
  }

  /**
   * Get all meal types available
   */
  static async getAllMealTypes(): Promise<string[]> {
    const data = await this.getMenuItems();
    return data.mealTypes || ['breakfast', 'lunch', 'dinner'];
  }

  /**
   * Search dishes across all categories and cuisines
   */
  static async searchDishes(query: string): Promise<MenuItem[]> {
    const data = await this.getMenuItems();
    const results: MenuItem[] = [];
    const lowerQuery = query.toLowerCase();

    Object.values(data.data).forEach((categoryData) => {
      Object.values(categoryData).forEach((cuisineData: any) => {
        Object.values(cuisineData).forEach((mealTypeDishes: any) => {
          mealTypeDishes.forEach((dish: MenuItem) => {
            if (
              dish.name.toLowerCase().includes(lowerQuery) ||
              dish.description.toLowerCase().includes(lowerQuery)
            ) {
              if (!results.find((d) => d.id === dish.id)) {
                results.push(dish);
              }
            }
          });
        });
      });
    });

    return results;
  }

  /**
   * Get dish by ID
   */
  static async getDishById(dishId: number): Promise<MenuItem | null> {
    const data = await this.getMenuItems();

    let foundDish: MenuItem | null = null;

    Object.values(data.data).forEach((categoryData) => {
      Object.values(categoryData).forEach((cuisineData: any) => {
        Object.values(cuisineData).forEach((mealTypeDishes: any) => {
          const dish = mealTypeDishes.find((d: MenuItem) => d.id === dishId);
          if (dish && !foundDish) {
            foundDish = dish;
          }
        });
      });
    });

    return foundDish;
  }

  /**
   * Get veg dishes only
   */
  static async getVegDishes(): Promise<MenuItem[]> {
    const data = await this.getMenuItems();
    const vegDishes: MenuItem[] = [];

    Object.values(data.data).forEach((categoryData) => {
      Object.values(categoryData).forEach((cuisineData: any) => {
        Object.values(cuisineData).forEach((mealTypeDishes: any) => {
          mealTypeDishes.forEach((dish: MenuItem) => {
            if (dish.isVeg === 1 && !vegDishes.find((d) => d.id === dish.id)) {
              vegDishes.push(dish);
            }
          });
        });
      });
    });

    return vegDishes;
  }

  /**
   * Get non-veg dishes only
   */
  static async getNonVegDishes(): Promise<MenuItem[]> {
    const data = await this.getMenuItems();
    const nonVegDishes: MenuItem[] = [];

    Object.values(data.data).forEach((categoryData) => {
      Object.values(categoryData).forEach((cuisineData: any) => {
        Object.values(cuisineData).forEach((mealTypeDishes: any) => {
          mealTypeDishes.forEach((dish: MenuItem) => {
            if (
              dish.isVeg === 0 &&
              !nonVegDishes.find((d) => d.id === dish.id)
            ) {
              nonVegDishes.push(dish);
            }
          });
        });
      });
    });

    return nonVegDishes;
  }

  /**
   * Get dishes by multiple IDs
   */
  static async getDishesByIds(dishIds: number[]): Promise<MenuItem[]> {
    const dishes: MenuItem[] = [];

    for (const id of dishIds) {
      const dish = await this.getDishById(id);
      if (dish) {
        dishes.push(dish);
      }
    }

    return dishes;
  }

  /**
   * Clear cached menu data
   */
  static clearCache(): void {
    cachedMenuData = null;
  }
}
