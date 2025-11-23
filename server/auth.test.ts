import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(overrides?: Partial<AuthenticatedUser>): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    dateOfBirth: null,
    state: null,
    isVerified: false,
    totalPoints: 0,
    level: 1,
    achievements: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    ...overrides,
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("auth.verifyUser", () => {
  it("should reject users under 18 years old", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Date of birth for a 17-year-old
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 17);

    await expect(
      caller.auth.verifyUser({
        dateOfBirth: dob.toISOString().split("T")[0],
        state: "Maharashtra",
      })
    ).rejects.toThrow("You must be 18 years or older");
  });

  it("should reject users from restricted states", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Date of birth for a 25-year-old
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);

    await expect(
      caller.auth.verifyUser({
        dateOfBirth: dob.toISOString().split("T")[0],
        state: "Andhra Pradesh",
      })
    ).rejects.toThrow("This platform is not available in Andhra Pradesh");
  });

  it("should accept valid users from permitted states", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Date of birth for a 25-year-old
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);

    const result = await caller.auth.verifyUser({
      dateOfBirth: dob.toISOString().split("T")[0],
      state: "Maharashtra",
    });

    expect(result).toEqual({ success: true, verified: true });
  });

  it("should reject all restricted states", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 25);

    const restrictedStates = [
      "Andhra Pradesh",
      "Assam",
      "Odisha",
      "Telangana",
      "Nagaland",
      "Sikkim",
    ];

    for (const state of restrictedStates) {
      await expect(
        caller.auth.verifyUser({
          dateOfBirth: dob.toISOString().split("T")[0],
          state,
        })
      ).rejects.toThrow(`This platform is not available in ${state}`);
    }
  });
});

describe("auth.me", () => {
  it("should return current user when authenticated", async () => {
    const { ctx } = createAuthContext({ name: "John Doe" });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeDefined();
    expect(result?.name).toBe("John Doe");
  });

  it("should return undefined when not authenticated", async () => {
    const ctx: TrpcContext = {
      user: undefined,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeUndefined();
  });
});
