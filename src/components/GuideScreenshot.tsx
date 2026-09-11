"use client";

import Image from "next/image";
import {useEffect, useId, useRef, useState} from "react";

import type {GuideMedia} from "@/content/interface-guide";

import styles from "./InterfaceGuide.module.css";

type Props = {
  media: GuideMedia;
  alt: string;
  enlargeLabel: string;
  closeLabel: string;
  priority?: boolean;
  className?: string;
};

export default function GuideScreenshot({media, alt, enlargeLabel, closeLabel, priority, className}: Props) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {document.body.style.overflow = previousOverflow;};
  }, [open]);

  return (
    <figure className={`${styles.figure} ${className ?? ""}`}>
      <button type="button" className={styles.screenshotButton} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={`${enlargeLabel}: ${alt}`}>
        <AnnotatedImage media={media} alt={alt} priority={priority} />
        <span className={styles.enlargeLabel}>{enlargeLabel}<span aria-hidden="true">↗</span></span>
      </button>
      <dialog ref={dialog} aria-labelledby={titleId} className={styles.dialog} style={{width: `min(${Math.max(600, media.width + (media.gutter ?? 0))}px, 96vw)`}} onClose={() => setOpen(false)} onClick={(event) => {if (event.target === event.currentTarget) dialog.current?.close();}}>
        {open ? <>
          <div className={styles.dialogHeading}>
            <h2 id={titleId}>{alt}</h2>
            <button type="button" onClick={() => dialog.current?.close()} autoFocus>{closeLabel}<span aria-hidden="true">×</span></button>
          </div>
          <div className={styles.dialogViewport} tabIndex={0} role="region" aria-label={`${enlargeLabel}: ${alt}`} dir="ltr">
            <div style={{width: Math.max(600, media.width + (media.gutter ?? 0))}}>
              <AnnotatedImage media={media} alt={alt} />
            </div>
          </div>
        </> : null}
      </dialog>
    </figure>
  );
}

function AnnotatedImage({media, alt, priority}: Pick<Props, "media" | "alt" | "priority">) {
  const stageWidth = media.width + (media.gutter ?? 0);
  return (
    <span className={styles.imageStage} style={{aspectRatio: `${stageWidth} / ${media.height}`}} dir="ltr">
      <Image src={media.src} alt={alt} width={media.width} height={media.height} sizes="(max-width: 767px) 94vw, 1100px" priority={priority} style={{width: `${media.width / stageWidth * 100}%`, height: "auto"}} />
      {media.markers?.map((marker) => {
        const dx = marker.labelX - marker.x;
        const dy = marker.labelY - marker.y;
        return <span key={marker.number} aria-hidden="true">
          <span className={styles.markerLine} style={{left: `${marker.x / stageWidth * 100}%`, top: `${marker.y / media.height * 100}%`, width: `${Math.hypot(dx, dy) / stageWidth * 100}%`, transform: `rotate(${Math.atan2(dy, dx)}rad)`}} />
          <span className={styles.marker} style={{left: `${marker.labelX / stageWidth * 100}%`, top: `${marker.labelY / media.height * 100}%`}}>{marker.number}</span>
        </span>;
      })}
    </span>
  );
}
