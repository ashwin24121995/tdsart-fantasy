import { eq, desc, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  sports, InsertSport,
  players, InsertPlayer,
  fantasyTeams, InsertFantasyTeam,
  teamPlayers, InsertTeamPlayer,
  contests, InsertContest,
  contestEntries, InsertContestEntry,
  achievements, InsertAchievement,
  userAchievements, InsertUserAchievement
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER QUERIES ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.email) {
    throw new Error("User email is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      email: user.email,
      openId: user.openId || null,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "loginMethod", "state", "password"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      if (field === 'password' && normalized) {
        values[field] = normalized;
        updateSet[field] = normalized;
      } else if (field !== 'password') {
        values[field] = normalized as any;
        updateSet[field] = normalized;
      }
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.dateOfBirth !== undefined) {
      values.dateOfBirth = user.dateOfBirth;
      updateSet.dateOfBirth = user.dateOfBirth;
    }
    if (user.isVerified !== undefined) {
      values.isVerified = user.isVerified;
      updateSet.isVerified = user.isVerified;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserProfile(userId: number, data: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(users).set(data).where(eq(users.id, userId));
}

// ============ SPORTS QUERIES ============

export async function getAllSports() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(sports).where(eq(sports.isActive, true));
}

export async function getSportBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(sports).where(eq(sports.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createSport(sport: InsertSport) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(sports).values(sport);
}

// ============ PLAYER QUERIES ============

export async function getPlayersBySport(sportId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(players)
    .where(and(eq(players.sportId, sportId), eq(players.isActive, true)))
    .orderBy(desc(players.points));
}

export async function getPlayerById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(players).where(eq(players.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createPlayer(player: InsertPlayer) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(players).values(player);
}

// ============ FANTASY TEAM QUERIES ============

export async function getUserTeams(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(fantasyTeams)
    .where(eq(fantasyTeams.userId, userId))
    .orderBy(desc(fantasyTeams.createdAt));
}

export async function getTeamById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(fantasyTeams).where(eq(fantasyTeams.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createFantasyTeam(team: InsertFantasyTeam) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(fantasyTeams).values(team);
  return result;
}

export async function deleteFantasyTeam(teamId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // First delete all team players
  await db.delete(teamPlayers).where(eq(teamPlayers.teamId, teamId));
  
  // Then delete the team
  await db.delete(fantasyTeams)
    .where(and(eq(fantasyTeams.id, teamId), eq(fantasyTeams.userId, userId)));
}

// ============ TEAM PLAYER QUERIES ============

export async function getTeamPlayers(teamId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select({
    teamPlayer: teamPlayers,
    player: players
  })
  .from(teamPlayers)
  .innerJoin(players, eq(teamPlayers.playerId, players.id))
  .where(eq(teamPlayers.teamId, teamId));
}

export async function addPlayerToTeam(teamPlayer: InsertTeamPlayer) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(teamPlayers).values(teamPlayer);
}

export async function removePlayerFromTeam(teamId: number, playerId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(teamPlayers)
    .where(and(eq(teamPlayers.teamId, teamId), eq(teamPlayers.playerId, playerId)));
}

// ============ CONTEST QUERIES ============

export async function getAllContests() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(contests)
    .orderBy(desc(contests.startTime));
}

export async function getUpcomingContests() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(contests)
    .where(eq(contests.status, "upcoming"))
    .orderBy(contests.startTime);
}

export async function getContestById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(contests).where(eq(contests.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createContest(contest: InsertContest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(contests).values(contest);
}

// ============ CONTEST ENTRY QUERIES ============

export async function getUserContestEntries(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select({
    entry: contestEntries,
    contest: contests,
    team: fantasyTeams
  })
  .from(contestEntries)
  .innerJoin(contests, eq(contestEntries.contestId, contests.id))
  .innerJoin(fantasyTeams, eq(contestEntries.teamId, fantasyTeams.id))
  .where(eq(contestEntries.userId, userId))
  .orderBy(desc(contestEntries.joinedAt));
}

export async function getContestLeaderboard(contestId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select({
    entry: contestEntries,
    user: users,
    team: fantasyTeams
  })
  .from(contestEntries)
  .innerJoin(users, eq(contestEntries.userId, users.id))
  .innerJoin(fantasyTeams, eq(contestEntries.teamId, fantasyTeams.id))
  .where(eq(contestEntries.contestId, contestId))
  .orderBy(desc(contestEntries.points));
}

export async function joinContest(entry: InsertContestEntry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(contestEntries).values(entry);
  
  // Increment participant count
  await db.update(contests)
    .set({ currentParticipants: sql`${contests.currentParticipants} + 1` })
    .where(eq(contests.id, entry.contestId));
}

// ============ ACHIEVEMENT QUERIES ============

export async function getAllAchievements() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(achievements);
}

export async function getUserAchievements(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select({
    userAchievement: userAchievements,
    achievement: achievements
  })
  .from(userAchievements)
  .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
  .where(eq(userAchievements.userId, userId))
  .orderBy(desc(userAchievements.earnedAt));
}

export async function awardAchievement(userId: number, achievementId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(userAchievements).values({ userId, achievementId });
}

// ============ LEADERBOARD QUERIES ============

export async function getGlobalLeaderboard(limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(users)
    .orderBy(desc(users.totalPoints))
    .limit(limit);
}
