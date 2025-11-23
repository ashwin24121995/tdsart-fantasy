import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Trophy, Users, Target, TrendingUp, Plus, Loader2 } from "lucide-react";
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
                <div className="text-2xl font-bold text-gradient">{user?.totalPoints || 0}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Level</div>
                <div className="text-2xl font-bold text-primary">{user?.level || 1}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card border-border hover:card-glow transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="secondary">{teams?.length || 0}</Badge>
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">My Teams</h3>
            <p className="text-2xl font-bold">{teams?.length || 0}</p>
          </Card>

          <Card className="p-6 bg-card border-border hover:card-glow transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <Badge variant="secondary">{entries?.length || 0}</Badge>
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">Contests Joined</h3>
            <p className="text-2xl font-bold">{entries?.length || 0}</p>
          </Card>

          <Card className="p-6 bg-card border-border hover:card-glow transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <Badge variant="secondary">{achievements?.length || 0}</Badge>
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">Achievements</h3>
            <p className="text-2xl font-bold">{achievements?.length || 0}</p>
          </Card>

          <Card className="p-6 bg-card border-border hover:card-glow transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="secondary">#{user?.level || 1}</Badge>
            </div>
            <h3 className="text-sm text-muted-foreground mb-1">Global Rank</h3>
            <p className="text-2xl font-bold">-</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-border">
            <h3 className="text-xl font-bold mb-2">Create Your Team</h3>
            <p className="text-muted-foreground mb-4">
              Build your dream cricket team and start competing
            </p>
            <Button className="btn-gradient" asChild>
              <Link href="/teams/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Team
              </Link>
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/20 to-accent/20 border-border">
            <h3 className="text-xl font-bold mb-2">Join Contests</h3>
            <p className="text-muted-foreground mb-4">
              Compete with thousands of cricket fans
            </p>
            <Button className="btn-gradient" asChild>
              <Link href="/contests">
                <Trophy className="mr-2 h-4 w-4" />
                View Contests
              </Link>
            </Button>
          </Card>
        </div>

        {/* My Teams */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">My Teams</h2>
            <Button variant="outline" asChild>
              <Link href="/teams">View All</Link>
            </Button>
          </div>

          {teams && teams.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {teams.slice(0, 3).map((team) => (
                <Link key={team.id} href={`/teams/${team.id}`}>
                  <Card className="p-6 bg-card border-border hover:card-glow transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">{team.name}</h3>
                      <Badge variant="secondary">{team.totalPoints} pts</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Created {new Date(team.createdAt).toLocaleDateString()}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-card/50 border-dashed">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No teams yet</h3>
              <p className="text-muted-foreground mb-4">Create your first fantasy cricket team to get started</p>
              <Button className="btn-gradient" asChild>
                <Link href="/teams/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Team
                </Link>
              </Button>
            </Card>
          )}
        </div>

        {/* Upcoming Contests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Upcoming Contests</h2>
            <Button variant="outline" asChild>
              <Link href="/contests">View All</Link>
            </Button>
          </div>

          {upcomingContests && upcomingContests.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingContests.slice(0, 2).map((contest) => (
                <Card key={contest.id} className="p-6 bg-card border-border hover:card-glow transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{contest.name}</h3>
                      <p className="text-sm text-muted-foreground">{contest.description}</p>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-primary/50">
                      {contest.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Participants</div>
                      <div className="font-semibold">
                        {contest.currentParticipants}
                        {contest.maxParticipants > 0 && ` / ${contest.maxParticipants}`}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Starts</div>
                      <div className="font-semibold">
                        {new Date(contest.startTime).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full btn-gradient" asChild>
                    <Link href={`/contests/${contest.id}`}>View Contest</Link>
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-card/50 border-dashed">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No upcoming contests</h3>
              <p className="text-muted-foreground">Check back soon for new contests!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
