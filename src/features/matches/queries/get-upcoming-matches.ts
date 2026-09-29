import "server-only";

import { prisma } from "@/server/db/prisma";

export async function getUpcomingMatches() {
  return prisma.match.findMany({
    where: {
      status: "SCHEDULED",
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

    orderBy: {
      startTime: "asc",
    },
  });
}