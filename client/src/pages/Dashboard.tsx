import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Trophy, Users, Target, TrendingUp, Plus, Loader2, Award, BarChart3, Star, Zap } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const { data: teams, isLoading: teamsLoading } = trpc.teams.myTeams.useQuery();
  const { data: entries, isLoading: entriesLoading } = trpc.contests.myEntries.useQuery();
  const { data: achievements, isLoading: achievementsLoading } = trpc.achievements.myAchievements.useQuery();
  const { data: upcomingContests } = trpc.contests.upcoming.useQuery();

  // Redirect to verification if not verified
  if (user && !user.isVerified) {
    setLocation("/verify");
    return null;
  }

  if (teamsLoading || entriesLoading || achievementsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate statistics
  const totalTeams = teams?.length || 0;
  const totalContests = entries?.length || 0;
  const totalAchievements = achievements?.length || 0;
  const currentLevel = user?.level || 1;
  const currentPoints = user?.totalPoints || 0;
  const pointsToNextLevel = (currentLevel * 1000) - currentPoints;
  const levelProgress = ((currentPoints % 1000) / 1000) * 100;

  // Calculate win/loss ratio (simplified)
  const wins = entries?.filter(e => e.entry.rank && e.entry.rank <= 3).length || 0;
  const losses = entries?.filter(e => e.entry.rank && e.entry.rank > 3).length || 0;
  const winRate = totalContests > 0 ? ((wins / totalContests) * 100).toFixed(1) : "0.0";

  // Mock data for performance chart (in real app, fetch from API)
  const performanceData = [
    { week: "Week 1", points: 120 },
    { week: "Week 2", points: 180 },
    { week: "Week 3", points: 150 },
    { week: "Week 4", points: 220 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="text-sm text-muted-foreground">Ready to dominate fantasy cricket?</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total Points</div>
                <div className="text-2xl font-bold text-gradient">{currentPoints}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Level</div>
                <div className="text-2xl font-bold text-primary">{currentLevel}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 pt-20 lg:pt-8">
        {/* Level Progress */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="font-semibold">Level {currentLevel}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {pointsToNextLevel} points to Level {currentLevel + 1}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full transition-all"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">My Teams</p>
                  <p className="text-3xl font-bold">{totalTeams}</p>
                </div>
                <Users className="h-10 w-10 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contests Joined</p>
                  <p className="text-3xl font-bold">{totalContests}</p>
                </div>
                <Target className="h-10 w-10 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Achievements</p>
                  <p className="text-3xl font-bold">{totalAchievements}</p>
                </div>
                <Award className="h-10 w-10 text-yellow-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
                  <p className="text-3xl font-bold">{winRate}%</p>
                </div>
                <Trophy className="h-10 w-10 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{data.week}</span>
                    <span className="text-sm font-bold">{data.points} pts</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${(data.points / 250) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/create-team">
                <Button className="w-full h-20 text-lg" size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Create New Team
                </Button>
              </Link>
              <Link href="/contests">
                <Button variant="outline" className="w-full h-20 text-lg" size="lg">
                  <Trophy className="mr-2 h-5 w-5" />
                  View Contests
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant="outline" className="w-full h-20 text-lg" size="lg">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Leaderboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Personalized Recommendations */}
        <Card className="mb-8 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Recommendations for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {totalTeams === 0 && (
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium">Create your first team</p>
                    <p className="text-sm text-muted-foreground">
                      Start by building a team with 11 players to join contests
                    </p>
                  </div>
                </div>
              )}
              {totalContests === 0 && totalTeams > 0 && (
                <div className="flex items-start gap-3 p-3 bg-blue-500/5 rounded-lg">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <p className="font-medium">Join your first contest</p>
                    <p className="text-sm text-muted-foreground">
                      You have {totalTeams} team{totalTeams > 1 ? "s" : ""} ready. Join a contest to compete!
                    </p>
                  </div>
                </div>
              )}
              {currentLevel < 5 && (
                <div className="flex items-start gap-3 p-3 bg-purple-500/5 rounded-lg">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                  <div>
                    <p className="font-medium">Level up faster</p>
                    <p className="text-sm text-muted-foreground">
                      Earn {pointsToNextLevel} more points to reach Level {currentLevel + 1}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* My Teams */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Teams</CardTitle>
          </CardHeader>
          <CardContent>
            {teams && teams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                  <Card key={team.id} className="hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-2">{team.name}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Points</span>
                        <span className="font-bold">{team.totalPoints || 0}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground mb-4">You haven't created any teams yet</p>
                <Link href="/create-team">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Team
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Contests */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Contests</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingContests && upcomingContests.length > 0 ? (
              <div className="space-y-4">
                {upcomingContests.slice(0, 3).map((contest) => (
                  <Card key={contest.id} className="hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold mb-1">{contest.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(contest.startTime).toLocaleDateString()}
                          </p>
                        </div>
                        <Link href={`/contests/${contest.id}`}>
                          <Button size="sm">View Details</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No upcoming contests</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
