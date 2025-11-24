import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Loader2, Search, Trophy, Star, Users } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

type Player = {
  id: number;
  name: string;
  team: string | null;
  position: string | null;
  points: number;
  photo: string | null;
  sportId: number;
  stats: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type SelectedPlayer = Player & {
  role: "player" | "captain" | "vice-captain";
};

export default function CreateTeam() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [teamName, setTeamName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState<string>("all");
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
  
  const { data: players, isLoading } = trpc.players.listBySport.useQuery({ sportId: 1 }); // Cricket sport ID
  const trackEventMutation = trpc.analytics.trackEvent.useMutation();
  
  const createTeamMutation = trpc.teams.create.useMutation({
    onSuccess: async () => {
      // Track team creation event
      try {
        await trackEventMutation.mutateAsync({
          eventType: "team_created",
          metadata: JSON.stringify({ teamName, playerCount: selectedPlayers.length }),
        });
      } catch (error) {
        console.error('[Analytics] Failed to track team creation:', error);
      }
      
      toast.success("Team created successfully!");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create team");
    },
  });

  if (!user) {
    setLocation("/login");
    return null;
  }

  const filteredPlayers = players?.filter((player: Player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (player.team?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesPosition = positionFilter === "all" || player.position === positionFilter;
    return matchesSearch && matchesPosition;
  }) || [];

  // Budget is calculated based on player points (higher points = higher cost)
  const totalCredits = selectedPlayers.reduce((sum, p) => sum + Math.ceil(p.points / 10), 0);
  const remainingCredits = 100 - totalCredits;
  const captain = selectedPlayers.find(p => p.role === "captain");
  const viceCaptain = selectedPlayers.find(p => p.role === "vice-captain");

  const handleSelectPlayer = (player: Player) => {
    if (selectedPlayers.length >= 11) {
      toast.error("You can only select 11 players");
      return;
    }
    
    const playerCost = Math.ceil(player.points / 10);
    if (totalCredits + playerCost > 100) {
      toast.error("Not enough credits remaining");
      return;
    }

    setSelectedPlayers([...selectedPlayers, { ...player, role: "player" }]);
  };

  const handleRemovePlayer = (playerId: number) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
  };

  const handleSetCaptain = (playerId: number) => {
    setSelectedPlayers(selectedPlayers.map(p => ({
      ...p,
      role: p.id === playerId ? "captain" : (p.role === "captain" ? "player" : p.role)
    })));
  };

  const handleSetViceCaptain = (playerId: number) => {
    setSelectedPlayers(selectedPlayers.map(p => ({
      ...p,
      role: p.id === playerId ? "vice-captain" : (p.role === "vice-captain" ? "player" : p.role)
    })));
  };

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }

    if (selectedPlayers.length !== 11) {
      toast.error("Please select exactly 11 players");
      return;
    }

    if (!captain) {
      toast.error("Please select a captain");
      return;
    }

    if (!viceCaptain) {
      toast.error("Please select a vice-captain");
      return;
    }

    // First create the team
    createTeamMutation.mutate({
      sportId: 1, // Cricket
      name: teamName,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create Your Dream Team</h1>
          <p className="text-muted-foreground">Select 11 players within 100 credits budget</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player Selection */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search players..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={positionFilter === "all" ? "default" : "outline"}
                      onClick={() => setPositionFilter("all")}
                      size="sm"
                    >
                      All
                    </Button>
                    <Button
                      variant={positionFilter === "Batsman" ? "default" : "outline"}
                      onClick={() => setPositionFilter("Batsman")}
                      size="sm"
                    >
                      Batsman
                    </Button>
                    <Button
                      variant={positionFilter === "Bowler" ? "default" : "outline"}
                      onClick={() => setPositionFilter("Bowler")}
                      size="sm"
                    >
                      Bowler
                    </Button>
                    <Button
                      variant={positionFilter === "All-rounder" ? "default" : "outline"}
                      onClick={() => setPositionFilter("All-rounder")}
                      size="sm"
                    >
                      All-rounder
                    </Button>
                    <Button
                      variant={positionFilter === "Wicket-keeper" ? "default" : "outline"}
                      onClick={() => setPositionFilter("Wicket-keeper")}
                      size="sm"
                    >
                      WK
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Player List */}
            <div className="space-y-2">
              {filteredPlayers.map((player: Player) => {
                const isSelected = selectedPlayers.some(p => p.id === player.id);
                return (
                  <Card key={player.id} className={isSelected ? "border-primary" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div>
                              <h3 className="font-bold">{player.name}</h3>
                              <p className="text-sm text-muted-foreground">{player.team}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="secondary">{player.position}</Badge>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Credits</p>
                            <p className="font-bold">{Math.ceil(player.points / 10)}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => isSelected ? handleRemovePlayer(player.id) : handleSelectPlayer(player)}
                            variant={isSelected ? "destructive" : "default"}
                          >
                            {isSelected ? "Remove" : "Add"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Selected Team */}
          <div className="space-y-4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Your Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Enter team name..."
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Players</span>
                  <span className="font-bold">{selectedPlayers.length}/11</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Credits</span>
                  <span className={`font-bold ${remainingCredits < 0 ? "text-destructive" : ""}`}>
                    {remainingCredits}/100
                  </span>
                </div>

                {selectedPlayers.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Selected Players</h4>
                    {selectedPlayers.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{player.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {player.role === "captain" && (
                              <Badge variant="default" className="text-xs">
                                <Trophy className="h-3 w-3 mr-1" />C
                              </Badge>
                            )}
                            {player.role === "vice-captain" && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />VC
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {player.role !== "captain" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSetCaptain(player.id)}
                              className="h-7 px-2"
                            >
                              C
                            </Button>
                          )}
                          {player.role !== "vice-captain" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSetViceCaptain(player.id)}
                              className="h-7 px-2"
                            >
                              VC
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={handleCreateTeam}
                  disabled={selectedPlayers.length !== 11 || !captain || !viceCaptain || createTeamMutation.isPending}
                >
                  {createTeamMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Team"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
