import { useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { collectComprehensiveData } from "@/lib/comprehensiveTracking";

/**
 * Generate or retrieve session ID from sessionStorage
 */
function getOrCreateSessionId(): string {
  const SESSION_KEY = 'visitor_session_id';
  
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  
  if (!sessionId) {
    // Generate unique session ID
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  
  return sessionId;
}

/**
 * ComprehensiveTracker Component
 * 
 * Collects all 272 visitor data points and sends them to the backend.
 * This component runs once per page load and tracks:
 * - Network & Connection (IP, ISP, ASN, connection type, VPN/proxy detection)
 * - Geolocation (country, region, city, weather, timezone)
 * - Device & Hardware (type, brand, model, CPU, GPU, RAM, battery)
 * - Screen & Display (resolution, DPI, color depth, HDR, refresh rate)
 * - Browser (name, version, engine, language, capabilities)
 * - Operating System (name, version, architecture)
 * - Privacy & Security (DNT, ad blocker, fingerprints)
 * - Performance (load times, FCP, LCP, FID, CLS, TTFB)
 * - Traffic Source (UTM params, GCLID, referrer)
 * - User Journey (entry page, session tracking)
 * 
 * All data is sent asynchronously and does not block page rendering.
 */
export function ComprehensiveTracker() {
  const hasTracked = useRef(false);
  const trackVisit = trpc.tracking.trackVisit.useMutation();

  useEffect(() => {
    // Only track once per page load
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Collect tracking data asynchronously
    const collectAndSendData = async () => {
      try {
        // Collect all client-side tracking data
        const trackingData = await collectComprehensiveData();

        // Add session ID and page path
        const sessionId = getOrCreateSessionId();
        const pagePath = window.location.pathname;
        const referrerUrl = document.referrer || null;

        // Send to backend (server will merge with IP enrichment data)
        await trackVisit.mutateAsync({
          ...trackingData,
          sessionId,
          pagePath,
          referrerUrl,
        });

        console.log("[Tracking] Visitor data collected and sent successfully");
      } catch (error) {
        // Fail silently - tracking should never break the user experience
        console.warn("[Tracking] Failed to collect or send tracking data:", error);
      }
    };

    // Start tracking after a short delay to not block initial page render
    const timeoutId = setTimeout(collectAndSendData, 100);

    return () => clearTimeout(timeoutId);
  }, [trackVisit]);

  // This component renders nothing
  return null;
}
