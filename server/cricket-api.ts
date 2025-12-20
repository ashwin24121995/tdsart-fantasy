// Cricket API Service using CricketData.org
// API Key: afb22ee0-add7-48b4-af1d-bdf319c03c9d (Lifetime Free)

const API_KEY = process.env.CRICKET_API_KEY || "afb22ee0-add7-48b4-af1d-bdf319c03c9d";
const BASE_URL = "https://api.cricapi.com/v1";

export interface LiveMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: Array<{
    name: string;
    shortname: string;
    img: string;
  }>;
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
  teamInfo?: Array<{
    name: string;
    shortname: string;
    img: string;
  }>;
}

interface CricketAPIMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: Array<{
    name: string;
    shortname: string;
    img: string;
  }>;
  score: Array<{
    r: number;
    w: number;
    o: number;
    inning: string;
  }>;
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}

/**
 * Fetch all current matches from Cricket Data API
 * Returns matches that are either upcoming or live (NOT completed)
 */
export async function getCurrentMatches(): Promise<{
  live: LiveMatch[];
  upcoming: UpcomingMatch[];
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${BASE_URL}/currentMatches?apikey=${API_KEY}&offset=0`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      console.warn("Cricket API returned no data");
      return { live: [], upcoming: [] };
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const liveMatches: LiveMatch[] = [];
    const upcomingMatches: UpcomingMatch[] = [];
    
    data.data.forEach((match: CricketAPIMatch) => {
      // Skip completed matches
      if (match.matchEnded === true) {
        return;
      }
      
      const matchDate = new Date(match.dateTimeGMT || match.date);
      
      // Live matches: started but not ended
      if (match.matchStarted === true && match.matchEnded === false) {
        liveMatches.push({
          id: match.id,
          name: match.name,
          matchType: match.matchType,
          status: match.status,
          venue: match.venue,
          date: match.date,
          dateTimeGMT: match.dateTimeGMT,
          teams: match.teams,
          teamInfo: match.teamInfo,
          score: match.score || [],
        });
      }
      // Upcoming matches: not started AND date is today or future
      else if (match.matchStarted === false && matchDate >= today) {
        upcomingMatches.push({
          id: match.id,
          name: match.name,
          matchType: match.matchType,
          status: match.status,
          venue: match.venue,
          date: match.date,
          dateTimeGMT: match.dateTimeGMT,
          teams: match.teams,
          teamInfo: match.teamInfo,
        });
      }
    });
    
    return { live: liveMatches, upcoming: upcomingMatches };
  } catch (error) {
    console.error("Cricket API error:", error);
    // Return empty arrays instead of mock data to show real API status
    return { live: [], upcoming: [] };
  }
}

/**
 * Get detailed match information by ID
 */
export async function getMatchInfo(matchId: string): Promise<LiveMatch | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`${BASE_URL}/match_info?apikey=${API_KEY}&id=${matchId}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.data) {
      const match = data.data;
      return {
        id: match.id,
        name: match.name,
        matchType: match.matchType,
        status: match.status,
        venue: match.venue,
        date: match.date,
        dateTimeGMT: match.dateTimeGMT,
        teams: match.teams,
        teamInfo: match.teamInfo,
        score: match.score || [],
      };
    }
    
    return null;
  } catch (error) {
    console.error("Cricket API error:", error);
    return null;
  }
}
