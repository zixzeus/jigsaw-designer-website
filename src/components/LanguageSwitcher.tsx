'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/navigation';
import {ChangeEvent, useTransition} from 'react';
import {locales, localeNames} from '@/i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  };

  return (
    <div className="relative inline-flex items-center">
        <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <select
        defaultValue={locale}
        onChange={onSelectChange}
        disabled={isPending}
        className="bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary rounded-md py-1 pr-1 cursor-pointer appearance-none text-gray-700 dark:text-gray-200"
        >
        {locales.map((l) => (
            <option key={l} value={l} className="text-black bg-white">
            {localeNames[l]}
            </option>
        ))}
        </select>
    </div>
  );
}
