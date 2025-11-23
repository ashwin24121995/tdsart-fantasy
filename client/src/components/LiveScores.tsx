import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export function LiveScores() {
  const { data: liveMatches, isLoading: liveLoading } = trpc.cricket.currentMatches.useQuery();
  const { data: upcomingMatches, isLoading: upcomingLoading } = trpc.cricket.upcomingMatches.useQuery();

  if (liveLoading || upcomingLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Live Matches */}
      {liveMatches && liveMatches.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live Matches
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {liveMatches.map((match) => (
              <Card key={match.id} className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{match.name}</CardTitle>
                    <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{match.venue}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {match.score && match.score.length > 0 ? (
                      match.score.map((score, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="font-medium">{score.inning}</span>
                          <span className="text-lg font-bold">
                            {score.r}/{score.w} ({score.o} ov)
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Match starting soon...</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Matches */}
      {upcomingMatches && upcomingMatches.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-4">Upcoming Matches</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {upcomingMatches.slice(0, 6).map((match) => (
              <Card key={match.id}>
                <CardHeader>
                  <CardTitle className="text-base">{match.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{match.venue}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{match.matchType}</Badge>
                      <Badge variant="secondary">
                        {new Date(match.date).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(match.date).toLocaleTimeString('en-IN', {
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

      {(!liveMatches || liveMatches.length === 0) && (!upcomingMatches || upcomingMatches.length === 0) && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No matches available at the moment</p>
        </div>
      )}
    </div>
  );
}
