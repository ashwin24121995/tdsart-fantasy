/**
 * Notification triggers for various platform events
 */

import { sendPushNotification, sendPushNotificationToUsers } from "./pushNotifications";
import { getUsersForNotificationType } from "../db-notifications";
import { getContestById, getContestParticipants } from "../db";

/**
 * Send notification when a contest is about to start
 */
export async function notifyContestStart(contestId: number): Promise<void> {
  try {
    const contest = await getContestById(contestId);
    if (!contest) {
      console.warn(`[Notifications] Contest ${contestId} not found`);
      return;
    }

    const participants = await getContestParticipants(contestId);
    const userIds = participants.map(p => p.userId);

    // Filter users who have enabled contest start notifications
    const enabledUsers = await getUsersForNotificationType("contestStart");
    const targetUsers = userIds.filter(id => enabledUsers.includes(id));

    if (targetUsers.length === 0) {
      console.log(`[Notifications] No users to notify for contest ${contestId}`);
      return;
    }

    await sendPushNotificationToUsers(targetUsers, {
      title: "Contest Starting Soon! 🏏",
      body: `${contest.name} is about to begin. Get ready!`,
      tag: `contest-start-${contestId}`,
      data: {
        url: `/contests/${contestId}`,
        type: "contest_start",
        contestId: contestId.toString(),
      },
    });

    console.log(`[Notifications] Notified ${targetUsers.length} users about contest ${contestId} start`);
  } catch (error) {
    console.error(`[Notifications] Error notifying contest start:`, error);
  }
}

/**
 * Send notification when a match begins
 */
export async function notifyMatchBeginning(matchId: string, matchName: string): Promise<void> {
  try {
    // Get all users who have enabled match beginning notifications
    const enabledUsers = await getUsersForNotificationType("matchBeginning");

    if (enabledUsers.length === 0) {
      console.log(`[Notifications] No users to notify for match ${matchId}`);
      return;
    }

    await sendPushNotificationToUsers(enabledUsers, {
      title: "Match Started! 🏏",
      body: `${matchName} has begun. Check your team's performance!`,
      tag: `match-start-${matchId}`,
      data: {
        url: "/dashboard",
        type: "match_start",
        matchId,
      },
    });

    console.log(`[Notifications] Notified ${enabledUsers.length} users about match ${matchId} start`);
  } catch (error) {
    console.error(`[Notifications] Error notifying match start:`, error);
  }
}

/**
 * Send notification when user's rank changes significantly
 */
export async function notifyRankChange(
  userId: number,
  contestId: number,
  oldRank: number,
  newRank: number
): Promise<void> {
  try {
    // Only notify for significant rank changes (improvement of 5+ positions)
    const rankDifference = oldRank - newRank;
    if (rankDifference < 5) {
      return;
    }

    const contest = await getContestById(contestId);
    if (!contest) {
      return;
    }

    await sendPushNotification(userId, {
      title: "Rank Update! 📈",
      body: `You moved up ${rankDifference} positions in ${contest.name}! Now ranked #${newRank}`,
      tag: `rank-change-${contestId}`,
      data: {
        url: `/contests/${contestId}`,
        type: "rank_change",
        contestId: contestId.toString(),
        oldRank: oldRank.toString(),
        newRank: newRank.toString(),
      },
    });

    console.log(`[Notifications] Notified user ${userId} about rank change in contest ${contestId}`);
  } catch (error) {
    console.error(`[Notifications] Error notifying rank change:`, error);
  }
}

/**
 * Send notification when user unlocks an achievement
 */
export async function notifyAchievementUnlock(
  userId: number,
  achievementName: string,
  achievementDescription: string
): Promise<void> {
  try {
    await sendPushNotification(userId, {
      title: "Achievement Unlocked! 🏆",
      body: `${achievementName}: ${achievementDescription}`,
      tag: `achievement-${achievementName.toLowerCase().replace(/\s+/g, "-")}`,
      data: {
        url: "/profile",
        type: "achievement_unlock",
        achievementName,
      },
    });

    console.log(`[Notifications] Notified user ${userId} about achievement: ${achievementName}`);
  } catch (error) {
    console.error(`[Notifications] Error notifying achievement unlock:`, error);
  }
}

/**
 * Send notification when new contests are available
 */
export async function notifyNewContest(contestId: number): Promise<void> {
  try {
    const contest = await getContestById(contestId);
    if (!contest) {
      console.warn(`[Notifications] Contest ${contestId} not found`);
      return;
    }

    // Get all users who have enabled new contest notifications
    const enabledUsers = await getUsersForNotificationType("newContests");

    if (enabledUsers.length === 0) {
      console.log(`[Notifications] No users to notify for new contest ${contestId}`);
      return;
    }

    await sendPushNotificationToUsers(enabledUsers, {
      title: "New Contest Available! 🎯",
      body: `${contest.name} is now open for registration. Join now!`,
      tag: `new-contest-${contestId}`,
      data: {
        url: `/contests/${contestId}`,
        type: "new_contest",
        contestId: contestId.toString(),
      },
    });

    console.log(`[Notifications] Notified ${enabledUsers.length} users about new contest ${contestId}`);
  } catch (error) {
    console.error(`[Notifications] Error notifying new contest:`, error);
  }
}

/**
 * Send test notification to a user
 */
export async function sendTestNotification(userId: number): Promise<boolean> {
  try {
    const result = await sendPushNotification(userId, {
      title: "Test Notification 🔔",
      body: "Push notifications are working! You'll receive updates about contests, matches, and achievements.",
      tag: "test-notification",
      data: {
        url: "/notifications",
        type: "test",
      },
    });

    return result.success;
  } catch (error) {
    console.error(`[Notifications] Error sending test notification:`, error);
    return false;
  }
}
