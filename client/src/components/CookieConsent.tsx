import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

export function CookieConsentBanner() {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: 'box inline',
          position: 'bottom right',
        },
        preferencesModal: {
          layout: 'box',
        },
      },

      categories: {
        necessary: {
          readOnly: true,
          enabled: true,
        },
        analytics: {
          enabled: false,
          readOnly: false,
        },
      },

      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: '🍪 We use cookies',
              description:
                'We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept all", you consent to our use of cookies. You can customize your preferences by clicking "Manage preferences".',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              showPreferencesBtn: 'Manage preferences',
            },
            preferencesModal: {
              title: 'Cookie Preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Save preferences',
              closeIconLabel: 'Close',
              sections: [
                {
                  title: 'Cookie Usage',
                  description:
                    'We use cookies to improve your experience on our website. You can choose which categories of cookies you want to allow.',
                },
                {
                  title: 'Strictly Necessary Cookies',
                  description:
                    'These cookies are essential for the website to function properly. They enable basic features like page navigation and access to secure areas. The website cannot function properly without these cookies.',
                  linkedCategory: 'necessary',
                  cookieTable: {
                    headers: {
                      name: 'Cookie',
                      description: 'Description',
                      duration: 'Duration',
                    },
                    body: [
                      {
                        name: 'cc_cookie',
                        description: 'Stores your cookie consent preferences',
                        duration: '6 months',
                      },
                      {
                        name: 'session',
                        description: 'Maintains your login session',
                        duration: 'Session',
                      },
                    ],
                  },
                },
                {
                  title: 'Analytics Cookies',
                  description:
                    'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the website experience.',
                  linkedCategory: 'analytics',
                  cookieTable: {
                    headers: {
                      name: 'Service',
                      description: 'Description',
                      duration: 'Duration',
                    },
                    body: [
                      {
                        name: 'Umami Analytics',
                        description: 'Privacy-focused analytics to understand website usage',
                        duration: '1 year',
                      },
                      {
                        name: 'Plausible Analytics',
                        description: 'Lightweight analytics for page views and events',
                        duration: '1 year',
                      },
                      {
                        name: 'Amplitude',
                        description: 'Product analytics to improve user experience',
                        duration: '1 year',
                      },
                    ],
                  },
                },
                {
                  title: 'More information',
                  description:
                    'For any queries related to our cookie policy, please <a href="/contact">contact us</a>. Read our full <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}
