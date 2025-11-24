import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Users,
  TrendingUp,
  Trophy,
  CheckCircle2,
  XCircle,
  Activity,
  BarChart3,
  Shield,
  Search,
  MapPin,
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  const { data: trafficOverview, isLoading: overviewLoading } = trpc.admin.getTrafficOverview.useQuery(
    {},
    { enabled: !!user && user.role === "admin" }
  );

  const { data: recentActivity, isLoading: activityLoading } = trpc.admin.getRecentActivity.useQuery(
    { limit: 20 },
    { enabled: !!user && user.role === "admin" }
  );

  const { data: registrationTrend, isLoading: trendLoading } = trpc.admin.getRegistrationTrend.useQuery(
    undefined,
    { enabled: !!user && user.role === "admin" }
  );

  const { data: trafficByState, isLoading: stateLoading } = trpc.admin.getTrafficByState.useQuery(
    undefined,
    { enabled: !!user && user.role === "admin" }
  );

  const { data: allUsers, isLoading: usersLoading } = trpc.admin.getAllUsers.useQuery(
    {
      search: searchQuery || undefined,
      utmSource: sourceFilter || undefined,
    },
    { enabled: !!user && user.role === "admin" }
  );

  const updateVerificationMutation = trpc.admin.updateUserVerification.useMutation({
    onSuccess: () => {
      toast.success("User verification updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Access Required
            </CardTitle>
            <CardDescription>You do not have permission to access this page</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLoading = overviewLoading || activityLoading || trendLoading || stateLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 py-12 px-4 pt-20 lg:pt-12">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Shield className="h-10 w-10" />
              Admin Dashboard
            </h1>
            <p className="text-purple-200">Monitor traffic, users, and platform activity</p>
          </div>
          <Link href="/analytics">
            <Button variant="outline" className="bg-white/10 text-white border-white/20">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </Link>
        </div>

        {/* Traffic Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : trafficOverview?.totalUsers || 0}
              </div>
              <p className="text-blue-100 text-sm mt-1">
                +{trafficOverview?.newUsersToday || 0} today
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Verified Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : trafficOverview?.verifiedUsers || 0}
              </div>
              <p className="text-green-100 text-sm mt-1">
                {trafficOverview?.unverifiedUsers || 0} pending
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Total Teams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : trafficOverview?.totalTeams || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Contest Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : trafficOverview?.totalContestEntries || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Registration Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Registration Trend (Last 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {trendLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : registrationTrend && registrationTrend.length > 0 ? (
                <div className="space-y-2">
                  {registrationTrend.slice(-7).map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-primary rounded-full" style={{ width: `${item.count * 10}px` }} />
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No data available</p>
              )}
            </CardContent>
          </Card>

          {/* Traffic by State */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Traffic by State
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stateLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : trafficByState && trafficByState.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {trafficByState.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                      <span className="text-sm">{item.state}</span>
                      <Badge variant="secondary">{item.count} users</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No data available</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Feed */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Live feed of user actions</CardDescription>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : recentActivity && recentActivity.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={
                          activity.eventType === "registration" ? "default" :
                          activity.eventType === "team_created" ? "secondary" :
                          "outline"
                        }>
                          {activity.eventType.replace("_", " ")}
                        </Badge>
                        <span className="text-sm font-medium">{activity.userName || "Unknown"}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.userEmail}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No recent activity</p>
            )}
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>View and manage all registered users</CardDescription>
            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Input
                placeholder="Filter by source..."
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : allUsers && allUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Source</th>
                      <th className="text-left py-3 px-4">Campaign</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Joined</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{user.name || "-"}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          {user.acquisition?.utmSource || "Direct"}
                        </td>
                        <td className="py-3 px-4">
                          {user.acquisition?.utmCampaign || "-"}
                        </td>
                        <td className="py-3 px-4">
                          {user.isVerified ? (
                            <Badge variant="default" className="gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="gap-1">
                              <XCircle className="h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              updateVerificationMutation.mutate({
                                userId: user.id,
                                isVerified: !user.isVerified,
                              });
                            }}
                            disabled={updateVerificationMutation.isPending}
                          >
                            {user.isVerified ? "Unverify" : "Verify"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No users found</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
