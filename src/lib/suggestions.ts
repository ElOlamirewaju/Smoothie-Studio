import { ingredients } from "@/data/ingredients";
import { Ingredient, SmoothieRecipe } from "@/types";

const pick = (id: string) => ingredients.find((item) => item.id === id)!;

const fruit = ingredients.filter((item) => item.category === "fruit");
const greens = ingredients.filter(
  (item) => item.category === "vegetable" && item.tags.includes("greens"),
);
const proteins = ingredients.filter((item) => item.category === "protein");
const sweeteners = ingredients.filter(
  (item) => item.category === "sweetener",
);

type Toggles = {
  lessSweet: boolean;
  plantBased: boolean;
  moreFilling: boolean;
};

export function buildSuggestions(toggles: Toggles): SmoothieRecipe[] {
  const sweetChoice = toggles.lessSweet
    ? pick("stevia")
    : pick("manuka-honey");
  const creamyProtein = toggles.plantBased
    ? pick("silken-tofu")
    : pick("greek-yogurt");
  const baseGreens = greens[0];

  const recipes: SmoothieRecipe[] = [
    {
      id: "ai-green",
      title: "Green Reset",
      reason: toggles.lessSweet
        ? "Dialed down sweetness, boosted greens"
        : "Crisp greens with citrus lift",
      target: "~360 kcal | High Fiber",
      ingredients: [
        { ingredient: pick("green-apple"), grams: 110 },
        { ingredient: pick("spinach"), grams: 70 },
        { ingredient: pick("cucumber"), grams: 90 },
        { ingredient: creamyProtein, grams: toggles.plantBased ? 60 : 90 },
        { ingredient: sweetChoice, grams: toggles.lessSweet ? 2 : 12 },
      ],
    },
    {
      id: "ai-protein",
      title: "Creamy Strength",
      reason: toggles.plantBased
        ? "Plant protein with mellow sweetness"
        : "Greek yogurt creaminess with balanced carbs",
      target: "~420 kcal | High Protein",
      ingredients: [
        { ingredient: pick("banana"), grams: 95 },
        {
          ingredient: toggles.plantBased ? pick("almond-butter") : pick("cottage-cheese"),
          grams: toggles.moreFilling ? 70 : 50,
        },
        { ingredient: creamyProtein, grams: toggles.plantBased ? 70 : 60 },
        { ingredient: baseGreens, grams: 45 },
        { ingredient: sweetChoice, grams: toggles.lessSweet ? 3 : 10 },
      ],
    },
    {
      id: "ai-tropical",
      title: "Tropical Light",
      reason: toggles.moreFilling
        ? "Adds avocado for satiety"
        : "Bright fruit-forward refresh",
      target: "~390 kcal | Balanced",
      ingredients: [
        { ingredient: pick("pineapple"), grams: 110 },
        { ingredient: pick("mango"), grams: 110 },
        {
          ingredient: toggles.moreFilling ? pick("avocado") : pick("dragonfruit"),
          grams: toggles.moreFilling ? 60 : 80,
        },
        {
          ingredient: toggles.plantBased ? pick("oat-milk") : pick("kefir"),
          grams: 140,
        },
        {
          ingredient: sweetChoice,
          grams: toggles.lessSweet ? 2 : 12,
        },
      ],
    },
  ];

  return recipes;
}

export function randomFeaturedIngredient(): Ingredient {
  const ordered = [...fruit, ...proteins, ...greens, ...sweeteners];
  return ordered[Math.floor(ordered.length / 3)];
}
