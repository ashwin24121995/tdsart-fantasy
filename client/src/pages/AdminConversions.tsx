import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, Smartphone, Globe, Calendar } from "lucide-react";
import { useState } from "react";

export default function AdminConversions() {
  const { user, loading } = useAuth();
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'all'>('30d');
  
  // Calculate date filters
  const getDateFilter = () => {
    const now = new Date();
    if (dateRange === '7d') {
      const startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return { startDate, endDate: now };
    } else if (dateRange === '30d') {
      const startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return { startDate, endDate: now };
    }
    return {};
  };
  
  const { data: stats, isLoading: statsLoading } = trpc.whatsappConversions.getStats.useQuery(getDateFilter());
  const { data: conversions, isLoading: conversionsLoading } = trpc.whatsappConversions.getConversions.useQuery(getDateFilter());

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">You need admin privileges to access this page.</p>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="mb-2 -ml-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">WhatsApp Conversions</h1>
            <p className="text-muted-foreground mt-2">Track clicks and measure Google Ads ROI</p>
          </div>
          
          {/* Date Range Filter */}
          <div className="flex gap-2">
            <Button
              variant={dateRange === '7d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('7d')}
            >
              Last 7 Days
            </Button>
            <Button
              variant={dateRange === '30d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('30d')}
            >
              Last 30 Days
            </Button>
            <Button
              variant={dateRange === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('all')}
            >
              All Time
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <div className="h-20 bg-muted animate-pulse rounded" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Clicks</span>
              </div>
              <div className="text-3xl font-bold">{stats?.total || 0}</div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">From Google Ads</span>
              </div>
              <div className="text-3xl font-bold">
                {stats?.bySource?.find((s) => s.source === 'google')?.count || 0}
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Smartphone className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Mobile Clicks</span>
              </div>
              <div className="text-3xl font-bold">
                {stats?.byDevice?.find((d) => d.device === 'mobile')?.count || 0}
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <span className="text-sm text-muted-foreground">Avg Daily</span>
              </div>
              <div className="text-3xl font-bold">
                {stats?.dailyConversions?.length 
                  ? Math.round((stats.total || 0) / stats.dailyConversions.length)
                  : 0}
              </div>
            </Card>
          </div>
        )}

        {/* Daily Trend Chart */}
        {stats?.dailyConversions && stats.dailyConversions.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Daily Conversions</h2>
            <div className="space-y-2">
              {stats.dailyConversions.slice(0, 10).map((day) => (
                <div key={day.date} className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-24">{day.date}</span>
                  <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                    <div
                      className="bg-primary h-full flex items-center justify-end pr-3 text-sm font-medium text-primary-foreground"
                      style={{
                        width: `${Math.max(10, (day.count / (stats.total || 1)) * 100)}%`,
                      }}
                    >
                      {day.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Conversions by Source */}
        {stats?.bySource && stats.bySource.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Conversions by Traffic Source</h2>
            <div className="space-y-3">
              {stats.bySource.map((source) => (
                <div key={source.source || 'unknown'} className="flex items-center justify-between">
                  <span className="font-medium">{source.source || 'Direct'}</span>
                  <span className="text-2xl font-bold">{source.count}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Recent Conversions Table */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Conversions</h2>
          {conversionsLoading ? (
            <div className="h-64 bg-muted animate-pulse rounded" />
          ) : conversions && conversions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium">Date & Time</th>
                    <th className="text-left p-3 text-sm font-medium">Source</th>
                    <th className="text-left p-3 text-sm font-medium">Device</th>
                    <th className="text-left p-3 text-sm font-medium">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {conversions.slice(0, 50).map((conversion) => (
                    <tr key={conversion.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 text-sm">
                        {new Date(conversion.clickedAt).toLocaleString()}
                      </td>
                      <td className="p-3 text-sm">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                          {conversion.utmSource || 'Direct'}
                        </span>
                      </td>
                      <td className="p-3 text-sm capitalize">{conversion.deviceType || 'Unknown'}</td>
                      <td className="p-3 text-sm">{conversion.city || conversion.country || 'Unknown'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No conversions recorded yet.</p>
              <p className="text-sm mt-2">Clicks will appear here once users interact with the WhatsApp ad.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
