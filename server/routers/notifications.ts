import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import {
  savePushSubscription,
  getUserPushSubscriptions,
  getNotificationPreferences,
  updateNotificationPreferences,
  deactivatePushSubscription,
} from "../db-notifications";
import { getVapidPublicKey, isPushConfigured } from "../services/pushNotifications";
import { sendTestNotification } from "../services/notificationTriggers";

export const notificationsRouter = router({
  /**
   * Get VAPID public key for client-side subscription
   */
  getVapidPublicKey: protectedProcedure.query(() => {
    if (!isPushConfigured()) {
      throw new Error("Push notifications are not configured");
    }
    return { publicKey: getVapidPublicKey() };
  }),

  /**
   * Check if push notifications are configured
   */
  isConfigured: protectedProcedure.query(() => {
    return { configured: isPushConfigured() };
  }),

  /**
   * Subscribe to push notifications
   */
  subscribe: protectedProcedure
    .input(
      z.object({
        endpoint: z.string(),
        p256dh: z.string(),
        auth: z.string(),
        userAgent: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await savePushSubscription({
        userId: ctx.user.id,
        endpoint: input.endpoint,
        p256dh: input.p256dh,
        auth: input.auth,
        userAgent: input.userAgent,
        isActive: true,
      });

      return { success: true };
    }),

  /**
   * Unsubscribe from push notifications
   */
  unsubscribe: protectedProcedure
    .input(
      z.object({
        endpoint: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await deactivatePushSubscription(input.endpoint);
      return { success: true };
    }),

  /**
   * Get user's push subscriptions
   */
  getSubscriptions: protectedProcedure.query(async ({ ctx }) => {
    const subscriptions = await getUserPushSubscriptions(ctx.user.id);
    return subscriptions;
  }),

  /**
   * Get notification preferences
   */
  getPreferences: protectedProcedure.query(async ({ ctx }) => {
    const preferences = await getNotificationPreferences(ctx.user.id);
    return preferences;
  }),

  /**
   * Update notification preferences
   */
  updatePreferences: protectedProcedure
    .input(
      z.object({
        contestStart: z.boolean().optional(),
        matchBeginning: z.boolean().optional(),
        rankChanges: z.boolean().optional(),
        achievementUnlocks: z.boolean().optional(),
        newContests: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await updateNotificationPreferences(ctx.user.id, input);
      return { success: true };
    }),

  /**
   * Send test notification
   */
  sendTest: protectedProcedure.mutation(async ({ ctx }) => {
    const success = await sendTestNotification(ctx.user.id);
    return { success };
  }),
});
