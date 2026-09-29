"use client";

import {
  usePredictionSlipStore,
  type PredictionSlipItem,
} from "../store/prediction-slip.store";

type SelectionButtonProps = {
  selection: PredictionSlipItem;
};

export function SelectionButton({ selection }: SelectionButtonProps) {
  const addItem = usePredictionSlipStore((state) => state.addItem);

  const isSelected = usePredictionSlipStore((state) =>
    state.items.some((item) => item.selectionId === selection.selectionId),
  );

  return (
    <button
      type="button"
      onClick={() => addItem(selection)}
      className={`rounded-md border px-4 py-3 text-left transition ${
        isSelected
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 hover:border-gray-400"
      }`}
    >
      <div className="font-medium">{selection.selectionName}</div>

      <div className="text-sm text-gray-500">Odds: {selection.odds}</div>
    </button>
  );
}
