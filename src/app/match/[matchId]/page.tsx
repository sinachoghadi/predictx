import { notFound } from "next/navigation";

import { getMatchById } from "@/features/matches/queries/get-match-by-id";

type MatchPageProps = {
  params: Promise<{
    matchId: string;
  }>;
};

export default async function MatchPage({
  params,
}: MatchPageProps) {
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

        <div className="mt-2 text-sm">
          Status: {match.status}
        </div>
      </div>

      <section className="space-y-6">
        {match.markets.map((market) => (
          <div
            key={market.id}
            className="rounded-lg border p-4"
          >
            <h2 className="mb-4 text-lg font-semibold">
              {market.name}
            </h2>

            <div className="grid gap-3 sm:grid-cols-3">
              {market.selections.map((selection) => (
                <div
                  key={selection.id}
                  className="rounded-md border p-3"
                >
                  <div className="font-medium">
                    {selection.name}
                  </div>

                  <div className="mt-1 text-sm text-gray-500">
                    Odds: {selection.odds.toString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}