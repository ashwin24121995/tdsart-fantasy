import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';

// Generate or retrieve session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

/**
 * Global component that automatically tracks page views
 * Captures visitor data and UTM parameters on every page load
 */
export function PageViewTracker() {
  const [location] = useLocation();
  const trackMutation = trpc.traffic.trackPageView.useMutation();

  useEffect(() => {
    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Track the page view
    trackMutation.mutate({
      sessionId: getSessionId(),
      path: location,
      referrer: document.referrer || undefined,
      utmSource: urlParams.get('utm_source') || undefined,
      utmMedium: urlParams.get('utm_medium') || undefined,
      utmCampaign: urlParams.get('utm_campaign') || undefined,
      utmTerm: urlParams.get('utm_term') || undefined,
      utmContent: urlParams.get('utm_content') || undefined,
      gclid: urlParams.get('gclid') || undefined,
    });
  }, [location]); // Re-track when route changes

  return null; // This component doesn't render anything
}
