import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp, Users, Target, Trophy, BarChart3 } from "lucide-react";
import { Link } from "wouter";

export default function Analytics() {
  const { user, loading: authLoading } = useAuth();
  const [dateRange, setDateRange] = useState<{ start?: string; end?: string }>({});

  const { data: campaignData, isLoading: campaignLoading } = trpc.analytics.getCampaignPerformance.useQuery({
    startDate: dateRange.start,
    endDate: dateRange.end,
  }, { enabled: !!user });

  const { data: sourcesData, isLoading: sourcesLoading } = trpc.analytics.getSourcesBreakdown.useQuery(
    undefined,
    { enabled: !!user }
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>Please log in to view analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLoading = campaignLoading || sourcesLoading;

  // Calculate totals
  const totalUsers = campaignData?.reduce((sum, campaign) => sum + campaign.users, 0) || 0;
  const totalRegistrations = campaignData?.reduce((sum, campaign) => sum + campaign.registrations, 0) || 0;
  const totalTeamsCreated = campaignData?.reduce((sum, campaign) => sum + campaign.teamsCreated, 0) || 0;
  const totalContestsJoined = campaignData?.reduce((sum, campaign) => sum + campaign.contestsJoined, 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 py-12 px-4 pt-20 lg:pt-12">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Campaign Analytics</h1>
          <p className="text-purple-200">Track your Google Ads performance and user acquisition</p>
        </div>

        {/* Summary Cards */}
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
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : totalUsers}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : totalRegistrations}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Teams Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : totalTeamsCreated}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Contests Joined
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : totalContestsJoined}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acquisition Sources */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Acquisition Sources
            </CardTitle>
            <CardDescription>Where your users are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            {sourcesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : sourcesData && sourcesData.length > 0 ? (
              <div className="space-y-4">
                {sourcesData.map((source, index) => {
                  const percentage = totalUsers > 0 ? (source.count / totalUsers) * 100 : 0;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{source.source}</span>
                        <span className="text-muted-foreground">
                          {source.count} users ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No data available yet</p>
            )}
          </CardContent>
        </Card>

        {/* Campaign Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Detailed breakdown by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            {campaignLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : campaignData && campaignData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Source</th>
                      <th className="text-left py-3 px-4">Medium</th>
                      <th className="text-left py-3 px-4">Campaign</th>
                      <th className="text-right py-3 px-4">Users</th>
                      <th className="text-right py-3 px-4">Registrations</th>
                      <th className="text-right py-3 px-4">Teams</th>
                      <th className="text-right py-3 px-4">Contests</th>
                      <th className="text-right py-3 px-4">Conversion %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignData.map((campaign, index) => {
                      const conversionRate = campaign.users > 0 
                        ? (campaign.registrations / campaign.users) * 100 
                        : 0;
                      
                      return (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{campaign.utmSource || "-"}</td>
                          <td className="py-3 px-4">{campaign.utmMedium || "-"}</td>
                          <td className="py-3 px-4">{campaign.utmCampaign || "-"}</td>
                          <td className="text-right py-3 px-4">{campaign.users}</td>
                          <td className="text-right py-3 px-4">{campaign.registrations}</td>
                          <td className="text-right py-3 px-4">{campaign.teamsCreated}</td>
                          <td className="text-right py-3 px-4">{campaign.contestsJoined}</td>
                          <td className="text-right py-3 px-4">
                            <span className={conversionRate > 50 ? "text-green-600 font-medium" : ""}>
                              {conversionRate.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No campaign data available yet. Start running Google Ads to see performance metrics here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
