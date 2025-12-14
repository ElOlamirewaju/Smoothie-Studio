"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BuilderItem, Ingredient, SmoothieRecipe } from "@/types";

type Toggles = {
  lessSweet: boolean;
  plantBased: boolean;
  moreFilling: boolean;
};

type SmoothieState = {
  builder: BuilderItem[];
  favorites: SmoothieRecipe[];
  todayLogs: SmoothieRecipe[];
  toggles: Toggles;
  agentProfile: string[];
  hydrated: boolean;
  addIngredient: (ingredient: Ingredient) => void;
  updateGrams: (id: string, grams: number) => void;
  removeIngredient: (id: string) => void;
  clearBuilder: () => void;
  saveFavorite: (title?: string) => void;
  logToday: (title?: string) => void;
  togglePreference: (key: keyof Toggles) => void;
  setAgentProfile: (chips: string[]) => void;
};

const storage: any =
  typeof window !== "undefined"
    ? createJSONStorage(() => localStorage)
    : undefined;

export const useSmoothieStore = create<SmoothieState>()(
  persist(
    (set, get) => ({
      builder: [],
      favorites: [],
      todayLogs: [],
      toggles: {
        lessSweet: false,
        plantBased: false,
        moreFilling: true,
      },
      agentProfile: [
        "High Protein",
        "Low Added Sugar",
        "Creamy",
        "Green Tolerance: Medium",
      ],
      hydrated: false,
      addIngredient: (ingredient) => {
        const exists = get().builder.find(
          (item) => item.ingredient.id === ingredient.id,
        );
        if (exists) {
          set({
            builder: get().builder.map((item) =>
              item.ingredient.id === ingredient.id
                ? { ...item, grams: Math.min(item.grams + 25, 500) }
                : item,
            ),
          });
          return;
        }
        set({ builder: [...get().builder, { ingredient, grams: 80 }] });
      },
      updateGrams: (id, grams) =>
        set({
          builder: get().builder.map((item) =>
            item.ingredient.id === id
              ? { ...item, grams: Math.max(grams, 0) }
              : item,
          ),
        }),
      removeIngredient: (id) =>
        set({ builder: get().builder.filter((item) => item.ingredient.id !== id) }),
      clearBuilder: () => set({ builder: [] }),
      saveFavorite: (title = "Custom Smoothie") => {
        const builder = get().builder;
        if (!builder.length) return;
        const recipe: SmoothieRecipe = {
          id: `fav-${Date.now()}`,
          title,
          reason: "Saved from your cup",
          target: "~" + Math.round(totalKcal(builder)) + " kcal",
          ingredients: builder.map((item) => ({
            ingredient: item.ingredient,
            grams: item.grams,
          })),
        };
        set({ favorites: [recipe, ...get().favorites] });
      },
      logToday: (title = "Logged Smoothie") => {
        const builder = get().builder;
        if (!builder.length) return;
        const recipe: SmoothieRecipe = {
          id: `log-${Date.now()}`,
          title,
          reason: "Added to today",
          target: "~" + Math.round(totalKcal(builder)) + " kcal",
          ingredients: builder.map((item) => ({
            ingredient: item.ingredient,
            grams: item.grams,
          })),
        };
        set({ todayLogs: [recipe, ...get().todayLogs] });
      },
      togglePreference: (key) =>
        set({ toggles: { ...get().toggles, [key]: !get().toggles[key] } }),
      setAgentProfile: (chips) => set({ agentProfile: chips }),
    }),
    {
      name: "smoothie-studio-state",
      storage,
      skipHydration: typeof window === "undefined",
      onRehydrateStorage: () => () => {
        // hydration handled by component logic; no-op here to satisfy types
      },
      partialize: (state) => ({
        builder: state.builder,
        favorites: state.favorites,
        todayLogs: state.todayLogs,
        toggles: state.toggles,
        agentProfile: state.agentProfile,
        hydrated: state.hydrated,
      }),
    },
  ),
);

const totalKcal = (items: BuilderItem[]) =>
  items.reduce(
    (sum, item) => sum + (item.ingredient.nutrition.kcal * item.grams) / 100,
    0,
  );
