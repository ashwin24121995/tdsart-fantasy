import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import {
  saveUserAcquisition,
  getUserAcquisition,
  trackConversionEvent,
  getUserConversionEvents,
  getCampaignPerformance,
  getAcquisitionSourcesBreakdown,
} from "../db-analytics";

export const analyticsRouter = router({
  /**
   * Save user acquisition data (called on registration)
   */
  saveAcquisition: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
        utmTerm: z.string().optional(),
        utmContent: z.string().optional(),
        gclid: z.string().optional(),
        matchType: z.string().optional(),
        device: z.string().optional(),
        network: z.string().optional(),
        adPosition: z.string().optional(),
        referrer: z.string().optional(),
        landingPage: z.string().optional(),
        userAgent: z.string().optional(),
        ipAddress: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await saveUserAcquisition(input);
      return { success: true };
    }),

  /**
   * Get user's acquisition data
   */
  getUserAcquisition: protectedProcedure.query(async ({ ctx }) => {
    return await getUserAcquisition(ctx.user.id);
  }),

  /**
   * Track a conversion event
   */
  trackEvent: protectedProcedure
    .input(
      z.object({
        eventType: z.enum(["registration", "team_created", "contest_joined", "achievement_earned"]),
        eventValue: z.number().optional(),
        metadata: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await trackConversionEvent({
        userId: ctx.user.id,
        eventType: input.eventType,
        eventValue: input.eventValue || 0,
        metadata: input.metadata,
      });
      return { success: true };
    }),

  /**
   * Get user's conversion events
   */
  getUserEvents: protectedProcedure.query(async ({ ctx }) => {
    return await getUserConversionEvents(ctx.user.id);
  }),

  /**
   * Get campaign performance (admin only)
   */
  getCampaignPerformance: protectedProcedure
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const startDate = input.startDate ? new Date(input.startDate) : undefined;
      const endDate = input.endDate ? new Date(input.endDate) : undefined;
      
      return await getCampaignPerformance(startDate, endDate);
    }),

  /**
   * Get acquisition sources breakdown
   */
  getSourcesBreakdown: protectedProcedure.query(async () => {
    return await getAcquisitionSourcesBreakdown();
  }),
});
