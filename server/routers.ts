import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";

// Restricted states in India where fantasy sports are not permitted
const RESTRICTED_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Odisha",
  "Telangana",
  "Nagaland",
  "Sikkim"
];

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    
    verifyUser: protectedProcedure
      .input(z.object({
        dateOfBirth: z.string(),
        state: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Check age (must be 18+)
        const dob = new Date(input.dateOfBirth);
        const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        
        if (age < 18) {
          throw new Error("You must be 18 years or older to use this platform");
        }
        
        // Check if state is restricted
        if (RESTRICTED_STATES.includes(input.state)) {
          throw new Error(`This platform is not available in ${input.state} due to legal restrictions`);
        }
        
        // Update user profile
        await db.updateUserProfile(ctx.user.id, {
          dateOfBirth: dob,
          state: input.state,
          isVerified: true,
        });
        
        return { success: true, verified: true };
      }),
  }),
  
  sports: router({
    list: publicProcedure.query(async () => {
      return db.getAllSports();
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return db.getSportBySlug(input.slug);
      }),
  }),
  
  players: router({
    listBySport: publicProcedure
      .input(z.object({ sportId: z.number() }))
      .query(async ({ input }) => {
        return db.getPlayersBySport(input.sportId);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getPlayerById(input.id);
      }),
  }),
  
  teams: router({
    myTeams: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserTeams(ctx.user.id);
    }),
    
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const team = await db.getTeamById(input.id);
        if (!team) throw new Error("Team not found");
        
        const players = await db.getTeamPlayers(input.id);
        return { team, players };
      }),
    
    create: protectedProcedure
      .input(z.object({
        sportId: z.number(),
        name: z.string().min(1).max(255),
        logo: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user.isVerified) {
          throw new Error("Please complete age and location verification first");
        }
        
        await db.createFantasyTeam({
          userId: ctx.user.id,
          sportId: input.sportId,
          name: input.name,
          logo: input.logo,
        });
        
        return { success: true };
      }),
    
    delete: protectedProcedure
      .input(z.object({ teamId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteFantasyTeam(input.teamId, ctx.user.id);
        return { success: true };
      }),
    
    addPlayer: protectedProcedure
      .input(z.object({
        teamId: z.number(),
        playerId: z.number(),
        position: z.string().optional(),
        isCaptain: z.boolean().optional(),
        isViceCaptain: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.addPlayerToTeam({
          teamId: input.teamId,
          playerId: input.playerId,
          position: input.position,
          isCaptain: input.isCaptain || false,
          isViceCaptain: input.isViceCaptain || false,
        });
        
        return { success: true };
      }),
    
    removePlayer: protectedProcedure
      .input(z.object({
        teamId: z.number(),
        playerId: z.number(),
      }))
      .mutation(async ({ input }) => {
        await db.removePlayerFromTeam(input.teamId, input.playerId);
        return { success: true };
      }),
  }),
  
  contests: router({
    list: publicProcedure.query(async () => {
      return db.getAllContests();
    }),
    
    upcoming: publicProcedure.query(async () => {
      return db.getUpcomingContests();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getContestById(input.id);
      }),
    
    leaderboard: publicProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ input }) => {
        return db.getContestLeaderboard(input.contestId);
      }),
    
    join: protectedProcedure
      .input(z.object({
        contestId: z.number(),
        teamId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user.isVerified) {
          throw new Error("Please complete age and location verification first");
        }
        
        const contest = await db.getContestById(input.contestId);
        if (!contest) throw new Error("Contest not found");
        
        if (contest.status !== "upcoming") {
          throw new Error("Contest is not open for joining");
        }
        
        if (contest.maxParticipants > 0 && contest.currentParticipants >= contest.maxParticipants) {
          throw new Error("Contest is full");
        }
        
        await db.joinContest({
          contestId: input.contestId,
          userId: ctx.user.id,
          teamId: input.teamId,
        });
        
        return { success: true };
      }),
    
    myEntries: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserContestEntries(ctx.user.id);
    }),
  }),
  
  achievements: router({
    list: publicProcedure.query(async () => {
      return db.getAllAchievements();
    }),
    
    myAchievements: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserAchievements(ctx.user.id);
    }),
  }),
  
  leaderboard: router({
    global: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return db.getGlobalLeaderboard(input.limit);
      }),
  }),
  
  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return ctx.user;
    }),
    
    update: protectedProcedure
      .input(z.object({
        name: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateUserProfile(ctx.user.id, input);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
