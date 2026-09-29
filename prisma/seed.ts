import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding PredictX...");

  // -------------------------
  // Sport
  // -------------------------

  const football = await prisma.sport.upsert({
    where: {
      slug: "football",
    },
    update: {},
    create: {
      name: "Football",
      slug: "football",
    },
  });

  // -------------------------
  // Leagues
  // -------------------------

  const premierLeague = await prisma.league.upsert({
    where: {
      sportId_slug: {
        sportId: football.id,
        slug: "premier-league",
      },
    },
    update: {},
    create: {
      name: "Premier League",
      slug: "premier-league",
      sportId: football.id,
    },
  });

  const laLiga = await prisma.league.upsert({
    where: {
      sportId_slug: {
        sportId: football.id,
        slug: "la-liga",
      },
    },
    update: {},
    create: {
      name: "La Liga",
      slug: "la-liga",
      sportId: football.id,
    },
  });

  // -------------------------
  // Teams
  // -------------------------

  const arsenal = await prisma.team.upsert({
    where: {
      slug: "arsenal",
    },
    update: {},
    create: {
      name: "Arsenal",
      slug: "arsenal",
    },
  });

  const liverpool = await prisma.team.upsert({
    where: {
      slug: "liverpool",
    },
    update: {},
    create: {
      name: "Liverpool",
      slug: "liverpool",
    },
  });

  const manchesterCity = await prisma.team.upsert({
    where: {
      slug: "manchester-city",
    },
    update: {},
    create: {
      name: "Manchester City",
      slug: "manchester-city",
    },
  });

  const chelsea = await prisma.team.upsert({
    where: {
      slug: "chelsea",
    },
    update: {},
    create: {
      name: "Chelsea",
      slug: "chelsea",
    },
  });

  const realMadrid = await prisma.team.upsert({
    where: {
      slug: "real-madrid",
    },
    update: {},
    create: {
      name: "Real Madrid",
      slug: "real-madrid",
    },
  });

  const barcelona = await prisma.team.upsert({
    where: {
      slug: "barcelona",
    },
    update: {},
    create: {
      name: "Barcelona",
      slug: "barcelona",
    },
  });

  // -------------------------
  // Matches
  // -------------------------

  const arsenalLiverpool = await prisma.match.upsert({
    where: {
      id: "seed-arsenal-liverpool",
    },
    update: {},
    create: {
      id: "seed-arsenal-liverpool",
      leagueId: premierLeague.id,
      homeTeamId: arsenal.id,
      awayTeamId: liverpool.id,
      startTime: new Date("2026-10-05T18:30:00.000Z"),
      status: "SCHEDULED",
    },
  });

  const cityChelsea = await prisma.match.upsert({
    where: {
      id: "seed-city-chelsea",
    },
    update: {},
    create: {
      id: "seed-city-chelsea",
      leagueId: premierLeague.id,
      homeTeamId: manchesterCity.id,
      awayTeamId: chelsea.id,
      startTime: new Date("2026-10-06T16:00:00.000Z"),
      status: "SCHEDULED",
    },
  });

  const realBarcelona = await prisma.match.upsert({
    where: {
      id: "seed-real-barcelona",
    },
    update: {},
    create: {
      id: "seed-real-barcelona",
      leagueId: laLiga.id,
      homeTeamId: realMadrid.id,
      awayTeamId: barcelona.id,
      startTime: new Date("2026-10-07T19:00:00.000Z"),
      status: "SCHEDULED",
    },
  });

  // -------------------------
  // Markets
  // -------------------------

  const arsenalLiverpoolWinner = await prisma.market.upsert({
    where: {
      matchId_key: {
        matchId: arsenalLiverpool.id,
        key: "match-winner",
      },
    },
    update: {},
    create: {
      matchId: arsenalLiverpool.id,
      name: "Match Winner",
      key: "match-winner",
    },
  });

  const cityChelseaWinner = await prisma.market.upsert({
    where: {
      matchId_key: {
        matchId: cityChelsea.id,
        key: "match-winner",
      },
    },
    update: {},
    create: {
      matchId: cityChelsea.id,
      name: "Match Winner",
      key: "match-winner",
    },
  });

  const realBarcelonaWinner = await prisma.market.upsert({
    where: {
      matchId_key: {
        matchId: realBarcelona.id,
        key: "match-winner",
      },
    },
    update: {},
    create: {
      matchId: realBarcelona.id,
      name: "Match Winner",
      key: "match-winner",
    },
  });

  // -------------------------
  // Selections
  // -------------------------

  const selections = [
    {
      marketId: arsenalLiverpoolWinner.id,
      name: "Arsenal",
      key: "home",
      odds: 2.1,
    },
    {
      marketId: arsenalLiverpoolWinner.id,
      name: "Draw",
      key: "draw",
      odds: 3.3,
    },
    {
      marketId: arsenalLiverpoolWinner.id,
      name: "Liverpool",
      key: "away",
      odds: 2.8,
    },

    {
      marketId: cityChelseaWinner.id,
      name: "Manchester City",
      key: "home",
      odds: 1.75,
    },
    {
      marketId: cityChelseaWinner.id,
      name: "Draw",
      key: "draw",
      odds: 3.6,
    },
    {
      marketId: cityChelseaWinner.id,
      name: "Chelsea",
      key: "away",
      odds: 4.2,
    },

    {
      marketId: realBarcelonaWinner.id,
      name: "Real Madrid",
      key: "home",
      odds: 2.0,
    },
    {
      marketId: realBarcelonaWinner.id,
      name: "Draw",
      key: "draw",
      odds: 3.4,
    },
    {
      marketId: realBarcelonaWinner.id,
      name: "Barcelona",
      key: "away",
      odds: 2.9,
    },
  ];

  for (const selection of selections) {
    await prisma.selection.upsert({
      where: {
        marketId_key: {
          marketId: selection.marketId,
          key: selection.key,
        },
      },
      update: {
        name: selection.name,
        odds: selection.odds,
      },
      create: selection,
    });
  }

  console.log("✅ PredictX seed completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error("❌ Seed failed");
    console.error(error);

    await prisma.$disconnect();
    await pool.end();

    process.exit(1);
  });