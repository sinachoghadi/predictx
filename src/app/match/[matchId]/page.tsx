import { notFound } from "next/navigation";

import { getMatchById } from "@/features/matches/queries/get-match-by-id";
import { PredictionSlip } from "@/features/predictions/components/prediction-slip";
import { SelectionButton } from "@/features/predictions/components/selection-button";

type MatchPageProps = {
  params: Promise<{
    matchId: string;
  }>;
};

export default async function MatchPage({ params }: MatchPageProps) {
  const { matchId } = await params;

  const match = await getMatchById(matchId);

  if (!match) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-6">
        <div className="text-sm text-gray-500">
          {match.league.sport.name} / {match.league.name}
        </div>

        <h1 className="mt-2 text-3xl font-bold">
          {match.homeTeam.name} vs {match.awayTeam.name}
        </h1>

        <div className="mt-3 text-sm text-gray-500">
          {match.startTime.toLocaleString()}
        </div>

        <div className="mt-2 text-sm">Status: {match.status}</div>
      </div>

      <section className="space-y-6">
        {match.markets.map((market) => (
          <div key={market.id} className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">{market.name}</h2>

            <div className="grid gap-3 sm:grid-cols-3">
              {market.selections.map((selection) => (
                <SelectionButton
                  key={selection.id}
                  selection={{
                    selectionId: selection.id,
                    marketId: market.id,
                    matchId: match.id,
                    selectionName: selection.name,
                    marketName: market.name,
                    odds: Number(selection.odds),
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      <PredictionSlip />
    </main>
  );
}
