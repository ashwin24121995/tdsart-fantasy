import { desc, sql, gte, lte, eq, and, or, like } from "drizzle-orm";
import { getDb } from "./db";
import {
  users,
  userAcquisition,
  conversionEvents,
  fantasyTeams,
  contestEntries,
  User,
} from "../drizzle/schema";

/**
 * Get all users with their acquisition data
 */
export async function getAllUsersWithAcquisition(filters?: {
  search?: string;
  utmSource?: string;
  startDate?: Date;
  endDate?: Date;
}): Promise<Array<User & { acquisition: any }>> {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Cannot get users: database not available");
    return [];
  }

  try {
    let query = db
      .select({
        user: users,
        acquisition: userAcquisition,
      })
      .from(users)
      .leftJoin(userAcquisition, eq(users.id, userAcquisition.userId))
      .orderBy(desc(users.createdAt));

    // Apply filters
    const conditions = [];
    if (filters?.search) {
      conditions.push(
        or(
          like(users.name, `%${filters.search}%`),
          like(users.email, `%${filters.search}%`)
        )
      );
    }
    if (filters?.utmSource) {
      conditions.push(eq(userAcquisition.utmSource, filters.utmSource));
    }
    if (filters?.startDate) {
      conditions.push(gte(users.createdAt, filters.startDate));
    }
    if (filters?.endDate) {
      conditions.push(lte(users.createdAt, filters.endDate));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const results = await query;

    return results.map((r) => ({
      ...r.user,
      acquisition: r.acquisition,
    }));
  } catch (error) {
    console.error("[Admin] Failed to get users with acquisition:", error);
    return [];
  }
}

/**
 * Get traffic overview statistics
 */
export async function getTrafficOverview(startDate?: Date, endDate?: Date): Promise<{
  totalUsers: number;
  newUsersToday: number;
  totalRegistrations: number;
  totalTeams: number;
  totalContestEntries: number;
  verifiedUsers: number;
  unverifiedUsers: number;
}> {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Cannot get traffic overview: database not available");
    return {
      totalUsers: 0,
      newUsersToday: 0,
      totalRegistrations: 0,
      totalTeams: 0,
      totalContestEntries: 0,
      verifiedUsers: 0,
      unverifiedUsers: 0,
    };
  }

  try {
    // Total users
    const totalUsersResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(users);
    const totalUsers = Number(totalUsersResult[0]?.count || 0);

    // New users today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newUsersTodayResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(users)
      .where(gte(users.createdAt, today));
    const newUsersToday = Number(newUsersTodayResult[0]?.count || 0);

    // Total registrations (conversion events)
    const totalRegistrationsResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(conversionEvents)
      .where(eq(conversionEvents.eventType, "registration"));
    const totalRegistrations = Number(totalRegistrationsResult[0]?.count || 0);

    // Total teams
    const totalTeamsResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(fantasyTeams);
    const totalTeams = Number(totalTeamsResult[0]?.count || 0);

    // Total contest entries
    const totalContestEntriesResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(contestEntries);
    const totalContestEntries = Number(totalContestEntriesResult[0]?.count || 0);

    // Verified users
    const verifiedUsersResult = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(users)
      .where(eq(users.isVerified, true));
    const verifiedUsers = Number(verifiedUsersResult[0]?.count || 0);

    // Unverified users
    const unverifiedUsers = totalUsers - verifiedUsers;

    return {
      totalUsers,
      newUsersToday,
      totalRegistrations,
      totalTeams,
      totalContestEntries,
      verifiedUsers,
      unverifiedUsers,
    };
  } catch (error) {
    console.error("[Admin] Failed to get traffic overview:", error);
    return {
      totalUsers: 0,
      newUsersToday: 0,
      totalRegistrations: 0,
      totalTeams: 0,
      totalContestEntries: 0,
      verifiedUsers: 0,
      unverifiedUsers: 0,
    };
  }
}

/**
 * Get recent activity feed
 */
export async function getRecentActivity(limit: number = 50): Promise<Array<{
  id: number;
  userId: number;
  eventType: string;
  eventValue: number | null;
  metadata: string | null;
  createdAt: Date;
  userName: string | null;
  userEmail: string | null;
}>> {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Cannot get recent activity: database not available");
    return [];
  }

  try {
    const results = await db
      .select({
        id: conversionEvents.id,
        userId: conversionEvents.userId,
        eventType: conversionEvents.eventType,
        eventValue: conversionEvents.eventValue,
        metadata: conversionEvents.metadata,
        createdAt: conversionEvents.createdAt,
        userName: users.name,
        userEmail: users.email,
      })
      .from(conversionEvents)
      .leftJoin(users, eq(conversionEvents.userId, users.id))
      .orderBy(desc(conversionEvents.createdAt))
      .limit(limit);

    return results;
  } catch (error) {
    console.error("[Admin] Failed to get recent activity:", error);
    return [];
  }
}

/**
 * Get user registration trend (daily counts for last 30 days)
 */
export async function getUserRegistrationTrend(): Promise<Array<{
  date: string;
  count: number;
}>> {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Cannot get registration trend: database not available");
    return [];
  }

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const results = await db
      .select({
        date: sql<string>`DATE(${users.createdAt})`,
        count: sql<number>`COUNT(*)`,
      })
      .from(users)
      .where(gte(users.createdAt, thirtyDaysAgo))
      .groupBy(sql`DATE(${users.createdAt})`)
      .orderBy(sql`DATE(${users.createdAt})`);

    return results.map((r) => ({
      date: r.date,
      count: Number(r.count),
    }));
  } catch (error) {
    console.error("[Admin] Failed to get registration trend:", error);
    return [];
  }
}

/**
 * Get traffic by state
 */
export async function getTrafficByState(): Promise<Array<{
  state: string;
  count: number;
}>> {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Cannot get traffic by state: database not available");
    return [];
  }

  try {
    const results = await db
      .select({
        state: users.state,
        count: sql<number>`COUNT(*)`,
      })
      .from(users)
      .where(sql`${users.state} IS NOT NULL`)
      .groupBy(users.state)
      .orderBy(desc(sql`COUNT(*)`));

    return results.map((r) => ({
      state: r.state || "Unknown",
      count: Number(r.count),
    }));
  } catch (error) {
    console.error("[Admin] Failed to get traffic by state:", error);
    return [];
  }
}

/**
 * Update user verification status
 */
export async function updateUserVerification(
  userId: number,
  isVerified: boolean
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Cannot update user verification: database not available");
    return;
  }

  try {
    await db
      .update(users)
      .set({ isVerified })
      .where(eq(users.id, userId));
    
    console.log(`[Admin] Updated user ${userId} verification to ${isVerified}`);
  } catch (error) {
    console.error("[Admin] Failed to update user verification:", error);
    throw error;
  }
}

/**
 * Update user role
 */
export async function updateUserRole(
  userId: number,
  role: "user" | "admin"
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Admin] Cannot update user role: database not available");
    return;
  }

  try {
    await db
      .update(users)
      .set({ role })
      .where(eq(users.id, userId));
    
    console.log(`[Admin] Updated user ${userId} role to ${role}`);
  } catch (error) {
    console.error("[Admin] Failed to update user role:", error);
    throw error;
  }
}
