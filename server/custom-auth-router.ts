import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./_core/trpc";
import * as authHelpers from "./auth";
import * as dbAuth from "./db-auth";
import { getUserById } from "./db";

export const customAuthRouter = router({
  /**
   * Register a new user with email and password
   */
  register: publicProcedure
    .input(z.object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      name: z.string().min(2, "Name must be at least 2 characters"),
    }))
    .mutation(async ({ input }) => {
      // Validate email format
      if (!authHelpers.isValidEmail(input.email)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email format",
        });
      }

      // Validate password strength
      if (!authHelpers.isValidPassword(input.password)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password must be at least 8 characters with uppercase, lowercase, and number",
        });
      }

      // Check if user already exists
      const existingUser = await dbAuth.getUserByEmail(input.email);
      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already registered",
        });
      }

      // Hash password
      const hashedPassword = await authHelpers.hashPassword(input.password);

      // Generate verification token
      const verificationToken = authHelpers.generateVerificationToken();

      // Create user
      const userId = await dbAuth.createUser({
        email: input.email,
        password: hashedPassword,
        name: input.name,
        verificationToken,
      });

      // Generate JWT token
      const token = authHelpers.generateToken({
        userId,
        email: input.email,
      });

      return {
        success: true,
        token,
        user: {
          id: userId,
          email: input.email,
          name: input.name,
          emailVerified: false,
        },
      };
    }),

  /**
   * Login with email and password
   */
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      // Find user by email
      const user = await dbAuth.getUserByEmail(input.email);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Check if user has a password (might be OAuth user)
      if (!user.password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This account uses social login. Please login with your social provider.",
        });
      }

      // Verify password
      const isValidPassword = await authHelpers.comparePassword(
        input.password,
        user.password
      );

      if (!isValidPassword) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Update last sign in
      await dbAuth.updateLastSignIn(user.id);

      // Generate JWT token
      const token = authHelpers.generateToken({
        userId: user.id,
        email: user.email,
      });

      return {
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          isVerified: user.isVerified,
          totalPoints: user.totalPoints,
          level: user.level,
        },
      };
    }),

  /**
   * Get current user from JWT token
   */
  me: publicProcedure
    .input(z.object({
      token: z.string(),
    }))
    .query(async ({ input }) => {
      const payload = authHelpers.verifyToken(input.token);
      if (!payload) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid or expired token",
        });
      }

      const user = await getUserById(payload.userId);
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
        isVerified: user.isVerified,
        totalPoints: user.totalPoints,
        level: user.level,
        role: user.role,
        dateOfBirth: user.dateOfBirth,
        state: user.state,
      };
    }),

  /**
   * Request password reset
   */
  requestPasswordReset: publicProcedure
    .input(z.object({
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      const user = await dbAuth.getUserByEmail(input.email);
      if (!user) {
        // Don't reveal if email exists
        return { success: true, message: "If the email exists, a reset link has been sent" };
      }

      const resetToken = authHelpers.generateVerificationToken();
      const expires = new Date();
      expires.setHours(expires.getHours() + 1); // Token expires in 1 hour

      await dbAuth.setPasswordResetToken(input.email, resetToken, expires);

      // TODO: Send email with reset link
      // For now, return the token (in production, send via email)
      return {
        success: true,
        message: "Password reset link sent to your email",
        resetToken, // Remove this in production
      };
    }),

  /**
   * Reset password with token
   */
  resetPassword: publicProcedure
    .input(z.object({
      token: z.string(),
      newPassword: z.string().min(8),
    }))
    .mutation(async ({ input }) => {
      if (!authHelpers.isValidPassword(input.newPassword)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password must be at least 8 characters with uppercase, lowercase, and number",
        });
      }

      const hashedPassword = await authHelpers.hashPassword(input.newPassword);

      try {
        await dbAuth.resetPassword(input.token, hashedPassword);
        return { success: true, message: "Password reset successfully" };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error instanceof Error ? error.message : "Invalid or expired reset token",
        });
      }
    }),
});
