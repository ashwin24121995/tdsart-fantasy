import { useState, useEffect } from 'react';

/**
 * Hook to detect if user should see targeted ad
 * Conditions:
 * - Coming from Google Ads (utm_source=google)
 * - From India (detected via timezone)
 * - Mobile device
 * - Not a bot (basic detection)
 */
export function useTargetedAd() {
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTargeting = async () => {
      try {
        console.log('[Targeted Ad] Starting targeting check...');
        
        // Check if user came from Google Ads
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get('utm_source');
        const isFromGoogleAds = utmSource === 'google';
        console.log('[Targeted Ad] UTM Source:', utmSource, '| From Google Ads:', isFromGoogleAds);

        if (!isFromGoogleAds) {
          console.log('[Targeted Ad] ❌ Not from Google Ads - hiding ad');
          setShouldShowAd(false);
          setIsLoading(false);
          return;
        }

        // Check if device is mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
        console.log('[Targeted Ad] User Agent:', navigator.userAgent);
        console.log('[Targeted Ad] Is Mobile:', isMobile);

        if (!isMobile) {
          console.log('[Targeted Ad] ❌ Not a mobile device - hiding ad');
          setShouldShowAd(false);
          setIsLoading(false);
          return;
        }

        // Check if from India using timezone detection
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const isFromIndia = timezone === 'Asia/Kolkata' || timezone === 'Asia/Calcutta';
        console.log('[Targeted Ad] Timezone:', timezone, '| From India:', isFromIndia);

        if (!isFromIndia) {
          console.log('[Targeted Ad] ❌ Not from India - hiding ad');
          setShouldShowAd(false);
          setIsLoading(false);
          return;
        }

        // Simplified bot detection that works on all browsers
        const isWebDriver = typeof navigator.webdriver !== 'undefined' && navigator.webdriver;
        const hasLanguages = navigator.languages && navigator.languages.length > 0;
        const hasPlugins = navigator.plugins && navigator.plugins.length >= 0; // Plugins exist (even if empty on mobile)
        
        const isLikelyBot = isWebDriver || !hasLanguages;
        const isNotBot = !isLikelyBot;
        
        console.log('[Targeted Ad] Bot Detection:');
        console.log('  - Is WebDriver:', isWebDriver);
        console.log('  - Has Languages:', hasLanguages);
        console.log('  - Has Plugins:', hasPlugins);
        console.log('  - Is Not Bot:', isNotBot);

        // Show ad if all conditions are met
        const showAd = isFromGoogleAds && isMobile && isFromIndia && isNotBot;
        console.log('[Targeted Ad] Final Decision:', showAd ? '✅ SHOW AD' : '❌ HIDE AD');
        
        setShouldShowAd(showAd);
        setIsLoading(false);
      } catch (error) {
        console.error('[Targeted Ad] Error checking ad targeting:', error);
        setShouldShowAd(false);
        setIsLoading(false);
      }
    };

    checkTargeting();
  }, []);

  return { shouldShowAd, isLoading };
}
