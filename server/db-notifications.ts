import { eq, and } from "drizzle-orm";
import { getDb } from "./db";
import { 
  pushSubscriptions, 
  notificationPreferences,
  InsertPushSubscription,
  InsertNotificationPreferences,
  PushSubscription,
  NotificationPreferences
} from "../drizzle/schema";

/**
 * Save or update push subscription for a user
 */
export async function savePushSubscription(subscription: InsertPushSubscription): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot save push subscription: database not available");
    return;
  }

  try {
    // Check if subscription already exists
    const existing = await db
      .select()
      .from(pushSubscriptions)
      .where(
        and(
          eq(pushSubscriptions.userId, subscription.userId),
          eq(pushSubscriptions.endpoint, subscription.endpoint)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Update existing subscription
      await db
        .update(pushSubscriptions)
        .set({
          p256dh: subscription.p256dh,
          auth: subscription.auth,
          isActive: true,
          updatedAt: new Date(),
        })
        .where(eq(pushSubscriptions.id, existing[0].id));
    } else {
      // Insert new subscription
      await db.insert(pushSubscriptions).values(subscription);
    }
  } catch (error) {
    console.error("[Database] Failed to save push subscription:", error);
    throw error;
  }
}

/**
 * Get all active push subscriptions for a user
 */
export async function getUserPushSubscriptions(userId: number): Promise<PushSubscription[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get push subscriptions: database not available");
    return [];
  }

  try {
    return await db
      .select()
      .from(pushSubscriptions)
      .where(
        and(
          eq(pushSubscriptions.userId, userId),
          eq(pushSubscriptions.isActive, true)
        )
      );
  } catch (error) {
    console.error("[Database] Failed to get push subscriptions:", error);
    return [];
  }
}

/**
 * Deactivate a push subscription
 */
export async function deactivatePushSubscription(endpoint: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot deactivate push subscription: database not available");
    return;
  }

  try {
    await db
      .update(pushSubscriptions)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(pushSubscriptions.endpoint, endpoint));
  } catch (error) {
    console.error("[Database] Failed to deactivate push subscription:", error);
    throw error;
  }
}

/**
 * Get or create notification preferences for a user
 */
export async function getNotificationPreferences(userId: number): Promise<NotificationPreferences> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db
      .select()
      .from(notificationPreferences)
      .where(eq(notificationPreferences.userId, userId))
      .limit(1);

    if (result.length > 0) {
      return result[0];
    }

    // Create default preferences
    const defaultPrefs: InsertNotificationPreferences = {
      userId,
      contestStart: true,
      matchBeginning: true,
      rankChanges: true,
      achievementUnlocks: true,
      newContests: true,
    };

    await db.insert(notificationPreferences).values(defaultPrefs);

    const created = await db
      .select()
      .from(notificationPreferences)
      .where(eq(notificationPreferences.userId, userId))
      .limit(1);

    return created[0];
  } catch (error) {
    console.error("[Database] Failed to get notification preferences:", error);
    throw error;
  }
}

/**
 * Update notification preferences for a user
 */
export async function updateNotificationPreferences(
  userId: number,
  preferences: Partial<Omit<NotificationPreferences, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db
      .update(notificationPreferences)
      .set({ ...preferences, updatedAt: new Date() })
      .where(eq(notificationPreferences.userId, userId));
  } catch (error) {
    console.error("[Database] Failed to update notification preferences:", error);
    throw error;
  }
}

/**
 * Get all users who should receive a specific notification type
 */
export async function getUsersForNotificationType(
  notificationType: keyof Omit<NotificationPreferences, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<number[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get users for notification: database not available");
    return [];
  }

  try {
    const result = await db
      .select({ userId: notificationPreferences.userId })
      .from(notificationPreferences)
      .where(eq(notificationPreferences[notificationType], true));

    return result.map(r => r.userId);
  } catch (error) {
    console.error("[Database] Failed to get users for notification type:", error);
    return [];
  }
}
