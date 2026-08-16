'use client';

export const ANALYTICS_CONSENT_KEY = 'jigsawdesigner.analytics-consent.v1';
export const ANALYTICS_SETTINGS_EVENT = 'jigsawdesigner:open-analytics-settings';
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? 'G-3TZD2EK8YR';

type ConsentChoice = 'granted' | 'denied';

type Gtag = (
  command: 'config' | 'consent' | 'event' | 'js',
  target: string | Date,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

function ensureGtag(): Gtag {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function gtag(...args: Parameters<Gtag>) {
      window.dataLayer?.push(args);
    };
  return window.gtag;
}

function setGoogleAnalyticsDisabled(disabled: boolean): void {
  (window as unknown as Record<string, boolean>)[
    `ga-disable-${GA_MEASUREMENT_ID}`
  ] = disabled;
}

function clearGoogleAnalyticsCookies(): void {
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=', 1)[0]?.trim())
    .filter((name): name is string => Boolean(name && /^_(?:ga|gid|gat)/.test(name)));
  const hostname = window.location.hostname;
  const rootDomain = hostname.split('.').slice(-2).join('.');
  const canUseDomain = hostname.includes('.') && !/^\d+(?:\.\d+){3}$/.test(hostname);

  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    if (canUseDomain) {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${rootDomain}; SameSite=Lax`;
    }
  }
}

export function getAnalyticsConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return value === 'granted' || value === 'denied' ? value : null;
}

export function setAnalyticsConsent(choice: ConsentChoice): void {
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);

  if (choice === 'granted') {
    setGoogleAnalyticsDisabled(false);
    loadGoogleAnalytics();
    return;
  }

  window.gtag?.('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  setGoogleAnalyticsDisabled(true);
  document.getElementById('jigsawdesigner-ga4')?.remove();
  clearGoogleAnalyticsCookies();
}

export function loadGoogleAnalytics(): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  setGoogleAnalyticsDisabled(false);
  const gtag = ensureGtag();
  if (!document.getElementById('jigsawdesigner-ga4')) {
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });

    const script = document.createElement('script');
    script.id = 'jigsawdesigner-ga4';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      GA_MEASUREMENT_ID
    )}`;
    document.head.appendChild(script);
  }
}

export function trackAppStoreClick({
  pageId,
  locale,
  placement,
}: {
  pageId: string;
  locale: string;
  placement: string;
}): void {
  if (getAnalyticsConsent() !== 'granted') return;
  loadGoogleAnalytics();
  window.gtag?.('event', 'app_store_click', {
    page_id: pageId,
    locale,
    placement,
  });
}
