import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, unique } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  verificationToken: varchar("verificationToken", { length: 255 }),
  resetPasswordToken: varchar("resetPasswordToken", { length: 255 }),
  resetPasswordExpires: timestamp("resetPasswordExpires"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Fantasy sports specific fields
  dateOfBirth: timestamp("dateOfBirth"), // For age verification
  state: varchar("state", { length: 100 }), // For location verification
  isVerified: boolean("isVerified").default(false).notNull(), // Age & location verified
  totalPoints: int("totalPoints").default(0).notNull(),
  level: int("level").default(1).notNull(),
  achievements: text("achievements"), // JSON array of achievement IDs
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Sports available on the platform (Cricket, Football, Basketball, etc.)
 */
export const sports = mysqlTable("sports", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  icon: varchar("icon", { length: 255 }), // Icon URL or emoji
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Sport = typeof sports.$inferSelect;
export type InsertSport = typeof sports.$inferInsert;

/**
 * Real-world players that users can select for their fantasy teams
 */
export const players = mysqlTable("players", {
  id: int("id").autoincrement().primaryKey(),
  sportId: int("sportId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 100 }), // e.g., Batsman, Bowler, Forward, Defender
  team: varchar("team", { length: 255 }), // Real-world team name
  photo: varchar("photo", { length: 255 }), // Player photo URL
  stats: text("stats"), // JSON object with player statistics
  points: int("points").default(0).notNull(), // Current season points
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Player = typeof players.$inferSelect;
export type InsertPlayer = typeof players.$inferInsert;

/**
 * Fantasy teams created by users
 */
export const fantasyTeams = mysqlTable("fantasyTeams", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sportId: int("sportId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  logo: varchar("logo", { length: 255 }), // Team logo URL
  totalPoints: int("totalPoints").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FantasyTeam = typeof fantasyTeams.$inferSelect;
export type InsertFantasyTeam = typeof fantasyTeams.$inferInsert;

/**
 * Players selected in a fantasy team
 */
export const teamPlayers = mysqlTable("teamPlayers", {
  id: int("id").autoincrement().primaryKey(),
  teamId: int("teamId").notNull(),
  playerId: int("playerId").notNull(),
  position: varchar("position", { length: 100 }), // Position in fantasy team
  isCaptain: boolean("isCaptain").default(false).notNull(),
  isViceCaptain: boolean("isViceCaptain").default(false).notNull(),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
}, (table) => ({
  uniqueTeamPlayer: unique().on(table.teamId, table.playerId),
}));

export type TeamPlayer = typeof teamPlayers.$inferSelect;
export type InsertTeamPlayer = typeof teamPlayers.$inferInsert;

/**
 * Contests that users can join with their teams
 */
export const contests = mysqlTable("contests", {
  id: int("id").autoincrement().primaryKey(),
  sportId: int("sportId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime").notNull(),
  maxParticipants: int("maxParticipants").default(0).notNull(), // 0 = unlimited
  currentParticipants: int("currentParticipants").default(0).notNull(),
  status: mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"]).default("upcoming").notNull(),
  rules: text("rules"), // JSON object with contest rules
  prizes: text("prizes"), // JSON object with prize structure (virtual rewards)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Contest = typeof contests.$inferSelect;
export type InsertContest = typeof contests.$inferInsert;

/**
 * User participation in contests
 */
export const contestEntries = mysqlTable("contestEntries", {
  id: int("id").autoincrement().primaryKey(),
  contestId: int("contestId").notNull(),
  userId: int("userId").notNull(),
  teamId: int("teamId").notNull(),
  points: int("points").default(0).notNull(),
  rank: int("rank").default(0).notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
}, (table) => ({
  uniqueContestUser: unique().on(table.contestId, table.userId, table.teamId),
}));

export type ContestEntry = typeof contestEntries.$inferSelect;
export type InsertContestEntry = typeof contestEntries.$inferInsert;

/**
 * Achievements that users can earn
 */
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 255 }), // Achievement badge icon URL
  category: varchar("category", { length: 100 }), // e.g., "team", "contest", "streak"
  requirement: text("requirement"), // JSON object describing how to earn it
  points: int("points").default(0).notNull(), // Points awarded for earning this
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;

/**
 * User achievements earned
 */
export const userAchievements = mysqlTable("userAchievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  achievementId: int("achievementId").notNull(),
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
}, (table) => ({
  uniqueUserAchievement: unique().on(table.userId, table.achievementId),
}));

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = typeof userAchievements.$inferInsert;

/**
 * Push notification subscriptions
 */
export const pushSubscriptions = mysqlTable("pushSubscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  endpoint: text("endpoint").notNull(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
  userAgent: text("userAgent"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PushSubscription = typeof pushSubscriptions.$inferSelect;
export type InsertPushSubscription = typeof pushSubscriptions.$inferInsert;

/**
 * User notification preferences
 */
export const notificationPreferences = mysqlTable("notificationPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  contestStart: boolean("contestStart").default(true).notNull(),
  matchBeginning: boolean("matchBeginning").default(true).notNull(),
  rankChanges: boolean("rankChanges").default(true).notNull(),
  achievementUnlocks: boolean("achievementUnlocks").default(true).notNull(),
  newContests: boolean("newContests").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NotificationPreferences = typeof notificationPreferences.$inferSelect;
export type InsertNotificationPreferences = typeof notificationPreferences.$inferInsert;

/**
 * User acquisition tracking - captures UTM parameters and campaign data
 */
export const userAcquisition = mysqlTable("userAcquisition", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  
  utmSource: varchar("utmSource", { length: 255 }),
  utmMedium: varchar("utmMedium", { length: 255 }),
  utmCampaign: varchar("utmCampaign", { length: 255 }),
  utmTerm: varchar("utmTerm", { length: 255 }),
  utmContent: varchar("utmContent", { length: 255 }),
  
  gclid: varchar("gclid", { length: 255 }),
  matchType: varchar("matchType", { length: 50 }),
  device: varchar("device", { length: 50 }),
  network: varchar("network", { length: 50 }),
  adPosition: varchar("adPosition", { length: 50 }),
  
  referrer: text("referrer"),
  landingPage: text("landingPage"),
  userAgent: text("userAgent"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserAcquisition = typeof userAcquisition.$inferSelect;
export type InsertUserAcquisition = typeof userAcquisition.$inferInsert;

/**
 * Conversion events tracking
 */
export const conversionEvents = mysqlTable("conversionEvents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  eventType: varchar("eventType", { length: 100 }).notNull(),
  eventValue: int("eventValue").default(0),
  
  utmSource: varchar("utmSource", { length: 255 }),
  utmMedium: varchar("utmMedium", { length: 255 }),
  utmCampaign: varchar("utmCampaign", { length: 255 }),
  
  metadata: text("metadata"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ConversionEvent = typeof conversionEvents.$inferSelect;
export type InsertConversionEvent = typeof conversionEvents.$inferInsert;

// Traffic tracking tables
export { pageViews, sessions } from "./traffic-schema";
export type { PageView, InsertPageView, Session, InsertSession } from "./traffic-schema";

// Comprehensive visitor tracking (272 data points)
export { visitorTracking } from "./comprehensive-tracking-schema";
export type { VisitorTracking, InsertVisitorTracking } from "./comprehensive-tracking-schema";
