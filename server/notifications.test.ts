import { describe, expect, it } from "vitest";
import { getVapidPublicKey, isPushConfigured } from "./services/pushNotifications";

describe("Push Notifications Configuration", () => {
  it("should have VAPID keys configured", () => {
    const isConfigured = isPushConfigured();
    expect(isConfigured).toBe(true);
  });

  it("should return valid VAPID public key", () => {
    const publicKey = getVapidPublicKey();
    expect(publicKey).toBeTruthy();
    expect(typeof publicKey).toBe("string");
    expect(publicKey.length).toBeGreaterThan(0);
  });

  it("VAPID public key should be base64url encoded", () => {
    const publicKey = getVapidPublicKey();
    // VAPID keys are base64url encoded and should be 87-88 characters
    expect(publicKey.length).toBeGreaterThanOrEqual(80);
    // Should only contain base64url characters
    expect(publicKey).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});
