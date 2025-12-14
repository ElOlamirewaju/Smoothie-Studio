export type IngredientCategory = "fruit" | "vegetable" | "protein" | "sweetener";

export type IngredientTag =
  | "vegan"
  | "high_fiber"
  | "low_sugar"
  | "high_protein"
  | "antioxidant"
  | "creamy"
  | "citrus"
  | "greens";

export interface NutritionFacts {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  origin: string;
  imageUrl: string;
  nutrition: NutritionFacts;
  tags: IngredientTag[];
}

export interface BuilderItem {
  ingredient: Ingredient;
  grams: number;
}

export interface SmoothieRecipe {
  id: string;
  title: string;
  reason: string;
  target: string;
  ingredients: { ingredient: Ingredient; grams: number }[];
}
