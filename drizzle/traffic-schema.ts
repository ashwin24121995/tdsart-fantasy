import { int, mysqlTable, text, timestamp, varchar, index } from "drizzle-orm/mysql-core";

/**
 * Page views table - tracks every page visit
 */
export const pageViews = mysqlTable("page_views", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("session_id", { length: 64 }).notNull(),
  userId: int("user_id"), // null for anonymous visitors
  path: varchar("path", { length: 512 }).notNull(),
  referrer: varchar("referrer", { length: 512 }),
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),
  // Geolocation data
  country: varchar("country", { length: 100 }),
  countryCode: varchar("country_code", { length: 10 }),
  region: varchar("region", { length: 100 }),
  city: varchar("city", { length: 100 }),
  latitude: varchar("latitude", { length: 20 }),
  longitude: varchar("longitude", { length: 20 }),
  timezone: varchar("timezone", { length: 50 }),
  // ISP and connection data
  isp: varchar("isp", { length: 255 }),
  org: varchar("org", { length: 255 }),
  asn: varchar("asn", { length: 50 }),
  // Device and browser data
  deviceType: varchar("device_type", { length: 20 }), // mobile, desktop, tablet
  browser: varchar("browser", { length: 50 }),
  browserVersion: varchar("browser_version", { length: 50 }),
  os: varchar("os", { length: 50 }),
  osVersion: varchar("os_version", { length: 50 }),
  // Screen and display data
  screenResolution: varchar("screen_resolution", { length: 20 }),
  viewportSize: varchar("viewport_size", { length: 20 }),
  // Language and locale
  language: varchar("language", { length: 10 }),
  // UTM parameters for tracking campaigns
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  utmTerm: varchar("utm_term", { length: 255 }),
  utmContent: varchar("utm_content", { length: 255 }),
  gclid: varchar("gclid", { length: 255 }), // Google Click ID
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  sessionIdx: index("session_idx").on(table.sessionId),
  userIdx: index("user_idx").on(table.userId),
  pathIdx: index("path_idx").on(table.path),
  createdAtIdx: index("created_at_idx").on(table.createdAt),
}));

/**
 * Sessions table - tracks user sessions with entry/exit pages
 */
export const sessions = mysqlTable("sessions", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("session_id", { length: 64 }).notNull().unique(),
  userId: int("user_id"), // null for anonymous visitors
  entryPage: varchar("entry_page", { length: 512 }).notNull(),
  exitPage: varchar("exit_page", { length: 512 }),
  pageViewCount: int("page_view_count").default(1).notNull(),
  duration: int("duration"), // in seconds, null if still active
  bounced: int("bounced").default(0).notNull(), // 1 if single page visit
  // UTM parameters from entry
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  gclid: varchar("gclid", { length: 255 }),
  // Device and browser data from entry
  deviceType: varchar("device_type", { length: 20 }),
  browser: varchar("browser", { length: 50 }),
  os: varchar("os", { length: 50 }),
  // Geolocation data from entry
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  ipAddress: varchar("ip_address", { length: 45 }),
  isp: varchar("isp", { length: 255 }),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  endedAt: timestamp("ended_at"),
}, (table) => ({
  sessionIdIdx: index("session_id_idx").on(table.sessionId),
  userIdx: index("user_idx").on(table.userId),
  startedAtIdx: index("started_at_idx").on(table.startedAt),
}));

export type PageView = typeof pageViews.$inferSelect;
export type InsertPageView = typeof pageViews.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;
