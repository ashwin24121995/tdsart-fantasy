import { eq, and, desc, sql, gte, lte } from "drizzle-orm";
import { getDb } from "./db";
import {
  userAcquisition,
  conversionEvents,
  InsertUserAcquisition,
  InsertConversionEvent,
  UserAcquisition,
  ConversionEvent,
} from "../drizzle/schema";

/**
 * Save user acquisition data (UTM parameters, referrer, etc.)
 */
export async function saveUserAcquisition(data: InsertUserAcquisition): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Analytics] Cannot save user acquisition: database not available");
    return;
  }

  try {
    await db.insert(userAcquisition).values(data);
    console.log(`[Analytics] Saved acquisition data for user ${data.userId}`);
  } catch (error) {
    console.error("[Analytics] Failed to save user acquisition:", error);
    throw error;
  }
}

/**
 * Get user acquisition data by user ID
 */
export async function getUserAcquisition(userId: number): Promise<UserAcquisition | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Analytics] Cannot get user acquisition: database not available");
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(userAcquisition)
      .where(eq(userAcquisition.userId, userId))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Analytics] Failed to get user acquisition:", error);
    return undefined;
  }
}

/**
 * Track a conversion event
 */
export async function trackConversionEvent(data: InsertConversionEvent): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Analytics] Cannot track conversion event: database not available");
    return;
  }

  try {
    // Get user's acquisition source if not provided
    if (!data.utmSource && !data.utmMedium && !data.utmCampaign) {
      const acquisition = await getUserAcquisition(data.userId);
      if (acquisition) {
        data.utmSource = acquisition.utmSource || undefined;
        data.utmMedium = acquisition.utmMedium || undefined;
        data.utmCampaign = acquisition.utmCampaign || undefined;
      }
    }

    await db.insert(conversionEvents).values(data);
    console.log(`[Analytics] Tracked ${data.eventType} event for user ${data.userId}`);
  } catch (error) {
    console.error("[Analytics] Failed to track conversion event:", error);
    throw error;
  }
}

/**
 * Get conversion events by user ID
 */
export async function getUserConversionEvents(userId: number): Promise<ConversionEvent[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Analytics] Cannot get conversion events: database not available");
    return [];
  }

  try {
    return await db
      .select()
      .from(conversionEvents)
      .where(eq(conversionEvents.userId, userId))
      .orderBy(desc(conversionEvents.createdAt));
  } catch (error) {
    console.error("[Analytics] Failed to get conversion events:", error);
    return [];
  }
}

/**
 * Get campaign performance summary
 */
export async function getCampaignPerformance(
  startDate?: Date,
  endDate?: Date
): Promise<Array<{
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  users: number;
  registrations: number;
  teamsCreated: number;
  contestsJoined: number;
}>> {
  const db = await getDb();
  if (!db) {
    console.warn("[Analytics] Cannot get campaign performance: database not available");
    return [];
  }

  try {
    let query = db
      .select({
        utmSource: userAcquisition.utmSource,
        utmMedium: userAcquisition.utmMedium,
        utmCampaign: userAcquisition.utmCampaign,
        users: sql<number>`COUNT(DISTINCT ${userAcquisition.userId})`,
      })
      .from(userAcquisition);

    if (startDate) {
      query = query.where(gte(userAcquisition.createdAt, startDate)) as any;
    }
    if (endDate) {
      query = query.where(lte(userAcquisition.createdAt, endDate)) as any;
    }

    const results = await query.groupBy(
      userAcquisition.utmSource,
      userAcquisition.utmMedium,
      userAcquisition.utmCampaign
    );

    // Get conversion counts for each campaign
    const enrichedResults = await Promise.all(
      results.map(async (row) => {
        const registrations = await db
          .select({ count: sql<number>`COUNT(*)` })
          .from(conversionEvents)
          .where(
            and(
              eq(conversionEvents.eventType, "registration"),
              eq(conversionEvents.utmSource, row.utmSource || ""),
              eq(conversionEvents.utmMedium, row.utmMedium || ""),
              eq(conversionEvents.utmCampaign, row.utmCampaign || "")
            )
          );

        const teamsCreated = await db
          .select({ count: sql<number>`COUNT(*)` })
          .from(conversionEvents)
          .where(
            and(
              eq(conversionEvents.eventType, "team_created"),
              eq(conversionEvents.utmSource, row.utmSource || ""),
              eq(conversionEvents.utmMedium, row.utmMedium || ""),
              eq(conversionEvents.utmCampaign, row.utmCampaign || "")
            )
          );

        const contestsJoined = await db
          .select({ count: sql<number>`COUNT(*)` })
          .from(conversionEvents)
          .where(
            and(
              eq(conversionEvents.eventType, "contest_joined"),
              eq(conversionEvents.utmSource, row.utmSource || ""),
              eq(conversionEvents.utmMedium, row.utmMedium || ""),
              eq(conversionEvents.utmCampaign, row.utmCampaign || "")
            )
          );

        return {
          ...row,
          registrations: Number(registrations[0]?.count || 0),
          teamsCreated: Number(teamsCreated[0]?.count || 0),
          contestsJoined: Number(contestsJoined[0]?.count || 0),
        };
      })
    );

    return enrichedResults;
  } catch (error) {
    console.error("[Analytics] Failed to get campaign performance:", error);
    return [];
  }
}

/**
 * Get acquisition sources breakdown
 */
export async function getAcquisitionSourcesBreakdown(): Promise<Array<{
  source: string;
  count: number;
}>> {
  const db = await getDb();
  if (!db) {
    console.warn("[Analytics] Cannot get acquisition sources: database not available");
    return [];
  }

  try {
    const results = await db
      .select({
        source: userAcquisition.utmSource,
        count: sql<number>`COUNT(*)`,
      })
      .from(userAcquisition)
      .groupBy(userAcquisition.utmSource)
      .orderBy(desc(sql`COUNT(*)`));

    return results.map(r => ({
      source: r.source || "Direct",
      count: Number(r.count),
    }));
  } catch (error) {
    console.error("[Analytics] Failed to get acquisition sources:", error);
    return [];
  }
}
