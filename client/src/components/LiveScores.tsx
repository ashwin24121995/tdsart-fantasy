import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export function LiveScores() {
  // getCurrentMatches now returns { live: [], upcoming: [] }
  const { data, isLoading, error } = trpc.cricket.currentMatches.useQuery();

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
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live Matches
          </h3>
          <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
            {liveMatches.map((match) => (
              <Card key={match.id} className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base md:text-lg">{match.name}</CardTitle>
                    <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{match.venue}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {match.score && match.score.length > 0 ? (
                      match.score.map((score, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="font-medium text-sm">{score.inning}</span>
                          <span className="text-lg font-bold">
                            {score.r}/{score.w} ({score.o} ov)
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">{match.status || "Match starting soon..."}</p>
                    )}
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
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Upcoming Matches</h3>
          <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingMatches.slice(0, 6).map((match) => (
              <Card key={match.id}>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">{match.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{match.venue}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{match.matchType}</Badge>
                      <Badge variant="secondary">
                        {new Date(match.dateTimeGMT || match.date).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(match.dateTimeGMT || match.date).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {liveMatches.length === 0 && upcomingMatches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No matches available at the moment</p>
          <p className="text-sm text-muted-foreground mt-2">Check back later for live and upcoming cricket matches</p>
        </div>
      )}
    </div>
  );
}
