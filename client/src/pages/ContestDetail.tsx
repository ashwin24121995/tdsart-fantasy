import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  TrendingUp,
  ChevronLeft,
  Award,
  Target,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { toast } from "sonner";

export default function ContestDetail() {
  const [, params] = useRoute("/contests/:id");
  const contestId = params?.id ? parseInt(params.id) : null;
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");

  const { data: contest, isLoading } = trpc.contests.getById.useQuery(
    { id: contestId! },
    { enabled: !!contestId }
  );

  const { data: userTeams } = trpc.teams.getUserTeams.useQuery(undefined, {
    enabled: !!user,
  });

  const { data: participants } = trpc.contests.getParticipants.useQuery(
    { contestId: contestId! },
    { enabled: !!contestId }
  );

  const trackEventMutation = trpc.analytics.trackEvent.useMutation();
  
  const joinMutation = trpc.contests.join.useMutation({
    onSuccess: async () => {
      // Track contest join event
      try {
        await trackEventMutation.mutateAsync({
          eventType: "contest_joined",
          metadata: JSON.stringify({ contestId, contestName: contest?.name }),
        });
      } catch (error) {
        console.error('[Analytics] Failed to track contest join:', error);
      }
      
      toast.success("Successfully joined the contest!");
      setShowJoinDialog(false);
      setSelectedTeamId("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleJoinContest = () => {
    if (!selectedTeamId) {
      toast.error("Please select a team");
      return;
    }

    joinMutation.mutate({
      contestId: contestId!,
      teamId: parseInt(selectedTeamId),
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="text-muted-foreground mb-6">
            Please login to view contest details
          </p>
          <Link href="/login">
            <Button>Login Now</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="h-96 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Contest Not Found</h2>
          <Link href="/contests">
            <Button>Back to Contests</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const isContestFull = contest.currentParticipants >= contest.maxParticipants;
  const hasUserJoined = participants?.some((p: any) => p.userId === user.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-orange-500/20 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <Link href="/contests">
            <Button variant="ghost" className="mb-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Contests
            </Button>
          </Link>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-10 w-10 text-primary" />
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    contest.status === "upcoming"
                      ? "bg-blue-500/20 text-blue-400"
                      : contest.status === "live"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {contest.status}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {contest.name}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {contest.description}
              </p>
            </div>

            {!hasUserJoined && contest.status === "upcoming" && !isContestFull && (
              <Button
                size="lg"
                onClick={() => setShowJoinDialog(true)}
                className="hidden md:block"
              >
                Join Contest
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contest Stats */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Contest Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Participants
                    </div>
                    <div className="text-2xl font-bold">
                      {contest.currentParticipants} / {contest.maxParticipants}
                    </div>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-orange-500"
                        style={{
                          width: `${
                            (contest.currentParticipants /
                              contest.maxParticipants) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Start Time
                    </div>
                    <div className="text-xl font-bold">
                      {new Date(contest.startTime).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(contest.startTime).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      End Time
                    </div>
                    <div className="text-xl font-bold">
                      {new Date(contest.endTime).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(contest.endTime).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {contest.prizes && (
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Prizes
                      </div>
                      <div className="text-xl font-bold text-primary">
                        {contest.prizes}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Rules */}
            {contest.rules && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Contest Rules</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {contest.rules}
                  </p>
                </div>
              </Card>
            )}

            {/* Leaderboard Preview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Participants</h2>
                <span className="text-sm text-muted-foreground">
                  {participants?.length || 0} joined
                </span>
              </div>

              {participants && participants.length > 0 ? (
                <div className="space-y-3">
                  {participants.slice(0, 10).map((participant: any, index: number) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between p-4 bg-card/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">
                            {participant.user?.name || "Anonymous"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Team: {participant.team?.name || "N/A"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          {participant.points || 0} pts
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No participants yet. Be the first to join!</p>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Card */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Join This Contest</h3>

              {hasUserJoined ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="font-semibold mb-2">You've Joined!</p>
                  <p className="text-sm text-muted-foreground">
                    Good luck in the contest!
                  </p>
                </div>
              ) : isContestFull ? (
                <div className="text-center py-6">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="font-semibold mb-2">Contest Full</p>
                  <p className="text-sm text-muted-foreground">
                    This contest has reached maximum participants
                  </p>
                </div>
              ) : contest.status !== "upcoming" ? (
                <div className="text-center py-6">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="font-semibold mb-2">Contest {contest.status}</p>
                  <p className="text-sm text-muted-foreground">
                    You can only join upcoming contests
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>100% Free to Join</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Skill-Based Competition</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Real-Time Updates</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowJoinDialog(true)}
                  >
                    Join Contest
                  </Button>

                  {(!userTeams || userTeams.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      You need to create a team first
                      <Link href="/create-team">
                        <Button variant="link" className="p-0 h-auto ml-1">
                          Create Team
                        </Button>
                      </Link>
                    </p>
                  )}
                </>
              )}
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Spots
                  </span>
                  <span className="font-semibold">
                    {contest.maxParticipants}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Spots Left
                  </span>
                  <span className="font-semibold text-primary">
                    {contest.maxParticipants - contest.currentParticipants}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="font-semibold capitalize">
                    {contest.status}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Join Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Contest</DialogTitle>
            <DialogDescription>
              Select a team to join this contest
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Select Your Team
              </label>
              <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a team" />
                </SelectTrigger>
                <SelectContent>
                  {userTeams && userTeams.length > 0 ? (
                    userTeams.map((team: any) => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {team.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No teams available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {(!userTeams || userTeams.length === 0) && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  You don't have any teams yet.
                </p>
                <Link href="/create-team">
                  <Button variant="outline" size="sm" className="w-full">
                    Create Your First Team
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowJoinDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleJoinContest}
              disabled={!selectedTeamId || joinMutation.isPending}
              className="flex-1"
            >
              {joinMutation.isPending ? "Joining..." : "Join Contest"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
