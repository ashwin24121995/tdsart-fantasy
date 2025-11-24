import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, BellOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  isPushSupported,
  getNotificationPermission,
  requestNotificationPermission,
  subscribeToPush,
  unsubscribeFromPush,
  getCurrentSubscription,
  extractSubscriptionDetails,
} from "@/lib/pushNotifications";

export default function NotificationSettings() {
  const { user, loading: authLoading } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [loading, setLoading] = useState(false);

  const { data: preferences, refetch: refetchPreferences } = trpc.notifications.getPreferences.useQuery(
    undefined,
    { enabled: !!user }
  );

  const { data: config } = trpc.notifications.isConfigured.useQuery();
  const { data: vapidKey } = trpc.notifications.getVapidPublicKey.useQuery(
    undefined,
    { enabled: config?.configured }
  );

  const subscribeMutation = trpc.notifications.subscribe.useMutation();
  const unsubscribeMutation = trpc.notifications.unsubscribe.useMutation();
  const updatePreferencesMutation = trpc.notifications.updatePreferences.useMutation();
  const sendTestMutation = trpc.notifications.sendTest.useMutation();

  // Check subscription status on mount
  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    if (!isPushSupported()) {
      return;
    }

    const currentPermission = getNotificationPermission();
    setPermission(currentPermission);

    const subscription = await getCurrentSubscription();
    setIsSubscribed(!!subscription);
  };

  const handleEnableNotifications = async () => {
    if (!isPushSupported()) {
      toast.error("Push notifications are not supported in your browser");
      return;
    }

    if (!config?.configured) {
      toast.error("Push notifications are not configured on the server");
      return;
    }

    if (!vapidKey?.publicKey) {
      toast.error("Could not get VAPID public key");
      return;
    }

    setLoading(true);

    try {
      // Request permission
      const newPermission = await requestNotificationPermission();
      setPermission(newPermission);

      if (newPermission !== "granted") {
        toast.error("Notification permission denied");
        setLoading(false);
        return;
      }

      // Subscribe to push
      const subscription = await subscribeToPush(vapidKey.publicKey);

      if (!subscription) {
        toast.error("Failed to subscribe to push notifications");
        setLoading(false);
        return;
      }

      // Save subscription to server
      const details = extractSubscriptionDetails(subscription);
      await subscribeMutation.mutateAsync({
        ...details,
        userAgent: navigator.userAgent,
      });

      setIsSubscribed(true);
      toast.success("Push notifications enabled!");
    } catch (error: any) {
      console.error("Error enabling notifications:", error);
      toast.error(error.message || "Failed to enable notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setLoading(true);

    try {
      const subscription = await getCurrentSubscription();
      
      if (subscription) {
        const details = extractSubscriptionDetails(subscription);
        await unsubscribeMutation.mutateAsync({ endpoint: details.endpoint });
      }

      await unsubscribeFromPush();
      setIsSubscribed(false);
      toast.success("Push notifications disabled");
    } catch (error: any) {
      console.error("Error disabling notifications:", error);
      toast.error(error.message || "Failed to disable notifications");
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = async (key: string, value: boolean) => {
    try {
      await updatePreferencesMutation.mutateAsync({ [key]: value });
      await refetchPreferences();
      toast.success("Preference updated");
    } catch (error: any) {
      console.error("Error updating preference:", error);
      toast.error(error.message || "Failed to update preference");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>Please log in to manage notification settings</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const notSupported = !isPushSupported();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Notification Settings</h1>
          <p className="text-purple-200">Manage your push notification preferences</p>
        </div>

        {notSupported && (
          <Alert className="mb-6 bg-red-500/10 border-red-500">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-200">
              Push notifications are not supported in your browser. Please use a modern browser like Chrome, Firefox, or Edge.
            </AlertDescription>
          </Alert>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isSubscribed ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
              Push Notifications
            </CardTitle>
            <CardDescription>
              {isSubscribed
                ? "You are subscribed to push notifications"
                : "Enable push notifications to receive real-time updates"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {permission === "denied" && (
              <Alert className="mb-4 bg-yellow-500/10 border-yellow-500">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-200">
                  Notification permission is blocked. Please enable it in your browser settings.
                </AlertDescription>
              </Alert>
            )}

            {isSubscribed ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Notifications are enabled</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    onClick={async () => {
                      try {
                        await sendTestMutation.mutateAsync();
                        toast.success("Test notification sent!");
                      } catch (error: any) {
                        toast.error(error.message || "Failed to send test notification");
                      }
                    }}
                    disabled={sendTestMutation.isPending}
                  >
                    {sendTestMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Test
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDisableNotifications}
                    disabled={loading || notSupported}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Disable Notifications
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={handleEnableNotifications}
                disabled={loading || notSupported || permission === "denied"}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enable Notifications
              </Button>
            )}
          </CardContent>
        </Card>

        {isSubscribed && preferences && (
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose which notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="contestStart">Contest Start</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when contests you joined are about to start
                  </p>
                </div>
                <Switch
                  id="contestStart"
                  checked={preferences.contestStart}
                  onCheckedChange={(checked) => handlePreferenceChange("contestStart", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="matchBeginning">Match Beginning</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when matches for your contests begin
                  </p>
                </div>
                <Switch
                  id="matchBeginning"
                  checked={preferences.matchBeginning}
                  onCheckedChange={(checked) => handlePreferenceChange("matchBeginning", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="rankChanges">Rank Changes</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about significant changes in your contest rankings
                  </p>
                </div>
                <Switch
                  id="rankChanges"
                  checked={preferences.rankChanges}
                  onCheckedChange={(checked) => handlePreferenceChange("rankChanges", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="achievementUnlocks">Achievement Unlocks</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you unlock new achievements
                  </p>
                </div>
                <Switch
                  id="achievementUnlocks"
                  checked={preferences.achievementUnlocks}
                  onCheckedChange={(checked) => handlePreferenceChange("achievementUnlocks", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newContests">New Contests</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new contests are available to join
                  </p>
                </div>
                <Switch
                  id="newContests"
                  checked={preferences.newContests}
                  onCheckedChange={(checked) => handlePreferenceChange("newContests", checked)}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
