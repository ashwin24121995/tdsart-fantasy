import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Loader2, Trophy, Medal, Award, TrendingUp } from "lucide-react";

type TimeFilter = "daily" | "weekly" | "all";

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: leaderboard, isLoading } = trpc.leaderboard.global.useQuery({ limit: limit * page });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return null;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500">1st</Badge>;
    if (rank === 2) return <Badge className="bg-gray-400">2nd</Badge>;
    if (rank === 3) return <Badge className="bg-amber-600">3rd</Badge>;
    return <Badge variant="secondary">#{rank}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="h-10 w-10 text-primary" />
            Global Leaderboard
          </h1>
          <p className="text-muted-foreground">Top fantasy cricket players worldwide</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Button
                variant={timeFilter === "daily" ? "default" : "outline"}
                onClick={() => setTimeFilter("daily")}
              >
                Daily
              </Button>
              <Button
                variant={timeFilter === "weekly" ? "default" : "outline"}
                onClick={() => setTimeFilter("weekly")}
              >
                Weekly
              </Button>
              <Button
                variant={timeFilter === "all" ? "default" : "outline"}
                onClick={() => setTimeFilter("all")}
              >
                All Time
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Podium */}
        {leaderboard && leaderboard.length >= 3 && (
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <Card className="border-gray-400/50">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-3">
                  <Medal className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="font-bold text-lg mb-1">{leaderboard[1]?.name}</h3>
                <p className="text-2xl font-bold text-gray-400 mb-2">2nd</p>
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-semibold">{leaderboard[1]?.totalPoints || 0}</span>
                </div>
                <p className="text-sm text-muted-foreground">Level {leaderboard[1]?.level || 1}</p>
              </CardContent>
            </Card>

            {/* 1st Place */}
            <Card className="border-yellow-500/50 md:-mt-4">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-3">
                  <Trophy className="h-16 w-16 text-yellow-500" />
                </div>
                <h3 className="font-bold text-xl mb-1">{leaderboard[0]?.name}</h3>
                <p className="text-3xl font-bold text-yellow-500 mb-2">1st</p>
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold">{leaderboard[0]?.totalPoints || 0}</span>
                </div>
                <p className="text-sm text-muted-foreground">Level {leaderboard[0]?.level || 1}</p>
              </CardContent>
            </Card>

            {/* 3rd Place */}
            <Card className="border-amber-600/50">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-3">
                  <Medal className="h-12 w-12 text-amber-600" />
                </div>
                <h3 className="font-bold text-lg mb-1">{leaderboard[2]?.name}</h3>
                <p className="text-2xl font-bold text-amber-600 mb-2">3rd</p>
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-semibold">{leaderboard[2]?.totalPoints || 0}</span>
                </div>
                <p className="text-sm text-muted-foreground">Level {leaderboard[2]?.level || 1}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboard && leaderboard.length > 0 ? (
                <>
                  {leaderboard.map((user, index) => {
                    const rank = index + 1;
                    return (
                      <Card key={user.id} className={rank <= 3 ? "border-primary/30" : ""}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="flex items-center justify-center w-12">
                                {getRankIcon(rank) || (
                                  <span className="text-2xl font-bold text-muted-foreground">
                                    {rank}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-lg">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">Level {user.level || 1}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 justify-end mb-1">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-2xl font-bold">{user.totalPoints || 0}</span>
                              </div>
                              {getRankBadge(rank)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  
                  {/* Load More */}
                  {leaderboard.length >= limit * page && (
                    <div className="text-center pt-4">
                      <Button onClick={() => setPage(page + 1)}>
                        Load More
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No rankings available yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
