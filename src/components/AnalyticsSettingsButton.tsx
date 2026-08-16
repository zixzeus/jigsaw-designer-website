"use client";

import {useTranslations} from "next-intl";

import {ANALYTICS_SETTINGS_EVENT} from "@/lib/analytics";

export default function AnalyticsSettingsButton() {
  const consent = useTranslations("Consent");

  return (
    <button
      type="button"
      aria-controls="analytics-consent-settings"
      onClick={() => window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT))}
      className="hover:text-primary-dark dark:hover:text-primary-light"
    >
      {consent("title")}
    </button>
  );
}
