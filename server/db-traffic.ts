import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { getDb } from "./db";
import { pageViews, sessions, type InsertPageView, type InsertSession } from "../drizzle/schema";

/**
 * Track a page view
 */
export async function trackPageView(data: InsertPageView) {
  const db = await getDb();
  if (!db) return null;

  const [result] = await db.insert(pageViews).values(data);
  return result;
}

/**
 * Create or update a session
 */
export async function upsertSession(sessionId: string, data: Partial<InsertSession>) {
  const db = await getDb();
  if (!db) return null;

  // Check if session exists
  const existing = await db
    .select()
    .from(sessions)
    .where(eq(sessions.sessionId, sessionId))
    .limit(1);

  if (existing.length > 0) {
    // Update existing session
    await db
      .update(sessions)
      .set({
        exitPage: data.exitPage,
        pageViewCount: sql`${sessions.pageViewCount} + 1`,
        endedAt: new Date(),
        duration: data.duration,
        bounced: data.bounced ?? 0,
      })
      .where(eq(sessions.sessionId, sessionId));
    
    return existing[0];
  } else {
    // Create new session
    const [result] = await db.insert(sessions).values({
      sessionId,
      ...data,
    } as InsertSession);
    return result;
  }
}

/**
 * Get traffic stats for a date range
 */
export async function getTrafficStats(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return null;

  // Total page views
  const [pageViewsResult] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(pageViews)
    .where(and(
      gte(pageViews.createdAt, startDate),
      lte(pageViews.createdAt, endDate)
    ));

  // Unique sessions
  const [sessionsResult] = await db
    .select({ count: sql<number>`COUNT(DISTINCT ${sessions.sessionId})` })
    .from(sessions)
    .where(and(
      gte(sessions.startedAt, startDate),
      lte(sessions.startedAt, endDate)
    ));

  // Bounce rate
  const [bounceResult] = await db
    .select({
      total: sql<number>`COUNT(*)`,
      bounced: sql<number>`SUM(CASE WHEN ${sessions.bounced} = 1 THEN 1 ELSE 0 END)`,
    })
    .from(sessions)
    .where(and(
      gte(sessions.startedAt, startDate),
      lte(sessions.startedAt, endDate)
    ));

  // Average session duration
  const [durationResult] = await db
    .select({
      avgDuration: sql<number>`AVG(${sessions.duration})`,
    })
    .from(sessions)
    .where(and(
      gte(sessions.startedAt, startDate),
      lte(sessions.startedAt, endDate),
      sql`${sessions.duration} IS NOT NULL`
    ));

  const bounceRate = bounceResult && bounceResult.total > 0
    ? (bounceResult.bounced / bounceResult.total) * 100
    : 0;

  return {
    pageViews: pageViewsResult?.count || 0,
    uniqueVisitors: sessionsResult?.count || 0,
    bounceRate: Math.round(bounceRate * 10) / 10,
    avgSessionDuration: Math.round(durationResult?.avgDuration || 0),
  };
}

/**
 * Get organic traffic (direct, referral, search)
 */
export async function getOrganicTraffic(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return [];

  const results = await db
    .select({
      source: sql<string>`COALESCE(${pageViews.utmSource}, 'Direct')`,
      visitors: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`,
      pageViews: sql<number>`COUNT(*)`,
    })
    .from(pageViews)
    .where(and(
      gte(pageViews.createdAt, startDate),
      lte(pageViews.createdAt, endDate),
      sql`(${pageViews.gclid} IS NULL OR ${pageViews.gclid} = '')`
    ))
    .groupBy(sql`COALESCE(${pageViews.utmSource}, 'Direct')`)
    .orderBy(desc(sql`COUNT(*)`));

  return results;
}

/**
 * Get Google Ads traffic
 */
export async function getGoogleAdsTraffic(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return [];

  const results = await db
    .select({
      campaign: sql<string>`COALESCE(${pageViews.utmCampaign}, 'Unknown Campaign')`,
      source: pageViews.utmSource,
      medium: pageViews.utmMedium,
      visitors: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`,
      pageViews: sql<number>`COUNT(*)`,
      clicks: sql<number>`COUNT(DISTINCT ${pageViews.gclid})`,
    })
    .from(pageViews)
    .where(and(
      gte(pageViews.createdAt, startDate),
      lte(pageViews.createdAt, endDate),
      sql`${pageViews.gclid} IS NOT NULL AND ${pageViews.gclid} != ''`
    ))
    .groupBy(sql`COALESCE(${pageViews.utmCampaign}, 'Unknown Campaign')`, pageViews.utmSource, pageViews.utmMedium)
    .orderBy(desc(sql`COUNT(*)`));

  return results;
}

/**
 * Get top pages by views
 */
export async function getTopPages(startDate: Date, endDate: Date, limit: number = 10) {
  const db = await getDb();
  if (!db) return [];

  const results = await db
    .select({
      path: pageViews.path,
      views: sql<number>`COUNT(*)`,
      uniqueVisitors: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`,
    })
    .from(pageViews)
    .where(and(
      gte(pageViews.createdAt, startDate),
      lte(pageViews.createdAt, endDate)
    ))
    .groupBy(pageViews.path)
    .orderBy(desc(sql`COUNT(*)`))
    .limit(limit);

  return results;
}

/**
 * Get traffic by device type
 */
export async function getTrafficByDevice(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return [];

  const results = await db
    .select({
      device: sql<string>`COALESCE(${pageViews.deviceType}, 'Unknown')`,
      visitors: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`,
      pageViews: sql<number>`COUNT(*)`,
    })
    .from(pageViews)
    .where(and(
      gte(pageViews.createdAt, startDate),
      lte(pageViews.createdAt, endDate)
    ))
    .groupBy(sql`COALESCE(${pageViews.deviceType}, 'Unknown')`)
    .orderBy(desc(sql`COUNT(*)`));

  return results;
}

/**
 * Get traffic trend (daily breakdown)
 */
export async function getTrafficTrend(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return [];

  const results = await db
    .select({
      date: sql<string>`DATE(${pageViews.createdAt})`,
      visitors: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`,
      pageViews: sql<number>`COUNT(*)`,
    })
    .from(pageViews)
    .where(and(
      gte(pageViews.createdAt, startDate),
      lte(pageViews.createdAt, endDate)
    ))
    .groupBy(sql`DATE(${pageViews.createdAt})`)
    .orderBy(sql`DATE(${pageViews.createdAt})`);

  return results;
}
