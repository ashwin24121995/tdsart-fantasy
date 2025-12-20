import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, MapPin, Calendar, Trophy } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function MatchDetails() {
  const [, params] = useRoute("/match/:id");
  const matchId = params?.id || "";

  // Auto-refresh every 30 seconds for live matches
  const { data: match, isLoading, error } = trpc.cricket.matchInfo.useQuery(
    { matchId },
    {
      enabled: !!matchId,
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-12" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-orange-500 bg-clip-text text-transparent">
                  {APP_TITLE}
                </span>
              </div>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </header>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-12" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-orange-500 bg-clip-text text-transparent">
                  {APP_TITLE}
                </span>
              </div>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-destructive text-lg">Match not found or failed to load</p>
          <Link href="/">
            <Button className="mt-4">Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isLive = match.status?.toLowerCase().includes("live") || 
                  (match.score && match.score.length > 0 && !match.status?.toLowerCase().includes("match ended"));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-12 w-12" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-orange-500 bg-clip-text text-transparent">
                {APP_TITLE}
              </span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Match Header */}
      <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">{match.name}</h1>
            {isLive && (
              <Badge variant="destructive" className="animate-pulse text-sm md:text-base px-3 py-1">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                LIVE
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{match.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(match.dateTimeGMT || match.date).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <Badge variant="outline">{match.matchType}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Match Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Scorecard */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Scorecard</span>
                  {isLive && <span className="text-sm font-normal text-muted-foreground">Updates every 30s</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {match.score && match.score.length > 0 ? (
                  <div className="space-y-6">
                    {match.score.map((inning, idx) => (
                      <div key={idx} className="border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg">{inning.inning}</h3>
                          <div className="text-right">
                            <div className="text-2xl font-bold">
                              {inning.r}/{inning.w}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {inning.o} overs
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Runs</div>
                            <div className="font-semibold text-lg">{inning.r}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Wickets</div>
                            <div className="font-semibold text-lg">{inning.w}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Run Rate</div>
                            <div className="font-semibold text-lg">
                              {inning.o > 0 ? (inning.r / inning.o).toFixed(2) : '0.00'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>{match.status || "Match not started yet"}</p>
                    <p className="text-sm mt-2">Scorecard will appear once the match begins</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Match Status */}
            <Card>
              <CardHeader>
                <CardTitle>Match Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{match.status || "Upcoming"}</p>
              </CardContent>
            </Card>
          </div>

          {/* Teams Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {match.teams.map((team, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      {match.teamInfo && match.teamInfo[idx]?.img && (
                        <img 
                          src={match.teamInfo[idx].img} 
                          alt={team}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-semibold">{team}</div>
                        {match.teamInfo && match.teamInfo[idx]?.shortname && (
                          <div className="text-sm text-muted-foreground">
                            {match.teamInfo[idx].shortname}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Match Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-muted-foreground">Match Type</div>
                    <div className="font-semibold">{match.matchType}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Venue</div>
                    <div className="font-semibold">{match.venue}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Date & Time</div>
                    <div className="font-semibold">
                      {new Date(match.dateTimeGMT || match.date).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
