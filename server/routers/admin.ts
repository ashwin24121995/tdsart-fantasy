import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  getAllUsersWithAcquisition,
  getTrafficOverview,
  getRecentActivity,
  getUserRegistrationTrend,
  getTrafficByState,
  updateUserVerification,
  updateUserRole,
} from "../db-admin";

/**
 * Admin-only procedure - requires user to have admin role
 */
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admin access required",
    });
  }
  return next({ ctx });
});

export const adminRouter = router({
  /**
   * Get all users with their acquisition data
   */
  getAllUsers: adminProcedure
    .input(
      z.object({
        search: z.string().optional(),
        utmSource: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const startDate = input.startDate ? new Date(input.startDate) : undefined;
      const endDate = input.endDate ? new Date(input.endDate) : undefined;

      return await getAllUsersWithAcquisition({
        search: input.search,
        utmSource: input.utmSource,
        startDate,
        endDate,
      });
    }),

  /**
   * Get traffic overview statistics
   */
  getTrafficOverview: adminProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const startDate = input.startDate ? new Date(input.startDate) : undefined;
      const endDate = input.endDate ? new Date(input.endDate) : undefined;

      return await getTrafficOverview(startDate, endDate);
    }),

  /**
   * Get recent activity feed
   */
  getRecentActivity: adminProcedure
    .input(
      z.object({
        limit: z.number().optional().default(50),
      })
    )
    .query(async ({ input }) => {
      return await getRecentActivity(input.limit);
    }),

  /**
   * Get user registration trend
   */
  getRegistrationTrend: adminProcedure.query(async () => {
    return await getUserRegistrationTrend();
  }),

  /**
   * Get traffic by state
   */
  getTrafficByState: adminProcedure.query(async () => {
    return await getTrafficByState();
  }),

  /**
   * Update user verification status
   */
  updateUserVerification: adminProcedure
    .input(
      z.object({
        userId: z.number(),
        isVerified: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      await updateUserVerification(input.userId, input.isVerified);
      return { success: true };
    }),

  /**
   * Update user role
   */
  updateUserRole: adminProcedure
    .input(
      z.object({
        userId: z.number(),
        role: z.enum(["user", "admin"]),
      })
    )
    .mutation(async ({ input }) => {
      await updateUserRole(input.userId, input.role);
      return { success: true };
    }),
});
