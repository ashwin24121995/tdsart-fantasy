import { UAParser } from "ua-parser-js";

// Generate or retrieve session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}

// Detect device type
function getDeviceType(): string {
  const parser = new UAParser();
  const device = parser.getDevice();
  
  if (device.type === "mobile") return "mobile";
  if (device.type === "tablet") return "tablet";
  return "desktop";
}

// Get browser name
function getBrowser(): string {
  const parser = new UAParser();
  const browser = parser.getBrowser();
  return browser.name || "Unknown";
}

// Extract UTM parameters from URL
function getUTMParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmTerm: params.get("utm_term") || undefined,
    utmContent: params.get("utm_content") || undefined,
    gclid: params.get("gclid") || undefined,
  };
}

/**
 * Track a page view
 */
export async function trackPageView() {
  try {
    const sessionId = getSessionId();
    const path = window.location.pathname;
    const referrer = document.referrer;
    const userAgent = navigator.userAgent;
    const deviceType = getDeviceType();
    const browser = getBrowser();
    const utmParams = getUTMParams();

    // Store UTM params in sessionStorage for later use
    if (utmParams.utmSource) {
      sessionStorage.setItem("utm_params", JSON.stringify(utmParams));
    }

    // Call tRPC mutation to track page view
    // This will be called from components using trpc.traffic.trackPageView.useMutation()
    return {
      sessionId,
      path,
      referrer,
      userAgent,
      deviceType,
      browser,
      ...utmParams,
    };
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
}

/**
 * Get stored UTM parameters from session
 */
export function getStoredUTMParams() {
  const stored = sessionStorage.getItem("utm_params");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  return {};
}
