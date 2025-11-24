import { int, mysqlTable, varchar, timestamp, text } from "drizzle-orm/mysql-core";

/**
 * WhatsApp Conversion Tracking Table
 * Records every click on the WhatsApp button for ROI analysis
 */
export const whatsappConversions = mysqlTable("whatsapp_conversions", {
  id: int("id").autoincrement().primaryKey(),
  
  // Tracking identifiers
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  visitorId: varchar("visitor_id", { length: 255 }), // Link to visitor_tracking if available
  
  // Timestamp
  clickedAt: timestamp("clicked_at").notNull().defaultNow(),
  
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
  pageUrl: text("page_url"), // Full URL where click happened
  referrer: text("referrer"), // Where user came from
  
  // Conversion metadata
  adType: varchar("ad_type", { length: 50 }).default("fairplay_targeted"), // Type of ad clicked
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type WhatsAppConversion = typeof whatsappConversions.$inferSelect;
export type InsertWhatsAppConversion = typeof whatsappConversions.$inferInsert;
