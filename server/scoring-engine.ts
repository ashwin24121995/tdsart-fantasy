import { getDb } from "./db";
import { eq } from "drizzle-orm";
import { players, fantasyTeams, teamPlayers, contestEntries, users, userAchievements, achievements } from "../drizzle/schema";

/**
 * Cricket Fantasy Points Scoring Rules
 */
export const SCORING_RULES = {
  batting: {
    run: 1,
    boundary: 1, // 4 runs
    six: 2,
    fiftyBonus: 8,
    centuryBonus: 16,
    duck: -2, // Out for 0
  },
  bowling: {
    wicket: 25,
    maidenOver: 8,
    threeWicketBonus: 4,
    fourWicketBonus: 8,
    fiveWicketBonus: 16,
  },
  fielding: {
    catch: 8,
    stumping: 12,
    runOut: 6,
  },
  captainMultiplier: 2,
  viceCaptainMultiplier: 1.5,
};

/**
 * Calculate points for a player based on their performance
 */
export function calculatePlayerPoints(performance: {
  runs?: number;
  ballsFaced?: number;
  fours?: number;
  sixes?: number;
  wickets?: number;
  maidenOvers?: number;
  catches?: number;
  stumpings?: number;
  runOuts?: number;
}): number {
  let points = 0;

  // Batting points
  if (performance.runs !== undefined) {
    points += performance.runs * SCORING_RULES.batting.run;
    
    if (performance.runs === 0 && performance.ballsFaced && performance.ballsFaced > 0) {
      points += SCORING_RULES.batting.duck; // Duck penalty
    }
    
    if (performance.runs >= 50 && performance.runs < 100) {
      points += SCORING_RULES.batting.fiftyBonus;
    }
    
    if (performance.runs >= 100) {
      points += SCORING_RULES.batting.centuryBonus;
    }
  }

  if (performance.fours) {
    points += performance.fours * SCORING_RULES.batting.boundary;
  }

  if (performance.sixes) {
    points += performance.sixes * SCORING_RULES.batting.six;
  }

  // Bowling points
  if (performance.wickets !== undefined) {
    points += performance.wickets * SCORING_RULES.bowling.wicket;
    
    if (performance.wickets >= 3 && performance.wickets < 4) {
      points += SCORING_RULES.bowling.threeWicketBonus;
    }
    
    if (performance.wickets >= 4 && performance.wickets < 5) {
      points += SCORING_RULES.bowling.fourWicketBonus;
    }
    
    if (performance.wickets >= 5) {
      points += SCORING_RULES.bowling.fiveWicketBonus;
    }
  }

  if (performance.maidenOvers) {
    points += performance.maidenOvers * SCORING_RULES.bowling.maidenOver;
  }

  // Fielding points
  if (performance.catches) {
    points += performance.catches * SCORING_RULES.fielding.catch;
  }

  if (performance.stumpings) {
    points += performance.stumpings * SCORING_RULES.fielding.stumping;
  }

  if (performance.runOuts) {
    points += performance.runOuts * SCORING_RULES.fielding.runOut;
  }

  return points;
}

/**
 * Update player points in the database
 */
export async function updatePlayerPoints(playerId: number, additionalPoints: number) {
  const db = await getDb();
  if (!db) return;

  const [player] = await db.select().from(players).where(eq(players.id, playerId)).limit(1);
  if (!player) return;

  const newPoints = player.points + additionalPoints;
  await db.update(players).set({ points: newPoints }).where(eq(players.id, playerId));

  return newPoints;
}

/**
 * Update fantasy team points based on player performances
 */
export async function updateTeamPoints(teamId: number) {
  const db = await getDb();
  if (!db) return;

  // Get all players in the team
  const teamPlayersList = await db
    .select()
    .from(teamPlayers)
    .where(eq(teamPlayers.teamId, teamId));

  let totalPoints = 0;

  for (const tp of teamPlayersList) {
    const [player] = await db.select().from(players).where(eq(players.id, tp.playerId)).limit(1);
    if (!player) continue;

    let playerPoints = player.points;

    // Apply captain/vice-captain multipliers
    if (tp.isCaptain) {
      playerPoints *= SCORING_RULES.captainMultiplier;
    } else if (tp.isViceCaptain) {
      playerPoints *= SCORING_RULES.viceCaptainMultiplier;
    }

    totalPoints += playerPoints;
  }

  // Update team total points
  await db.update(fantasyTeams).set({ totalPoints }).where(eq(fantasyTeams.id, teamId));

  return totalPoints;
}

/**
 * Update contest entry points and rankings
 */
