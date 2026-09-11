import Image from "next/image";

import type {SiteLocale} from "@/config/seo";
import {getInterfaceGuideCopy, INTERFACE_GUIDE_MEDIA} from "@/content/interface-guide";
import {Link} from "@/i18n/navigation";

import styles from "./InterfaceGuideEntry.module.css";

export default function InterfaceGuideEntry({locale, compact = false}: {locale: SiteLocale; compact?: boolean}) {
  const copy = getInterfaceGuideCopy(locale);
  const media = INTERFACE_GUIDE_MEDIA.workspace;

  return (
    <Link href="/help/interface-guide" className={`${styles.entry} ${compact ? styles.compact : ""}`} aria-label={copy.title}>
      <div className={styles.preview}>
        <Image src={media.src} width={media.width} height={media.height} alt="" sizes="(max-width: 767px) 90vw, 540px" />
      </div>
      <div className={styles.copy}>
        <h2>{copy.title}<span aria-hidden="true">↗</span></h2>
        <p>{copy.intro}</p>
      </div>
    </Link>
  );
}
