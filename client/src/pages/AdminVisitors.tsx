import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Globe, Monitor, Shield, Route, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";

/**
 * Admin Visitor Dashboard
 * Displays comprehensive visitor tracking data with organized tabs
 */
export default function AdminVisitors() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVisitorId, setSelectedVisitorId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("visitors");

  // Fetch visitor data
  const { data: stats, isLoading: statsLoading } = trpc.tracking.getStats.useQuery();
  const { data: visitors, isLoading: visitorsLoading } = trpc.tracking.getAllVisitors.useQuery({ limit: 100, offset: 0 });
  const { data: countryData } = trpc.tracking.getVisitorsByCountry.useQuery();
  const { data: deviceData } = trpc.tracking.getVisitorsByDevice.useQuery();
  const { data: browserData } = trpc.tracking.getVisitorsByBrowser.useQuery();
  const { data: selectedVisitor } = trpc.tracking.getVisitorById.useQuery(
    { id: selectedVisitorId! },
    { enabled: selectedVisitorId !== null }
  );

  // Check authentication and admin role
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  if (user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You must be an admin to view this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Filter visitors by search term
  const filteredVisitors = visitors?.filter(v => 
    v.ipAddress?.includes(searchTerm) ||
    v.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.browserName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.deviceType?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Visitor Analytics</h1>
          <p className="text-muted-foreground">Comprehensive tracking of all 272 visitor data points</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsLoading ? "..." : stats?.totalVisitors || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unique IPs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsLoading ? "..." : stats?.uniqueIPs || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsLoading ? "..." : stats?.uniqueSessions || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Bot Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statsLoading ? "..." : Math.round(stats?.avgBotScore || 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">VPN Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{statsLoading ? "..." : stats?.vpnDetected || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Proxy Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{statsLoading ? "..." : stats?.proxyDetected || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="visitors">
              <Monitor className="w-4 h-4 mr-2" />
              Visitors
            </TabsTrigger>
            <TabsTrigger value="location">
              <Globe className="w-4 h-4 mr-2" />
              Location
            </TabsTrigger>
            <TabsTrigger value="devices">
              <Monitor className="w-4 h-4 mr-2" />
              Devices
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="journey">
              <Route className="w-4 h-4 mr-2" />
              Journey
            </TabsTrigger>
            <TabsTrigger value="details">
              <TrendingUp className="w-4 h-4 mr-2" />
              Details
            </TabsTrigger>
          </TabsList>

          {/* Visitors Tab */}
          <TabsContent value="visitors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visitor List</CardTitle>
                <CardDescription>All tracked visitors with key information</CardDescription>
                <div className="flex items-center gap-2 mt-4">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by IP, location, browser, device..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {visitorsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : filteredVisitors.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No visitors found. Tracking data will appear here after you publish the site and visitors arrive.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">IP Address</th>
                          <th className="text-left p-2">Location</th>
                          <th className="text-left p-2">Device</th>
                          <th className="text-left p-2">Browser</th>
                          <th className="text-left p-2">ISP</th>
                          <th className="text-left p-2">Time</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVisitors.map((visitor) => (
                          <tr key={visitor.id} className="border-b hover:bg-muted/50">
                            <td className="p-2 font-mono text-sm">{visitor.ipAddress || "N/A"}</td>
                            <td className="p-2">
                              {visitor.city && visitor.country ? `${visitor.city}, ${visitor.country}` : "Unknown"}
                            </td>
                            <td className="p-2">
                              <Badge variant="outline">{visitor.deviceType || "Unknown"}</Badge>
                            </td>
                            <td className="p-2">{visitor.browserName || "Unknown"}</td>
                            <td className="p-2 text-sm text-muted-foreground">{visitor.isp || "N/A"}</td>
                            <td className="p-2 text-sm text-muted-foreground">
                              {visitor.visitTimestamp ? new Date(visitor.visitTimestamp).toLocaleString() : "N/A"}
                            </td>
                            <td className="p-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setSelectedVisitorId(visitor.id);
                                  setActiveTab("details");
                                }}
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visitors by Country</CardTitle>
                <CardDescription>Geographic distribution of visitors</CardDescription>
              </CardHeader>
              <CardContent>
                {countryData && countryData.length > 0 ? (
                  <div className="space-y-2">
                    {countryData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{item.country || "Unknown"}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-48 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(Number(item.count) / Number(countryData[0]?.count || 1)) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">{String(item.count)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No location data available yet
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Devices</CardTitle>
                  <CardDescription>Visitor device types</CardDescription>
                </CardHeader>
                <CardContent>
                  {deviceData && deviceData.length > 0 ? (
                    <div className="space-y-2">
                      {deviceData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="font-medium">{item.deviceType || "Unknown"}</span>
                          <Badge>{String(item.count)}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No device data available yet
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Browsers</CardTitle>
                  <CardDescription>Visitor browser distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  {browserData && browserData.length > 0 ? (
                    <div className="space-y-2">
                      {browserData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="font-medium">{item.browserName || "Unknown"}</span>
                          <Badge>{String(item.count)}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No browser data available yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security & Bot Detection</CardTitle>
                <CardDescription>VPN, Proxy, and bot detection data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">VPN Detected</div>
                      <div className="text-2xl font-bold text-orange-500">{stats?.vpnDetected || 0}</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Proxy Detected</div>
                      <div className="text-2xl font-bold text-red-500">{stats?.proxyDetected || 0}</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground">Average Bot Score</div>
                      <div className="text-2xl font-bold">{Math.round(stats?.avgBotScore || 0)}/100</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Bot scores range from 0-100, with higher scores indicating higher likelihood of bot traffic.
                    VPN and proxy detection helps identify potentially suspicious visitors.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Journey Tab */}
          <TabsContent value="journey" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Journey Tracking</CardTitle>
                <CardDescription>Track visitor paths through the website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Select a visitor from the Visitors tab to view their journey
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Details</CardTitle>
                <CardDescription>Complete visitor profile with all 272 data points</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedVisitorId && selectedVisitor ? (
                  <div className="space-y-6">
                    {/* Network & Connection */}
                    <div>
                      <h3 className="font-semibold mb-2">Network & Connection</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                        <div><span className="text-muted-foreground">IP:</span> {selectedVisitor.ipAddress || "N/A"}</div>
                        <div><span className="text-muted-foreground">ISP:</span> {selectedVisitor.isp || "N/A"}</div>
                        <div><span className="text-muted-foreground">ASN:</span> {selectedVisitor.asn || "N/A"}</div>
                        <div><span className="text-muted-foreground">Connection:</span> {selectedVisitor.connectionType || "N/A"}</div>
                        <div><span className="text-muted-foreground">Speed:</span> {selectedVisitor.downloadSpeed ? `${selectedVisitor.downloadSpeed} Mbps` : "N/A"}</div>
                        <div><span className="text-muted-foreground">RTT:</span> {selectedVisitor.rtt ? `${selectedVisitor.rtt} ms` : "N/A"}</div>
                      </div>
                    </div>

                    {/* Geolocation */}
                    <div>
                      <h3 className="font-semibold mb-2">Geolocation</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                        <div><span className="text-muted-foreground">Country:</span> {selectedVisitor.country || "N/A"}</div>
                        <div><span className="text-muted-foreground">Region:</span> {selectedVisitor.region || "N/A"}</div>
                        <div><span className="text-muted-foreground">City:</span> {selectedVisitor.city || "N/A"}</div>
                        <div><span className="text-muted-foreground">Postal:</span> {selectedVisitor.postalCode || "N/A"}</div>
                        <div><span className="text-muted-foreground">Timezone:</span> {selectedVisitor.timezone || "N/A"}</div>
                        <div><span className="text-muted-foreground">Coordinates:</span> {selectedVisitor.latitude && selectedVisitor.longitude ? `${selectedVisitor.latitude}, ${selectedVisitor.longitude}` : "N/A"}</div>
                      </div>
                    </div>

                    {/* Device & Hardware */}
                    <div>
                      <h3 className="font-semibold mb-2">Device & Hardware</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                        <div><span className="text-muted-foreground">Type:</span> {selectedVisitor.deviceType || "N/A"}</div>
                        <div><span className="text-muted-foreground">Brand:</span> {selectedVisitor.deviceBrand || "N/A"}</div>
                        <div><span className="text-muted-foreground">Model:</span> {selectedVisitor.deviceModel || "N/A"}</div>
                        <div><span className="text-muted-foreground">CPU:</span> {selectedVisitor.cpuArchitecture || "N/A"}</div>
                        <div><span className="text-muted-foreground">Memory:</span> {selectedVisitor.deviceMemory ? `${selectedVisitor.deviceMemory} GB` : "N/A"}</div>
                        <div><span className="text-muted-foreground">Battery:</span> {selectedVisitor.batteryLevel ? `${selectedVisitor.batteryLevel}%` : "N/A"}</div>
                      </div>
                    </div>

                    {/* Browser */}
                    <div>
                      <h3 className="font-semibold mb-2">Browser</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                        <div><span className="text-muted-foreground">Name:</span> {selectedVisitor.browserName || "N/A"}</div>
                        <div><span className="text-muted-foreground">Version:</span> {selectedVisitor.browserVersion || "N/A"}</div>
                        <div><span className="text-muted-foreground">Engine:</span> {selectedVisitor.browserEngine || "N/A"}</div>
                        <div><span className="text-muted-foreground">Language:</span> {selectedVisitor.browserLanguage || "N/A"}</div>
                        <div><span className="text-muted-foreground">Cookies:</span> {selectedVisitor.cookiesEnabled ? "Enabled" : "Disabled"}</div>
                        <div><span className="text-muted-foreground">WebGL:</span> {selectedVisitor.webGlSupport ? "Supported" : "Not Supported"}</div>
                      </div>
                    </div>

                    {/* Screen */}
                    <div>
                      <h3 className="font-semibold mb-2">Screen & Display</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                        <div><span className="text-muted-foreground">Resolution:</span> {selectedVisitor.screenResolution || "N/A"}</div>
                        <div><span className="text-muted-foreground">Color Depth:</span> {selectedVisitor.colorDepth ? `${selectedVisitor.colorDepth}-bit` : "N/A"}</div>
                        <div><span className="text-muted-foreground">Pixel Ratio:</span> {selectedVisitor.pixelRatio || "N/A"}</div>
                        <div><span className="text-muted-foreground">DPI:</span> {selectedVisitor.dpi || "N/A"}</div>
                        <div><span className="text-muted-foreground">Viewport:</span> {selectedVisitor.viewportWidth && selectedVisitor.viewportHeight ? `${selectedVisitor.viewportWidth}x${selectedVisitor.viewportHeight}` : "N/A"}</div>
                        <div><span className="text-muted-foreground">Dark Mode:</span> {selectedVisitor.isDarkMode ? "Yes" : "No"}</div>
                      </div>
                    </div>

                    {/* Security */}
                    <div>
                      <h3 className="font-semibold mb-2">Security & Privacy</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                        <div><span className="text-muted-foreground">VPN:</span> <Badge variant={selectedVisitor.isVpn ? "destructive" : "outline"}>{selectedVisitor.isVpn ? "Yes" : "No"}</Badge></div>
                        <div><span className="text-muted-foreground">Proxy:</span> <Badge variant={selectedVisitor.isProxy ? "destructive" : "outline"}>{selectedVisitor.isProxy ? "Yes" : "No"}</Badge></div>
                        <div><span className="text-muted-foreground">Tor:</span> <Badge variant={selectedVisitor.isTor ? "destructive" : "outline"}>{selectedVisitor.isTor ? "Yes" : "No"}</Badge></div>
                        <div><span className="text-muted-foreground">Bot Score:</span> {selectedVisitor.botDetectionScore || 0}/100</div>
                        <div><span className="text-muted-foreground">DNT:</span> {selectedVisitor.doNotTrack ? "Enabled" : "Disabled"}</div>
                        <div><span className="text-muted-foreground">Ad Blocker:</span> {selectedVisitor.adBlockerDetected ? "Yes" : "No"}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Select a visitor from the Visitors tab to view complete details
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