export async function updateContestRankings(contestId: number) {
  const db = await getDb();
  if (!db) return;

  // Get all entries for the contest
  const entries = await db
    .select()
    .from(contestEntries)
    .where(eq(contestEntries.contestId, contestId));

  // Calculate points for each entry
  const entriesWithPoints = await Promise.all(
    entries.map(async (entry) => {
      const [team] = await db!.select().from(fantasyTeams).where(eq(fantasyTeams.id, entry.teamId)).limit(1);
      return {
        ...entry,
        points: team?.totalPoints || 0,
      };
    })
  );

  // Sort by points (descending)
  entriesWithPoints.sort((a, b) => b.points - a.points);

  // Update ranks
  for (let i = 0; i < entriesWithPoints.length; i++) {
    const entry = entriesWithPoints[i];
    if (!entry) continue;
    
    await db.update(contestEntries)
      .set({ 
        rank: i + 1,
        points: entry.points 
      })
      .where(eq(contestEntries.id, entry.id));
  }

  return entriesWithPoints;
}

/**
 * Update user total points from all their teams
 */
export async function updateUserPoints(userId: number) {
  const db = await getDb();
  if (!db) return;

  const userTeams = await db.select().from(fantasyTeams).where(eq(fantasyTeams.userId, userId));

  const totalPoints = userTeams.reduce((sum, team) => sum + (team.totalPoints || 0), 0);

  // Calculate level (1000 points per level)
  const level = Math.floor(totalPoints / 1000) + 1;

  await db.update(users).set({ totalPoints, level }).where(eq(users.id, userId));

  // Check and award achievements
  await checkAndAwardAchievements(userId, totalPoints, level);

  return { totalPoints, level };
}

/**
 * Check if user has earned any achievements and award them
 */
async function checkAndAwardAchievements(userId: number, totalPoints: number, level: number) {
  const db = await getDb();
  if (!db) return;

  // Get all achievements
  const allAchievements = await db.select().from(achievements);

  // Get user's current achievements
  const userAchievementsList = await db
    .select()
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));

  const earnedAchievementIds = new Set(userAchievementsList.map(ua => ua.achievementId));

  // Check each achievement
  for (const achievement of allAchievements) {
    if (earnedAchievementIds.has(achievement.id)) continue; // Already earned

    let earned = false;

    // Check criteria (simplified - you can expand this)
    if (achievement.name.includes("First Team") && level >= 1) {
      earned = true;
    } else if (achievement.name.includes("100 Points") && totalPoints >= 100) {
      earned = true;
    } else if (achievement.name.includes("500 Points") && totalPoints >= 500) {
      earned = true;
    } else if (achievement.name.includes("1000 Points") && totalPoints >= 1000) {
      earned = true;
    } else if (achievement.name.includes("Level 5") && level >= 5) {
      earned = true;
    } else if (achievement.name.includes("Level 10") && level >= 10) {
      earned = true;
    }

    if (earned) {
      await db.insert(userAchievements).values({
        userId,
        achievementId: achievement.id,
      });
    }
  }
}

/**
 * Process match data and update all related points
 */
export async function processMatchResults(matchId: string, playerPerformances: Array<{
  playerId: number;
  performance: {
    runs?: number;
    ballsFaced?: number;
    fours?: number;
    sixes?: number;
    wickets?: number;
    maidenOvers?: number;
    catches?: number;
    stumpings?: number;
    runOuts?: number;
  };
}>) {
  const db = await getDb();
  if (!db) return;

  // Update player points
  for (const { playerId, performance } of playerPerformances) {
    const points = calculatePlayerPoints(performance);
    await updatePlayerPoints(playerId, points);
  }

  // Get all teams that have these players
  const affectedPlayerIds = playerPerformances.map(p => p.playerId);
  const teamsWithPlayers = await db
    .select()
    .from(teamPlayers)
    .where(eq(teamPlayers.playerId, affectedPlayerIds[0]!)); // Simplified query

  const uniqueTeamIds = Array.from(new Set(teamsWithPlayers.map(tp => tp.teamId)));

  // Update team points
  for (const teamId of uniqueTeamIds) {
    await updateTeamPoints(teamId);

    // Get team owner
    const [team] = await db.select().from(fantasyTeams).where(eq(fantasyTeams.id, teamId)).limit(1);
    if (team) {
      await updateUserPoints(team.userId);
    }
  }

  // Update contest rankings
  const contestsWithTeams = await db
    .select()
    .from(contestEntries)
    .where(eq(contestEntries.teamId, uniqueTeamIds[0]!)); // Simplified

  const uniqueContestIds = Array.from(new Set(contestsWithTeams.map(ce => ce.contestId)));

  for (const contestId of uniqueContestIds) {
    await updateContestRankings(contestId);
  }

  return {
    playersUpdated: playerPerformances.length,
    teamsUpdated: uniqueTeamIds.length,
    contestsUpdated: uniqueContestIds.length,
  };
}
