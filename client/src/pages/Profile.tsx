import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Loader2, Trophy, Target, TrendingUp, Award, Users, Calendar } from "lucide-react";
import { useLocation } from "wouter";

export default function Profile() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  
  const { data: myTeams, isLoading: teamsLoading } = trpc.teams.myTeams.useQuery(undefined, {
    enabled: !!user,
  });
  
  const { data: myAchievements, isLoading: achievementsLoading } = trpc.achievements.myAchievements.useQuery(undefined, {
    enabled: !!user,
  });
  
  const { data: myEntries, isLoading: entriesLoading } = trpc.contests.myEntries.useQuery(undefined, {
    enabled: !!user,
  });

  if (!user) {
    setLocation("/login");
    return null;
  }

  const isLoading = teamsLoading || achievementsLoading || entriesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const level = user.level || 1;
  const totalPoints = user.totalPoints || 0;
  const nextLevelPoints = level * 1000;
  const progress = (totalPoints % 1000) / 10;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button onClick={() => setLocation("/dashboard")}>Back to Dashboard</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Target className="h-8 w-8 text-primary" />
                <span className="text-3xl font-bold">{level}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <span className="text-3xl font-bold">{totalPoints}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Teams Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-blue-500" />
                <span className="text-3xl font-bold">{myTeams?.length || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Contests Joined</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <span className="text-3xl font-bold">{myEntries?.length || 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Level Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level {level}</span>
                <span>Level {level + 1}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-primary to-purple-500 h-4 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {nextLevelPoints - (totalPoints % 1000)} points to next level
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {myAchievements && myAchievements.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {myAchievements.map((achievement: any) => (
                  <Card key={achievement.id} className="border-primary/20">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <div className="text-4xl">{achievement.icon || "🏆"}</div>
                        <h3 className="font-bold">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <Badge variant="secondary">{achievement.points} points</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No achievements yet. Keep playing to unlock achievements!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* My Teams */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                My Teams
              </CardTitle>
              <Button onClick={() => setLocation("/create-team")}>Create New Team</Button>
            </div>
          </CardHeader>
          <CardContent>
            {myTeams && myTeams.length > 0 ? (
              <div className="space-y-4">
                {myTeams.map((team: any) => (
                  <Card key={team.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{team.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Created {new Date(team.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total Points</p>
                          <p className="text-2xl font-bold">{team.totalPoints || 0}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="mb-4">You haven't created any teams yet</p>
                <Button onClick={() => setLocation("/create-team")}>Create Your First Team</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contest History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Contest History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {myEntries && myEntries.length > 0 ? (
              <div className="space-y-4">
                {myEntries.map((entry: any) => (
                  <Card key={entry.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold">{entry.contestName || `Contest #${entry.contestId}`}</h3>
                          <p className="text-sm text-muted-foreground">
                            Joined {new Date(entry.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={entry.rank <= 3 ? "default" : "secondary"}>
                            Rank #{entry.rank || "-"}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {entry.points || 0} points
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="mb-4">You haven't joined any contests yet</p>
                <Button onClick={() => setLocation("/contests")}>Browse Contests</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
