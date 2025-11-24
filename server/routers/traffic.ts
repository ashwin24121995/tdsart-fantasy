import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import * as dbTraffic from "../db-traffic";
import { TRPCError } from "@trpc/server";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const trafficRouter = router({
  /**
   * Track a page view (public - called from client)
   */
  trackPageView: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      path: z.string(),
      referrer: z.string().optional(),
      userAgent: z.string().optional(),
      deviceType: z.string().optional(),
      browser: z.string().optional(),
      utmSource: z.string().optional(),
      utmMedium: z.string().optional(),
      utmCampaign: z.string().optional(),
      utmTerm: z.string().optional(),
      utmContent: z.string().optional(),
      gclid: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      await dbTraffic.trackPageView({
        ...input,
        userId: ctx.user?.id,
        ipAddress: ctx.req.ip || ctx.req.headers["x-forwarded-for"] as string || null,
      });

      // Update session
      await dbTraffic.upsertSession(input.sessionId, {
        userId: ctx.user?.id,
        entryPage: input.path,
        exitPage: input.path,
        utmSource: input.utmSource,
        utmMedium: input.utmMedium,
        utmCampaign: input.utmCampaign,
        gclid: input.gclid,
        deviceType: input.deviceType,
        browser: input.browser,
      });

      return { success: true };
    }),

  /**
   * Get traffic overview stats (admin only)
   */
  getStats: adminProcedure
    .input(z.object({
      startDate: z.string(),
      endDate: z.string(),
    }))
    .query(async ({ input }) => {
      const startDate = new Date(input.startDate);
      const endDate = new Date(input.endDate);

      const stats = await dbTraffic.getTrafficStats(startDate, endDate);
      return stats;
    }),

  /**
   * Get organic traffic breakdown (admin only)
   */
  getOrganicTraffic: adminProcedure
    .input(z.object({
      startDate: z.string(),
      endDate: z.string(),
    }))
    .query(async ({ input }) => {
      const startDate = new Date(input.startDate);
      const endDate = new Date(input.endDate);

      const traffic = await dbTraffic.getOrganicTraffic(startDate, endDate);
      return traffic;
    }),

  /**
   * Get Google Ads traffic breakdown (admin only)
   */
  getGoogleAdsTraffic: adminProcedure
    .input(z.object({
      startDate: z.string(),
      endDate: z.string(),
    }))
    .query(async ({ input }) => {
      const startDate = new Date(input.startDate);
      const endDate = new Date(input.endDate);

      const traffic = await dbTraffic.getGoogleAdsTraffic(startDate, endDate);
      return traffic;
    }),

  /**
   * Get top pages (admin only)
   */
  getTopPages: adminProcedure
    .input(z.object({
      startDate: z.string(),
      endDate: z.string(),
      limit: z.number().default(10),
    }))
    .query(async ({ input }) => {
      const startDate = new Date(input.startDate);
      const endDate = new Date(input.endDate);

      const pages = await dbTraffic.getTopPages(startDate, endDate, input.limit);
      return pages;
    }),

  /**
   * Get traffic by device (admin only)
   */
  getTrafficByDevice: adminProcedure
    .input(z.object({
      startDate: z.string(),
      endDate: z.string(),
    }))
    .query(async ({ input }) => {
      const startDate = new Date(input.startDate);
      const endDate = new Date(input.endDate);

      const devices = await dbTraffic.getTrafficByDevice(startDate, endDate);
      return devices;
    }),

  /**
   * Get traffic trend (admin only)
   */
  getTrafficTrend: adminProcedure
    .input(z.object({
      startDate: z.string(),
      endDate: z.string(),
    }))
    .query(async ({ input }) => {
      const startDate = new Date(input.startDate);
      const endDate = new Date(input.endDate);

      const trend = await dbTraffic.getTrafficTrend(startDate, endDate);
      return trend;
    }),
});
