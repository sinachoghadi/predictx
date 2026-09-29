"use client";

import { usePredictionSlipStore } from "../store/prediction-slip.store";

export function PredictionSlip() {
  const items = usePredictionSlipStore((state) => state.items);
  const removeItem = usePredictionSlipStore((state) => state.removeItem);
  const clear = usePredictionSlipStore((state) => state.clear);

  if (items.length === 0) {
    return (
      <aside className="rounded-lg border p-4">
        <h2 className="font-semibold">Prediction Slip</h2>

        <p className="mt-2 text-sm text-gray-500">No selections yet.</p>
      </aside>
    );
  }

  return (
    <aside className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Prediction Slip ({items.length})</h2>

        <button type="button" onClick={clear} className="text-sm text-gray-500">
          Clear
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.selectionId} className="rounded-md border p-3">
            <div className="font-medium">{item.selectionName}</div>

            <div className="text-sm text-gray-500">{item.marketName}</div>

            <div className="mt-1 text-sm">Odds: {item.odds}</div>

            <button
              type="button"
              onClick={() => removeItem(item.selectionId)}
              className="mt-2 text-sm text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
