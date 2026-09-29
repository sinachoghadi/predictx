import { create } from "zustand";

export type PredictionSlipItem = {
  selectionId: string;
  marketId: string;
  matchId: string;
  selectionName: string;
  marketName: string;
  odds: number;
};

type PredictionSlipState = {
  items: PredictionSlipItem[];

  toggleItem: (item: PredictionSlipItem) => void;
  removeItem: (selectionId: string) => void;
  clear: () => void;
};

export const usePredictionSlipStore = create<PredictionSlipState>((set) => ({
  items: [],

  toggleItem: (item) =>
    set((state) => {
      const isAlreadySelected = state.items.some(
        (existingItem) =>
          existingItem.selectionId === item.selectionId,
      );

      // کلیک مجدد روی Selection فعلی → حذف
      if (isAlreadySelected) {
        return {
          items: state.items.filter(
            (existingItem) =>
              existingItem.selectionId !== item.selectionId,
          ),
        };
      }

      // Selection دیگری از همین Market → جایگزین
      const itemsWithoutSameMarket = state.items.filter(
        (existingItem) =>
          existingItem.marketId !== item.marketId,
      );

      return {
        items: [...itemsWithoutSameMarket, item],
      };
    }),
    
  removeItem: (selectionId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.selectionId !== selectionId,
      ),
    })),

  clear: () => set({ items: [] }),
}));