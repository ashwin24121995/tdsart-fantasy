import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, unique } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
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
