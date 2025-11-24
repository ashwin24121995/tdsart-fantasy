import webpush from 'web-push';
import { getUserPushSubscriptions, deactivatePushSubscription } from '../db-notifications';

// VAPID keys for web push (these should be generated once and stored as env variables)
// For now, we'll generate them on startup if not provided
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@tdsartfantasy.com';

// Initialize web-push with VAPID keys
if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    VAPID_SUBJECT,
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );
} else {
  console.warn('[Push Notifications] VAPID keys not configured. Push notifications will not work.');
  console.warn('[Push Notifications] Generate keys with: npx web-push generate-vapid-keys');
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: {
    url?: string;
    [key: string]: any;
  };
}

/**
 * Send push notification to a specific user
 */
export async function sendPushNotification(
  userId: number,
  payload: NotificationPayload
): Promise<{ success: boolean; sent: number; failed: number }> {
  try {
    const subscriptions = await getUserPushSubscriptions(userId);
    
    if (subscriptions.length === 0) {
      console.log(`[Push Notifications] No active subscriptions for user ${userId}`);
      return { success: true, sent: 0, failed: 0 };
    }

    const defaultPayload: NotificationPayload = {
      title: 'TDSART Fantasy',
      body: payload.body,
      icon: payload.icon || '/logo-full.png',
      badge: payload.badge || '/logo.png',
      tag: payload.tag || 'default',
      data: payload.data || {},
    };

    const mergedPayload = { ...defaultPayload, ...payload };

    let sent = 0;
    let failed = 0;

    // Send to all user's subscriptions
    await Promise.all(
      subscriptions.map(async (subscription) => {
        try {
          const pushSubscription = {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
          };

          await webpush.sendNotification(
            pushSubscription,
            JSON.stringify(mergedPayload)
          );
          
          sent++;
          console.log(`[Push Notifications] Sent to user ${userId}, endpoint: ${subscription.endpoint.substring(0, 50)}...`);
        } catch (error: any) {
          failed++;
          console.error(`[Push Notifications] Failed to send to user ${userId}:`, error.message);
          
          // If subscription is invalid (410 Gone or 404 Not Found), deactivate it
          if (error.statusCode === 410 || error.statusCode === 404) {
            console.log(`[Push Notifications] Deactivating invalid subscription for user ${userId}`);
            await deactivatePushSubscription(subscription.endpoint);
          }
        }
      })
    );

    return { success: sent > 0, sent, failed };
  } catch (error) {
    console.error('[Push Notifications] Error sending notification:', error);
    return { success: false, sent: 0, failed: 0 };
  }
}

/**
 * Send push notification to multiple users
 */
export async function sendPushNotificationToUsers(
  userIds: number[],
  payload: NotificationPayload
): Promise<{ totalSent: number; totalFailed: number }> {
  let totalSent = 0;
  let totalFailed = 0;

  await Promise.all(
    userIds.map(async (userId) => {
      const result = await sendPushNotification(userId, payload);
      totalSent += result.sent;
      totalFailed += result.failed;
    })
  );

  console.log(`[Push Notifications] Batch send complete: ${totalSent} sent, ${totalFailed} failed`);
  return { totalSent, totalFailed };
}

/**
 * Get VAPID public key for client-side subscription
 */
export function getVapidPublicKey(): string {
  return VAPID_PUBLIC_KEY;
}

/**
 * Check if push notifications are configured
 */
export function isPushConfigured(): boolean {
  return !!(VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY);
}
