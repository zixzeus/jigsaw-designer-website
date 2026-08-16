'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {
  ANALYTICS_SETTINGS_EVENT,
  getAnalyticsConsent,
  loadGoogleAnalytics,
  setAnalyticsConsent,
} from '@/lib/analytics';

export default function AnalyticsConsent() {
  const t = useTranslations('Consent');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = getAnalyticsConsent();
    if (consent === 'granted') {
      loadGoogleAnalytics();
    }

    const revealTimer = consent === null
      ? window.setTimeout(() => setIsOpen(true), 0)
      : undefined;
    const openSettings = () => setIsOpen(true);
    window.addEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);

    return () => {
      window.removeEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);
      if (revealTimer !== undefined) {
        window.clearTimeout(revealTimer);
      }
    };
  }, []);

  const choose = (choice: 'granted' | 'denied') => {
    setAnalyticsConsent(choice);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <aside
      id="analytics-consent-settings"
      aria-label={t('title')}
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-border bg-background/95 p-5 shadow-2xl backdrop-blur"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-semibold">{t('title')}</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {t('description')}{' '}
            <Link className="font-medium text-primary-dark underline" href="/privacy">
              {t('privacyLink')}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-background-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
            onClick={() => choose('denied')}
            type="button"
          >
            {t('reject')}
          </button>
          <button
            className="rounded-full bg-primary-dark px-4 py-2 text-sm font-semibold text-white hover:bg-[#1452a3] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2"
            onClick={() => choose('granted')}
            type="button"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </aside>
  );
}
