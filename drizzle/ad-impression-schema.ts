import { int, mysqlTable, varchar, timestamp, text } from "drizzle-orm/mysql-core";

/**
 * Ad Impression Tracking Table
 * Records every time the FairPlay ad is viewed by users
 */
export const adImpressions = mysqlTable("ad_impressions", {
  id: int("id").autoincrement().primaryKey(),
  
  // Tracking identifiers
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  visitorId: varchar("visitor_id", { length: 255 }), // Link to visitor_tracking if available
  
  // Timestamp
  viewedAt: timestamp("viewed_at").notNull().defaultNow(),
  
  // Traffic source (UTM parameters)
  utmSource: varchar("utm_source", { length: 255 }), // e.g., "google"
  utmMedium: varchar("utm_medium", { length: 255 }), // e.g., "cpc"
  utmCampaign: varchar("utm_campaign", { length: 255 }), // e.g., "cricket_fantasy_ads"
  utmContent: varchar("utm_content", { length: 255 }),
  utmTerm: varchar("utm_term", { length: 255 }),
  
  // User context
  ipAddress: varchar("ip_address", { length: 255 }),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  deviceType: varchar("device_type", { length: 50 }), // mobile, desktop, tablet
  browserName: varchar("browser_name", { length: 100 }),
  
  // Page context
  pageUrl: text("page_url"), // Full URL where ad was viewed
  referrer: text("referrer"), // Where user came from
  
  // Ad metadata
  adType: varchar("ad_type", { length: 50 }).default("fairplay_targeted"), // Type of ad shown
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type AdImpression = typeof adImpressions.$inferSelect;
export type InsertAdImpression = typeof adImpressions.$inferInsert;
