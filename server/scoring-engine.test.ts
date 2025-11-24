import { describe, expect, it } from "vitest";
import { calculatePlayerPoints, SCORING_RULES } from "./scoring-engine";

describe("Scoring Engine", () => {
  describe("calculatePlayerPoints", () => {
    it("should calculate batting points correctly", () => {
      const performance = {
        runs: 50,
        ballsFaced: 30,
        fours: 4,
        sixes: 2,
      };

      const points = calculatePlayerPoints(performance);
      
      // 50 runs (50 * 1) + 4 fours (4 * 1) + 2 sixes (2 * 2) + fifty bonus (8)
      // = 50 + 4 + 4 + 8 = 66
      expect(points).toBe(66);
    });

    it("should apply century bonus", () => {
      const performance = {
        runs: 100,
        ballsFaced: 60,
        fours: 8,
        sixes: 4,
      };

      const points = calculatePlayerPoints(performance);
      
      // 100 runs + 8 fours + 8 (sixes) + 16 (century bonus)
      // = 100 + 8 + 8 + 16 = 132
      expect(points).toBe(132);
    });

    it("should apply duck penalty", () => {
      const performance = {
        runs: 0,
        ballsFaced: 5,
      };

      const points = calculatePlayerPoints(performance);
      
      // 0 runs + duck penalty (-2) = -2
      expect(points).toBe(-2);
    });

    it("should calculate bowling points correctly", () => {
      const performance = {
        wickets: 3,
        maidenOvers: 2,
      };

      const points = calculatePlayerPoints(performance);
      
      // 3 wickets (3 * 25) + 2 maiden overs (2 * 8) + 3 wicket bonus (4)
      // = 75 + 16 + 4 = 95
      expect(points).toBe(95);
    });

    it("should apply five wicket bonus", () => {
      const performance = {
        wickets: 5,
      };

      const points = calculatePlayerPoints(performance);
      
      // 5 wickets (5 * 25) + 5 wicket bonus (16)
      // = 125 + 16 = 141
      expect(points).toBe(141);
    });

    it("should calculate fielding points correctly", () => {
      const performance = {
        catches: 2,
        stumpings: 1,
        runOuts: 1,
      };

      const points = calculatePlayerPoints(performance);
      
      // 2 catches (2 * 8) + 1 stumping (12) + 1 run out (6)
      // = 16 + 12 + 6 = 34
      expect(points).toBe(34);
    });

    it("should calculate all-rounder performance", () => {
      const performance = {
        runs: 50,
        fours: 4,
        sixes: 1,
        wickets: 2,
        catches: 1,
      };

      const points = calculatePlayerPoints(performance);
      
      // 50 runs + 4 fours + 2 (six) + 8 (fifty bonus) + 50 (2 wickets) + 8 (catch)
      // = 50 + 4 + 2 + 8 + 50 + 8 = 122
      expect(points).toBe(122);
    });

    it("should handle zero performance", () => {
      const performance = {};

      const points = calculatePlayerPoints(performance);
      
      expect(points).toBe(0);
    });
  });

  describe("SCORING_RULES", () => {
    it("should have correct captain multiplier", () => {
      expect(SCORING_RULES.captainMultiplier).toBe(2);
    });

    it("should have correct vice-captain multiplier", () => {
      expect(SCORING_RULES.viceCaptainMultiplier).toBe(1.5);
    });

    it("should have correct wicket points", () => {
      expect(SCORING_RULES.bowling.wicket).toBe(25);
    });

    it("should have correct catch points", () => {
      expect(SCORING_RULES.fielding.catch).toBe(8);
    });
  });
});
