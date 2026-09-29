import { getUpcomingMatches } from "@/features/matches/queries/get-upcoming-matches";
import Link from "next/link";

export default async function HomePage() {
  const matches = await getUpcomingMatches();

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">PredictX</h1>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Upcoming Matches</h2>

        <div className="space-y-4">
          {matches.map((match) => (
            <Link
              key={match.id}
              href={`/match/${match.id}`}
              className="block rounded-lg border p-4 transition hover:bg-gray-50"
            >
              <div className="mb-2 text-sm text-gray-500">
                {match.league.name}
              </div>

              <div className="flex items-center justify-between gap-2">
                <strong>{match.homeTeam.name}</strong>

                <span>vs</span>

                <strong>{match.awayTeam.name}</strong>
              </div>

              <div className="mt-3 text-sm text-gray-500">
                {match.startTime.toLocaleString()}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
