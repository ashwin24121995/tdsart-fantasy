import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronRight, Trophy, Calendar, MapPin } from "lucide-react";
import { Link } from "wouter";

export function LiveScores() {
  // getCurrentMatches now returns { live: [], upcoming: [] }
  // Auto-refresh every 30 seconds to keep live scores updated
  const { data, isLoading, error } = trpc.cricket.currentMatches.useQuery(undefined, {
    refetchInterval: 30000, // 30 seconds
    refetchIntervalInBackground: true, // Continue refreshing even when tab is not active
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load matches. Please try again later.</p>
      </div>
    );
  }

  const liveMatches = data?.live || [];
  const upcomingMatches = data?.upcoming || [];

  return (
    <div className="space-y-8">
      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
              Live Matches
            </h3>
            <Badge variant="destructive" className="animate-pulse px-3 py-1">
              {liveMatches.length} LIVE
            </Badge>
          </div>
          <div className="grid gap-4 md:gap-6">
            {liveMatches.map((match) => (
              <Card key={match.id} className="border-2 border-red-500/30 bg-gradient-to-br from-red-500/10 via-transparent to-purple-500/5 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Match Header */}
                  <div className="bg-gradient-to-r from-red-500/20 to-purple-500/20 px-4 md:px-6 py-3 border-b border-border/50">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="destructive" className="animate-pulse">
                          <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                          LIVE
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Trophy className="h-3 w-3" />
                          {match.matchType}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {match.venue}
                      </p>
                    </div>
                  </div>

                  {/* Teams & Scores */}
                  <div className="p-4 md:p-6">
                    <h4 className="font-semibold text-lg mb-4 text-center">{match.name}</h4>
                    
                    {match.score && match.score.length > 0 ? (
                      <div className="space-y-4">
                        {match.score.map((score, idx) => {
                          const teamIndex = match.teams.findIndex(team => 
                            score.inning.includes(team) || score.inning.includes(match.teamInfo?.[idx]?.shortname || '')
                          );
                          const teamInfo = match.teamInfo?.[teamIndex >= 0 ? teamIndex : idx];
                          
                          return (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                              <div className="flex items-center gap-3 flex-1">
                                {teamInfo?.img && (
                                  <img 
                                    src={teamInfo.img} 
                                    alt={score.inning}
                                    className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border-2 border-border"
                                  />
                                )}
                                <div>
                                  <div className="font-semibold text-base md:text-lg">{score.inning}</div>
                                  <div className="text-xs text-muted-foreground">{score.o} overs</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl md:text-3xl font-bold">
                                  {score.r}/{score.w}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  RR: {score.o > 0 ? (score.r / score.o).toFixed(2) : '0.00'}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-lg">{match.status || "Match starting soon..."}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6 flex-wrap">
                      <Link href={`/match/${match.id}`} className="flex-1 min-w-[140px]">
                        <Button className="w-full" variant="default">
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                      <Link href={`/contests?match=${match.id}`} className="flex-1 min-w-[140px]">
                        <Button className="w-full" variant="outline">
                          Join Contest
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl md:text-3xl font-bold">Upcoming Matches</h3>
            <Badge variant="secondary" className="px-3 py-1">
              {upcomingMatches.length} Matches
            </Badge>
          </div>
          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            {upcomingMatches.slice(0, 6).map((match) => (
              <Card key={match.id} className="hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  {/* Match Header */}
                  <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 px-4 md:px-6 py-3 border-b border-border/50">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <Badge variant="outline" className="gap-1">
                        <Trophy className="h-3 w-3" />
                        {match.matchType}
                      </Badge>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(match.dateTimeGMT || match.date).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="p-4 md:p-6">
                    <h4 className="font-semibold text-base mb-4 text-center line-clamp-2">{match.name}</h4>
                    
                    <div className="space-y-3 mb-4">
                      {match.teams.slice(0, 2).map((team, idx) => {
                        const teamInfo = match.teamInfo?.[idx];
                        return (
                          <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                            {teamInfo?.img && (
                              <img 
                                src={teamInfo.img} 
                                alt={team}
                                className="h-10 w-10 rounded-full object-cover border-2 border-border"
                              />
                            )}
                            <div className="flex-1">
                              <div className="font-semibold">{team}</div>
                              {teamInfo?.shortname && (
                                <div className="text-xs text-muted-foreground">{teamInfo.shortname}</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Match Info */}
                    <div className="flex items-center justify-between text-sm mb-4 p-3 rounded-lg bg-muted/20">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{match.venue}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {new Date(match.dateTimeGMT || match.date).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 flex-wrap">
                      <Link href={`/match/${match.id}`} className="flex-1 min-w-[120px]">
                        <Button className="w-full" variant="default" size="sm">
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                      <Link href={`/contests?match=${match.id}`} className="flex-1 min-w-[120px]">
                        <Button className="w-full" variant="outline" size="sm">
                          Create Team
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {liveMatches.length === 0 && upcomingMatches.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Trophy className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg text-muted-foreground font-medium">No matches available at the moment</p>
          <p className="text-sm text-muted-foreground mt-2">Check back later for live and upcoming cricket matches</p>
        </div>
      )}
    </div>
  );
}
