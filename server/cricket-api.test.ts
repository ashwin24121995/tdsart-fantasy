import { describe, expect, it } from "vitest";
import { getCurrentMatches } from "./cricket-api";

describe("Cricket API Integration", () => {
  it("should fetch current matches with valid API key", async () => {
    const result = await getCurrentMatches();
    
    // Should return an object with live and upcoming arrays
    expect(result).toHaveProperty("live");
    expect(result).toHaveProperty("upcoming");
    expect(Array.isArray(result.live)).toBe(true);
    expect(Array.isArray(result.upcoming)).toBe(true);
    
    // Should have at least some matches (live or upcoming)
    const totalMatches = result.live.length + result.upcoming.length;
    expect(totalMatches).toBeGreaterThan(0);
    
    // If there are live matches, verify structure
    if (result.live.length > 0) {
      const match = result.live[0];
      expect(match).toHaveProperty("id");
      expect(match).toHaveProperty("name");
      expect(match).toHaveProperty("teams");
      expect(match.teams.length).toBeGreaterThanOrEqual(2);
      expect(match).toHaveProperty("score");
    }
    
    // If there are upcoming matches, verify structure
    if (result.upcoming.length > 0) {
      const match = result.upcoming[0];
      expect(match).toHaveProperty("id");
      expect(match).toHaveProperty("name");
      expect(match).toHaveProperty("dateTimeGMT");
      expect(match).toHaveProperty("teams");
      expect(match.teams.length).toBeGreaterThanOrEqual(2);
    }
  }, 15000); // 15 second timeout for API call
});
