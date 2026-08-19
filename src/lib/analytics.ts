export const GA_MEASUREMENT_ID = 'G-3TZD2EK8YR';

type Gtag = (
  command: 'config' | 'event' | 'js',
  target: string | Date,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
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
  window.gtag?.('event', 'app_store_click', {
    page_id: pageId,
    locale,
    placement,
  });
}
