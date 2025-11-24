/**
 * UTM Parameter Tracking Utilities
 */

export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  matchtype?: string;
  device?: string;
  network?: string;
  adposition?: string;
}

/**
 * Extract UTM parameters from URL
 */
export function extractUTMParameters(url?: string): UTMParameters {
  const searchParams = new URLSearchParams(url ? new URL(url).search : window.location.search);
  
  return {
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || searchParams.get('campaignid') || undefined,
    utm_term: searchParams.get('utm_term') || searchParams.get('keyword') || undefined,
    utm_content: searchParams.get('utm_content') || searchParams.get('creative') || undefined,
    gclid: searchParams.get('gclid') || undefined,
    matchtype: searchParams.get('matchtype') || undefined,
    device: searchParams.get('device') || undefined,
    network: searchParams.get('network') || undefined,
    adposition: searchParams.get('adposition') || undefined,
  };
}

/**
 * Store UTM parameters in sessionStorage for later use
 */
export function storeUTMParameters(params?: UTMParameters): void {
  const utmParams = params || extractUTMParameters();
  
  // Only store if we have at least one UTM parameter
  if (Object.values(utmParams).some(v => v !== undefined)) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
    console.log('[UTM] Stored parameters:', utmParams);
  }
}

/**
 * Retrieve stored UTM parameters from sessionStorage
 */
export function getStoredUTMParameters(): UTMParameters | null {
  try {
    const stored = sessionStorage.getItem('utm_params');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('[UTM] Error retrieving stored parameters:', error);
  }
  return null;
}

/**
 * Clear stored UTM parameters
 */
export function clearUTMParameters(): void {
  sessionStorage.removeItem('utm_params');
}

/**
 * Get all tracking data including UTM, referrer, and user agent
 */
export function getTrackingData(): {
  utm: UTMParameters;
  referrer: string;
  landingPage: string;
  userAgent: string;
} {
  const utm = getStoredUTMParameters() || extractUTMParameters();
  
  return {
    utm,
    referrer: document.referrer,
    landingPage: window.location.href,
    userAgent: navigator.userAgent,
  };
}

/**
 * Initialize UTM tracking on page load
 */
export function initUTMTracking(): void {
  // Check if URL has UTM parameters
  const params = extractUTMParameters();
  
  // Store them if present
  if (Object.values(params).some(v => v !== undefined)) {
    storeUTMParameters(params);
  }
}
