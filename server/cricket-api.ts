// Cricket API Service using CricketData.org

const API_KEY = process.env.CRICKET_API_KEY || "";
const BASE_URL = "https://api.cricketdata.org";

export interface LiveMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  score: Array<{
    r: number; // runs
    w: number; // wickets
    o: number; // overs
    inning: string;
  }>;
}

export interface UpcomingMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
}

// Mock fallback data
const mockLiveMatches: LiveMatch[] = [
  {
    id: "1",
    name: "Mumbai Indians vs Chennai Super Kings",
    matchType: "T20",
    status: "Live",
    venue: "Wankhede Stadium, Mumbai",
    date: new Date().toISOString(),
    dateTimeGMT: new Date().toISOString(),
    teams: ["Mumbai Indians", "Chennai Super Kings"],
    score: [
      { r: 165, w: 4, o: 18.2, inning: "Mumbai Indians Inning 1" },
      { r: 142, w: 6, o: 15.4, inning: "Chennai Super Kings Inning 1" },
    ],
  },
];

const mockUpcomingMatches: UpcomingMatch[] = [
  {
    id: "3",
    name: "Delhi Capitals vs Punjab Kings",
    matchType: "T20",
    status: "Upcoming",
    venue: "Arun Jaitley Stadium, Delhi",
    date: new Date(Date.now() + 86400000).toISOString(),
    dateTimeGMT: new Date(Date.now() + 86400000).toISOString(),
    teams: ["Delhi Capitals", "Punjab Kings"],
  },
];

export async function getCurrentMatches(): Promise<LiveMatch[]> {
  try {
    // Add 5-second timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${BASE_URL}/cpl/v1/current_matches/?apikey=${API_KEY}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    
    // Transform API response to our format
    if (data.data && Array.isArray(data.data)) {
      return data.data.map((match: any) => ({
        id: match.id || match.unique_id,
        name: match.name || `${match["team-a"]} vs ${match["team-b"]}`,
        matchType: match.type || "T20",
        status: match.status || "Live",
        venue: match.venue || "",
        date: match.date || match.dateTimeGMT,
        dateTimeGMT: match.dateTimeGMT || match.date,
        teams: [match["team-a"] || "", match["team-b"] || ""],
        score: match.score || [],
      }));
    }
    
    return mockLiveMatches;
  } catch (error) {
    console.error("Cricket API error:", error);
    return mockLiveMatches;
  }
}

export async function getUpcomingMatches(): Promise<UpcomingMatch[]> {
  try {
    // Add 5-second timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${BASE_URL}/cpl/v1/upcoming_matches/?apikey=${API_KEY}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    
    if (data.data && Array.isArray(data.data)) {
      return data.data.map((match: any) => ({
        id: match.id || match.unique_id,
        name: match.name || `${match["team-a"]} vs ${match["team-b"]}`,
        matchType: match.type || "T20",
        status: "Upcoming",
        venue: match.venue || "",
        date: match.date || match.dateTimeGMT,
        dateTimeGMT: match.dateTimeGMT || match.date,
        teams: [match["team-a"] || "", match["team-b"] || ""],
      }));
    }
    
    return mockUpcomingMatches;
  } catch (error) {
    console.error("Cricket API error:", error);
    return mockUpcomingMatches;
  }
}

export async function getMatchInfo(matchId: string): Promise<LiveMatch | null> {
  try {
    // Add 5-second timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${BASE_URL}/cpl/v1/match_info/?apikey=${API_KEY}&id=${matchId}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    
    if (data.data) {
      const match = data.data;
      return {
        id: match.id || match.unique_id,
        name: match.name || `${match["team-a"]} vs ${match["team-b"]}`,
        matchType: match.type || "T20",
        status: match.status || "Live",
        venue: match.venue || "",
        date: match.date || match.dateTimeGMT,
        dateTimeGMT: match.dateTimeGMT || match.date,
        teams: [match["team-a"] || "", match["team-b"] || ""],
        score: match.score || [],
      };
    }
    
    return null;
  } catch (error) {
    console.error("Cricket API error:", error);
    return null;
  }
}
