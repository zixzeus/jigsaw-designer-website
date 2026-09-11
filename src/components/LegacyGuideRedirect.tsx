"use client";

import {useEffect} from "react";
import {useRouter} from "@/i18n/navigation";
import {LEGACY_GUIDE_DESTINATIONS} from "@/content/guide-destinations";

export default function LegacyGuideRedirect() {
  const router = useRouter();
  useEffect(() => {
    function followMovedChapter() {
      const hash = window.location.hash.slice(1);
      const destination = Object.hasOwn(LEGACY_GUIDE_DESTINATIONS, hash)
        ? LEGACY_GUIDE_DESTINATIONS[hash as keyof typeof LEGACY_GUIDE_DESTINATIONS]
        : undefined;
      if (destination) router.replace(destination, {scroll: true});
    }
    followMovedChapter();
    window.addEventListener("hashchange", followMovedChapter);
    return () => window.removeEventListener("hashchange", followMovedChapter);
  }, [router]);
  return null;
}
