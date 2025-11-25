export interface MacroNutrient {
  name: string;
  value: number;
  unit: string;
  color: string;
}

export interface NutritionData {
  foodName: string;
  servingSize: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  micros: {
    vitamins: string[];
    minerals: string[];
  };
  healthRating: number; // 1-10
  healthRatingReason: string;
  summary: string;
}

export interface ApiError {
  message: string;
}
