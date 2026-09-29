import "server-only";

import { prisma } from "@/server/db/prisma";

export async function getMatchById(matchId: string) {
  return prisma.match.findUnique({
    where: {
      id: matchId,
    },

    include: {
      league: {
        include: {
          sport: true,
        },
      },

      homeTeam: true,
      awayTeam: true,

      markets: {
        include: {
          selections: true,
        },
      },
    },
  });
}