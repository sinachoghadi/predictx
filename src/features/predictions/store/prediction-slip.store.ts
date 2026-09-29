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

  addItem: (item: PredictionSlipItem) => void;
  removeItem: (selectionId: string) => void;
  clear: () => void;
};

export const usePredictionSlipStore = create<PredictionSlipState>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const itemsWithoutSameMarket = state.items.filter(
        (existingItem) => existingItem.marketId !== item.marketId,
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