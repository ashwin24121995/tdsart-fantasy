import { drizzle } from "drizzle-orm/mysql2";
import { sports, players, contests, achievements } from "../drizzle/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const db = drizzle(process.env.DATABASE_URL);

async function seedData() {
  console.log("🌱 Seeding cricket data...");

  try {
    // Create Cricket sport
    console.log("Creating Cricket sport...");
    const [sportResult] = await db.insert(sports).values({
      name: "Cricket",
      slug: "cricket",
      description: "The gentleman's game - create your fantasy cricket team and compete!",
      icon: "🏏",
      isActive: true,
    }).$returningId();

    const sportId = sportResult.id;
    console.log(`Cricket sport created with ID: ${sportId}`);

    // Create sample cricket players
    console.log("Creating cricket players...");
    const cricketPlayers = [
      // Batsmen
      { name: "Virat Kohli", position: "Batsman", team: "Royal Challengers Bangalore", points: 950 },
      { name: "Rohit Sharma", position: "Batsman", team: "Mumbai Indians", points: 920 },
      { name: "KL Rahul", position: "Batsman", team: "Lucknow Super Giants", points: 880 },
      { name: "Shubman Gill", position: "Batsman", team: "Gujarat Titans", points: 850 },
      { name: "David Warner", position: "Batsman", team: "Delhi Capitals", points: 840 },
      { name: "Jos Buttler", position: "Batsman", team: "Rajasthan Royals", points: 830 },
      { name: "Suryakumar Yadav", position: "Batsman", team: "Mumbai Indians", points: 820 },
      { name: "Shreyas Iyer", position: "Batsman", team: "Kolkata Knight Riders", points: 800 },
      
      // All-rounders
      { name: "Hardik Pandya", position: "All-rounder", team: "Mumbai Indians", points: 910 },
      { name: "Ravindra Jadeja", position: "All-rounder", team: "Chennai Super Kings", points: 890 },
      { name: "Andre Russell", position: "All-rounder", team: "Kolkata Knight Riders", points: 870 },
      { name: "Glenn Maxwell", position: "All-rounder", team: "Royal Challengers Bangalore", points: 860 },
      { name: "Axar Patel", position: "All-rounder", team: "Delhi Capitals", points: 810 },
      { name: "Ravichandran Ashwin", position: "All-rounder", team: "Rajasthan Royals", points: 790 },
      
      // Bowlers
      { name: "Jasprit Bumrah", position: "Bowler", team: "Mumbai Indians", points: 940 },
      { name: "Rashid Khan", position: "Bowler", team: "Gujarat Titans", points: 900 },
      { name: "Yuzvendra Chahal", position: "Bowler", team: "Rajasthan Royals", points: 870 },
      { name: "Mohammed Shami", position: "Bowler", team: "Gujarat Titans", points: 850 },
      { name: "Kagiso Rabada", position: "Bowler", team: "Punjab Kings", points: 840 },
      { name: "Trent Boult", position: "Bowler", team: "Rajasthan Royals", points: 830 },
      { name: "Bhuvneshwar Kumar", position: "Bowler", team: "Sunrisers Hyderabad", points: 810 },
      
      // Wicket-keepers
      { name: "MS Dhoni", position: "Wicket-keeper", team: "Chennai Super Kings", points: 930 },
      { name: "Rishabh Pant", position: "Wicket-keeper", team: "Delhi Capitals", points: 900 },
      { name: "Quinton de Kock", position: "Wicket-keeper", team: "Lucknow Super Giants", points: 860 },
      { name: "Sanju Samson", position: "Wicket-keeper", team: "Rajasthan Royals", points: 840 },
    ];

    for (const player of cricketPlayers) {
      await db.insert(players).values({
        sportId,
        name: player.name,
        position: player.position,
        team: player.team,
        points: player.points,
        stats: JSON.stringify({
          matches: Math.floor(Math.random() * 50) + 20,
          runs: Math.floor(Math.random() * 2000) + 500,
          wickets: player.position.includes("Bowler") ? Math.floor(Math.random() * 50) + 10 : 0,
          average: (Math.random() * 30 + 20).toFixed(2),
        }),
        isActive: true,
      });
    }
    console.log(`Created ${cricketPlayers.length} cricket players`);

    // Create sample contests
    console.log("Creating contests...");
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const sampleContests = [
      {
        sportId,
        name: "IPL 2024 - Opening Match Contest",
        description: "Join the excitement of IPL 2024 opening match! Create your best team and compete.",
        startTime: tomorrow,
        endTime: new Date(tomorrow.getTime() + 4 * 60 * 60 * 1000),
        maxParticipants: 10000,
        currentParticipants: 0,
        status: "upcoming" as const,
        rules: JSON.stringify({
          minPlayers: 11,
          maxPlayers: 11,
          captainPoints: "2x",
          viceCaptainPoints: "1.5x",
        }),
        prizes: JSON.stringify({
          first: "Champion Badge + 1000 Points",
          top10: "Elite Badge + 500 Points",
          top100: "Participant Badge + 100 Points",
        }),
      },
      {
        sportId,
        name: "Weekend Cricket Showdown",
        description: "Weekend special contest with exciting rewards!",
        startTime: nextWeek,
        endTime: new Date(nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000),
        maxParticipants: 5000,
        currentParticipants: 0,
        status: "upcoming" as const,
        rules: JSON.stringify({
          minPlayers: 11,
          maxPlayers: 11,
          captainPoints: "2x",
          viceCaptainPoints: "1.5x",
        }),
        prizes: JSON.stringify({
          first: "Weekend Warrior Badge + 800 Points",
          top50: "Competitor Badge + 300 Points",
        }),
      },
    ];

    for (const contest of sampleContests) {
      await db.insert(contests).values(contest);
    }
    console.log(`Created ${sampleContests.length} contests`);

    // Create achievements
    console.log("Creating achievements...");
    const sampleAchievements = [
      {
        name: "First Team",
        description: "Create your first fantasy cricket team",
        icon: "🎯",
        category: "team",
        requirement: JSON.stringify({ action: "create_team", count: 1 }),
        points: 50,
      },
      {
        name: "Contest Rookie",
        description: "Join your first contest",
        icon: "🏆",
        category: "contest",
        requirement: JSON.stringify({ action: "join_contest", count: 1 }),
        points: 100,
      },
      {
        name: "Team Builder",
        description: "Create 5 fantasy teams",
        icon: "⚡",
        category: "team",
        requirement: JSON.stringify({ action: "create_team", count: 5 }),
        points: 200,
      },
      {
        name: "Contest Veteran",
        description: "Join 10 contests",
        icon: "🌟",
        category: "contest",
        requirement: JSON.stringify({ action: "join_contest", count: 10 }),
        points: 300,
      },
      {
        name: "Top 100",
        description: "Finish in top 100 of any contest",
        icon: "🥉",
        category: "contest",
        requirement: JSON.stringify({ action: "contest_rank", rank: 100 }),
        points: 500,
      },
      {
        name: "Top 10",
        description: "Finish in top 10 of any contest",
        icon: "🥈",
        category: "contest",
        requirement: JSON.stringify({ action: "contest_rank", rank: 10 }),
        points: 1000,
      },
      {
        name: "Champion",
        description: "Win a contest",
        icon: "🥇",
        category: "contest",
        requirement: JSON.stringify({ action: "contest_rank", rank: 1 }),
        points: 2000,
      },
    ];

    for (const achievement of sampleAchievements) {
      await db.insert(achievements).values(achievement);
    }
    console.log(`Created ${sampleAchievements.length} achievements`);

    console.log("✅ Cricket data seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    throw error;
  }
}

seedData().catch(console.error).finally(() => process.exit(0));
