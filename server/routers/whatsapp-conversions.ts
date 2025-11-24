import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import * as db from "../db";

export const whatsappConversionsRouter = router({
  /**
   * Track a WhatsApp button click (public - no auth required)
   */
  trackClick: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      utmSource: z.string().optional(),
      utmMedium: z.string().optional(),
      utmCampaign: z.string().optional(),
      utmContent: z.string().optional(),
      utmTerm: z.string().optional(),
      deviceType: z.string().optional(),
      browserName: z.string().optional(),
      pageUrl: z.string().optional(),
      referrer: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Get IP address from request
      const ipAddress = 
        (ctx.req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        (ctx.req.headers['x-real-ip'] as string) ||
        ctx.req.socket?.remoteAddress ||
        'unknown';
      
      // For now, we'll use basic data. In production, you might want to enrich with geolocation
      const conversionData = {
        sessionId: input.sessionId,
        utmSource: input.utmSource || null,
        utmMedium: input.utmMedium || null,
        utmCampaign: input.utmCampaign || null,
        utmContent: input.utmContent || null,
        utmTerm: input.utmTerm || null,
        ipAddress,
        deviceType: input.deviceType || null,
        browserName: input.browserName || null,
        pageUrl: input.pageUrl || null,
        referrer: input.referrer || null,
        adType: 'fairplay_targeted',
      };
      
      return await db.recordWhatsAppConversion(conversionData);
    }),

  /**
   * Get conversion statistics (admin only)
   */
  getStats: protectedProcedure
    .input(z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    }).optional())
    .query(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      
      return await db.getWhatsAppConversionStats(input);
    }),

  /**
   * Get all conversions with filters (admin only)
   */
  getConversions: protectedProcedure
    .input(z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      utmSource: z.string().optional(),
      deviceType: z.string().optional(),
    }).optional())
    .query(async ({ input, ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      
      return await db.getWhatsAppConversions(input);
    }),
});
