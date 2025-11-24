import { useState, useEffect } from 'react';

/**
 * Hook to detect if user should see targeted ad
 * Enhanced with bot detection and user behavior validation
 * 
 * Conditions:
 * - Coming from Google Ads (utm_source=google)
 * - From India (detected via timezone)
 * - Mobile device
 * - Not a bot (advanced detection)
 * - Shows genuine user behavior (mouse/touch/scroll)
 * - Time-based delay to prevent instant screenshots
 */
export function useTargetedAd() {
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userInteracted = false;
    let timeoutId: NodeJS.Timeout;

    // Known bot user agents to block
    const botPatterns = [
      /bot/i,
      /crawl/i,
      /spider/i,
      /google/i,
      /bing/i,
      /yahoo/i,
      /baidu/i,
      /yandex/i,
      /facebook/i,
      /twitter/i,
      /linkedIn/i,
      /whatsapp/i,
      /telegram/i,
      /slurp/i,
      /duckduck/i,
      /baiduspider/i,
      /yandexbot/i,
      /sogou/i,
      /exabot/i,
      /facebot/i,
      /ia_archiver/i,
      /googlebot/i,
      /mediapartners-google/i,
      /adsbot-google/i,
      /google-inspectiontool/i,
      /storebot-google/i,
      /lighthouse/i,
      /chrome-lighthouse/i,
      /headless/i,
      /phantom/i,
      /selenium/i,
      /webdriver/i,
      /preview/i,
    ];

    const checkTargeting = async () => {
      try {
        console.log('[Targeted Ad] Starting enhanced targeting check...');
        
        // 1. Check User Agent for known bots
        const userAgent = navigator.userAgent.toLowerCase();
        const isBot = botPatterns.some(pattern => pattern.test(userAgent));
        console.log('[Targeted Ad] User Agent:', navigator.userAgent);
        console.log('[Targeted Ad] Is Bot (User Agent):', isBot);

        if (isBot) {
          console.log('[Targeted Ad] ❌ Bot detected via User Agent - hiding ad');
          setShouldShowAd(false);
          setIsLoading(false);
          return;
        }

        // 2. Check if user came from Google Ads
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

        // 3. Check if device is mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
        console.log('[Targeted Ad] Is Mobile:', isMobile);

        if (!isMobile) {
          console.log('[Targeted Ad] ❌ Not a mobile device - hiding ad');
          setShouldShowAd(false);
          setIsLoading(false);
          return;
        }

        // 4. Check if from India using timezone detection
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const isFromIndia = timezone === 'Asia/Kolkata' || timezone === 'Asia/Calcutta';
        console.log('[Targeted Ad] Timezone:', timezone, '| From India:', isFromIndia);

        if (!isFromIndia) {
          console.log('[Targeted Ad] ❌ Not from India - hiding ad');
          setShouldShowAd(false);
          setIsLoading(false);
          return;
        }

        // 5. Advanced bot detection
        const isWebDriver = typeof navigator.webdriver !== 'undefined' && navigator.webdriver;
        const hasLanguages = navigator.languages && navigator.languages.length > 0;
        const hasPlugins = navigator.plugins && navigator.plugins.length >= 0;
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        const isLikelyBot = isWebDriver || !hasLanguages;
        
        console.log('[Targeted Ad] Advanced Bot Detection:');
        console.log('  - Is WebDriver:', isWebDriver);
        console.log('  - Has Languages:', hasLanguages);
        console.log('  - Has Plugins:', hasPlugins);
        console.log('  - Has Touch:', hasTouch);
        console.log('  - Is Likely Bot:', isLikelyBot);

        if (isLikelyBot) {
          console.log('[Targeted Ad] ❌ Bot detected via advanced checks - hiding ad');
          setShouldShowAd(false);
          setIsLoading(false);
          return;
        }

        // 6. User interaction detection
        const handleInteraction = () => {
          if (!userInteracted) {
            userInteracted = true;
            console.log('[Targeted Ad] ✅ User interaction detected');
          }
        };

        // Listen for genuine user interactions
        window.addEventListener('mousemove', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });
        window.addEventListener('scroll', handleInteraction, { once: true });
        window.addEventListener('click', handleInteraction, { once: true });

        // 7. Time-based delay + interaction check
        // Wait 2.5 seconds AND require user interaction before showing ad
        timeoutId = setTimeout(() => {
          if (userInteracted) {
            console.log('[Targeted Ad] ✅ All checks passed + user interaction confirmed - SHOWING AD');
            setShouldShowAd(true);
          } else {
            console.log('[Targeted Ad] ⚠️ No user interaction detected after 2.5s - hiding ad (likely bot)');
            setShouldShowAd(false);
          }
          setIsLoading(false);
        }, 2500);

      } catch (error) {
        console.error('[Targeted Ad] Error checking ad targeting:', error);
        setShouldShowAd(false);
        setIsLoading(false);
      }
    };

    checkTargeting();

    // Cleanup
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return { shouldShowAd, isLoading };
}
