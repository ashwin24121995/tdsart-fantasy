import { eq } from "drizzle-orm";
import { users, InsertUser } from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Create a new user with email and password
 */
export async function createUser(userData: {
  email: string;
  password: string;
  name: string;
  verificationToken?: string;
}): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(users).values({
    email: userData.email,
    password: userData.password,
    name: userData.name,
    loginMethod: "email",
    emailVerified: false,
    verificationToken: userData.verificationToken,
    isVerified: false,
  });

  return Number((result as any).insertId);
}

/**
 * Find user by email
 */
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Update user's email verification status
 */
export async function verifyUserEmail(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(users)
    .set({ emailVerified: true, verificationToken: null })
    .where(eq(users.id, userId));
}

/**
 * Set password reset token
 */
export async function setPasswordResetToken(
  email: string,
  token: string,
  expires: Date
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(users)
    .set({ resetPasswordToken: token, resetPasswordExpires: expires })
    .where(eq(users.email, email));
}

/**
 * Reset password using token
 */
export async function resetPassword(token: string, newPassword: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.select().from(users)
    .where(eq(users.resetPasswordToken, token))
    .limit(1);

  if (result.length === 0) {
    throw new Error("Invalid or expired reset token");
  }

  const user = result[0];
  if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
    throw new Error("Reset token has expired");
  }

  await db.update(users)
    .set({
      password: newPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    })
    .where(eq(users.id, user.id));

  return user;
}

/**
 * Update user's last sign in time
 */
export async function updateLastSignIn(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(users)
    .set({ lastSignedIn: new Date() })
    .where(eq(users.id, userId));
}
