import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * User acquisition tracking - captures UTM parameters and campaign data
 */
export const userAcquisition = mysqlTable("userAcquisition", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(), // One acquisition record per user
  
  // UTM Parameters
  utmSource: varchar("utmSource", { length: 255 }), // e.g., "google", "facebook", "twitter"
  utmMedium: varchar("utmMedium", { length: 255 }), // e.g., "cpc", "email", "social"
  utmCampaign: varchar("utmCampaign", { length: 255 }), // Campaign name or ID
  utmTerm: varchar("utmTerm", { length: 255 }), // Keyword for paid search
  utmContent: varchar("utmContent", { length: 255 }), // Ad creative ID or variant
  
  // Google Ads Specific Parameters
  gclid: varchar("gclid", { length: 255 }), // Google Click ID for conversion tracking
  matchType: varchar("matchType", { length: 50 }), // e.g., "exact", "phrase", "broad"
  device: varchar("device", { length: 50 }), // e.g., "mobile", "desktop", "tablet"
  network: varchar("network", { length: 50 }), // e.g., "search", "display", "youtube"
  adPosition: varchar("adPosition", { length: 50 }), // e.g., "1t1", "1t2", "1s1"
  
  // Additional tracking
  referrer: text("referrer"), // HTTP referrer
  landingPage: text("landingPage"), // First page visited
  userAgent: text("userAgent"), // Browser user agent
  ipAddress: varchar("ipAddress", { length: 45 }), // IPv4 or IPv6
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserAcquisition = typeof userAcquisition.$inferSelect;
export type InsertUserAcquisition = typeof userAcquisition.$inferInsert;

/**
 * Conversion events tracking - tracks key actions by users
 */
export const conversionEvents = mysqlTable("conversionEvents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  eventType: varchar("eventType", { length: 100 }).notNull(), // e.g., "registration", "team_created", "contest_joined"
  eventValue: int("eventValue").default(0), // Optional value (e.g., contest entry fee)
  
  // Link to acquisition source
  utmSource: varchar("utmSource", { length: 255 }),
  utmMedium: varchar("utmMedium", { length: 255 }),
  utmCampaign: varchar("utmCampaign", { length: 255 }),
  
  metadata: text("metadata"), // JSON with additional event data
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ConversionEvent = typeof conversionEvents.$inferSelect;
export type InsertConversionEvent = typeof conversionEvents.$inferInsert;
