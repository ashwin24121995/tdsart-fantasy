import { describe, expect, it } from "vitest";
import * as cricketApi from "./cricket-api";

describe("Cricket API Integration", () => {
  it("should fetch current matches", async () => {
    const matches = await cricketApi.getCurrentMatches();
    
    expect(matches).toBeDefined();
    expect(Array.isArray(matches)).toBe(true);
    
    if (matches.length > 0) {
      const match = matches[0];
      expect(match).toHaveProperty("id");
      expect(match).toHaveProperty("name");
      expect(match).toHaveProperty("teams");
      expect(Array.isArray(match.teams)).toBe(true);
    }
  }, 10000); // 10 second timeout for API call
  
  it("should fetch upcoming matches", async () => {
    const matches = await cricketApi.getUpcomingMatches();
    
    expect(matches).toBeDefined();
    expect(Array.isArray(matches)).toBe(true);
    
    if (matches.length > 0) {
      const match = matches[0];
      expect(match).toHaveProperty("id");
      expect(match).toHaveProperty("name");
      expect(match).toHaveProperty("teams");
    }
  }, 10000);
});
