import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, Eye, Clock, MousePointerClick } from "lucide-react";
import { useLocation } from "wouter";

export default function TrafficAnalytics() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  
  // Date range state (last 30 days by default)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  // Fetch traffic stats
  const { data: stats, isLoading: statsLoading } = trpc.traffic.getStats.useQuery(dateRange);
  const { data: organicTraffic, isLoading: organicLoading } = trpc.traffic.getOrganicTraffic.useQuery(dateRange);
  const { data: googleAdsTraffic, isLoading: adsLoading } = trpc.traffic.getGoogleAdsTraffic.useQuery(dateRange);
  const { data: topPages, isLoading: pagesLoading } = trpc.traffic.getTopPages.useQuery({ ...dateRange, limit: 10 });
  const { data: deviceTraffic, isLoading: deviceLoading } = trpc.traffic.getTrafficByDevice.useQuery(dateRange);
  const { data: trafficTrend, isLoading: trendLoading } = trpc.traffic.getTrafficTrend.useQuery(dateRange);

  // Check admin access
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
        <p className="text-gray-400 mb-6">You do not have permission to access this page</p>
        <Button onClick={() => setLocation("/")}>Go to Homepage</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8" />
            Traffic Analytics
          </h1>
          <p className="text-gray-300">Comprehensive website traffic analysis and insights</p>
        </div>

        {/* Date Range Selector */}
        <Card className="mb-6 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-300 mb-2 block">Start Date</label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-300 mb-2 block">End Date</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => {
                    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
                    const today = new Date().toISOString().split("T")[0];
                    setDateRange({ startDate: last30Days, endDate: today });
                  }}
                  variant="outline"
                  className="bg-purple-600 hover:bg-purple-700 text-white border-none"
                >
                  Last 30 Days
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-600/20 border-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-300 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Page Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {statsLoading ? "..." : stats?.pageViews.toLocaleString() || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-600/20 border-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-300 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Unique Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {statsLoading ? "..." : stats?.uniqueVisitors.toLocaleString() || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-600/20 border-orange-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-orange-300 flex items-center gap-2">
                <MousePointerClick className="w-4 h-4" />
                Bounce Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {statsLoading ? "..." : `${stats?.bounceRate || 0}%`}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600/20 border-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Avg Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {statsLoading ? "..." : `${Math.floor((stats?.avgSessionDuration || 0) / 60)}m`}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Traffic Analysis */}
        <Tabs defaultValue="organic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
            <TabsTrigger value="organic" className="data-[state=active]:bg-purple-600">
              Organic Traffic
            </TabsTrigger>
            <TabsTrigger value="google-ads" className="data-[state=active]:bg-purple-600">
              Google Ads Traffic
            </TabsTrigger>
          </TabsList>

          {/* Organic Traffic Tab */}
          <TabsContent value="organic" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Organic Traffic Sources
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Direct, referral, and search engine traffic
                </CardDescription>
              </CardHeader>
              <CardContent>
                {organicLoading ? (
                  <div className="text-center py-8 text-gray-400">Loading...</div>
                ) : organicTraffic && organicTraffic.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-300">Source</th>
                          <th className="text-right py-3 px-4 text-gray-300">Visitors</th>
                          <th className="text-right py-3 px-4 text-gray-300">Page Views</th>
                        </tr>
                      </thead>
                      <tbody>
                        {organicTraffic.map((item, idx) => (
                          <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                            <td className="py-3 px-4 text-white">{item.source}</td>
                            <td className="py-3 px-4 text-right text-white">{item.visitors.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right text-white">{item.pageViews.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">No organic traffic data available</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Google Ads Traffic Tab */}
          <TabsContent value="google-ads" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MousePointerClick className="w-5 h-5" />
                  Google Ads Campaigns
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Paid advertising campaign performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                {adsLoading ? (
                  <div className="text-center py-8 text-gray-400">Loading...</div>
                ) : googleAdsTraffic && googleAdsTraffic.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-300">Campaign</th>
                          <th className="text-left py-3 px-4 text-gray-300">Source</th>
                          <th className="text-right py-3 px-4 text-gray-300">Clicks</th>
                          <th className="text-right py-3 px-4 text-gray-300">Visitors</th>
                          <th className="text-right py-3 px-4 text-gray-300">Page Views</th>
                        </tr>
                      </thead>
                      <tbody>
                        {googleAdsTraffic.map((item, idx) => (
                          <tr key={idx} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                            <td className="py-3 px-4 text-white">{item.campaign}</td>
                            <td className="py-3 px-4 text-white">{item.source || "-"}</td>
                            <td className="py-3 px-4 text-right text-white">{item.clicks.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right text-white">{item.visitors.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right text-white">{item.pageViews.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">No Google Ads traffic data available</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Top Pages */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Top Pages</CardTitle>
              <CardDescription className="text-gray-400">Most visited pages</CardDescription>
            </CardHeader>
            <CardContent>
              {pagesLoading ? (
                <div className="text-center py-8 text-gray-400">Loading...</div>
              ) : topPages && topPages.length > 0 ? (
                <div className="space-y-3">
                  {topPages.map((page, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-white truncate flex-1">{page.path}</span>
                      <span className="text-gray-300 ml-4">{page.views.toLocaleString()} views</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">No page data available</div>
              )}
            </CardContent>
          </Card>

          {/* Traffic by Device */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Traffic by Device</CardTitle>
              <CardDescription className="text-gray-400">Device type breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              {deviceLoading ? (
                <div className="text-center py-8 text-gray-400">Loading...</div>
              ) : deviceTraffic && deviceTraffic.length > 0 ? (
                <div className="space-y-3">
                  {deviceTraffic.map((device, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-white capitalize">{device.device}</span>
                      <div className="text-right">
                        <div className="text-white">{device.visitors.toLocaleString()} visitors</div>
                        <div className="text-sm text-gray-400">{device.pageViews.toLocaleString()} views</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">No device data available</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
