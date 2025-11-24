import { useState, useEffect } from 'react';

/**
 * Hook to detect if user should see targeted ad
 * Conditions:
 * - Coming from Google Ads (utm_source=google)
 * - From India (detected via IP geolocation)
 * - Mobile device
 * - Not a bot (based on client-side detection)
 */
export function useTargetedAd() {
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTargeting = async () => {
      try {
        // Check if user came from Google Ads
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get('utm_source');
        const isFromGoogleAds = utmSource === 'google';

        if (!isFromGoogleAds) {
          setShouldShowAd(false);
          setIsLoading(false);
          return;
        }

        // Check if device is mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

        if (!isMobile) {
          setShouldShowAd(false);
          setIsLoading(false);
          return;
        }

        // Check if from India using timezone detection
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const isFromIndia = timezone === 'Asia/Kolkata' || timezone === 'Asia/Calcutta';

        // Simple bot detection: check if browser has expected features
        const hasExpectedFeatures = 
          typeof navigator.webdriver === 'undefined' &&
          typeof (window as any).chrome !== 'undefined' &&
          navigator.languages && navigator.languages.length > 0;

        const isNotBot = hasExpectedFeatures && !navigator.doNotTrack;

        // Show ad only if all conditions are met
        setShouldShowAd(isFromIndia && isNotBot);
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking ad targeting:', error);
        setShouldShowAd(false);
        setIsLoading(false);
      }
    };

    checkTargeting();
  }, []);

  return { shouldShowAd, isLoading };
}
