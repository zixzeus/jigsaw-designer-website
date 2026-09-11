"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {Link} from "@/i18n/navigation";
import {getMediaDimensions} from "@/config/media";

type Props = {titles: string[]; closeLabel: string; detailLabel: string};
const artwork = ["dragon", "fruit", "sprite"] as const;
const artworkSources = {dragon: "/product/dragon-default-desktop-v1.svg", fruit: "/product/fruit-v1.svg", sprite: "/product/sprite-v1.svg"} as const;

export default function ArtworkGallery({titles, closeLabel, detailLabel}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selection, setSelection] = useState<number | null>(null);
  const selected = selection ?? 0;
  useEffect(() => {
    if (selection !== null) dialog.current?.showModal();
  }, [selection]);
  return (
    <>
      <div className="artwork-grid">
        {artwork.map((name, index) => (
          <article key={name}>
            <button type="button" className="artwork-card" aria-label={titles[index]} aria-haspopup="dialog" onClick={() => setSelection(index)}>
              <span className="artwork-surface">
                <Image src={artworkSources[name]} alt={titles[index]} {...getMediaDimensions(artworkSources[name])} sizes="(max-width: 767px) 90vw, 400px" />
              </span>
              <span className="artwork-caption">{titles[index]}<span aria-hidden="true">↗</span></span>
            </button>
          </article>
        ))}
      </div>
      <dialog ref={dialog} onClose={() => setSelection(null)} className="artwork-dialog" aria-labelledby="artwork-dialog-title" onClick={(event) => {if (event.target === event.currentTarget) dialog.current?.close();}}>
        <div className="artwork-dialog-content">
          <div className="artwork-dialog-heading"><h2 id="artwork-dialog-title">{titles[selected]}</h2><button type="button" onClick={() => dialog.current?.close()} aria-label={closeLabel} autoFocus>×</button></div>
          <Image src={artworkSources[artwork[selected]]} alt={titles[selected]} {...getMediaDimensions(artworkSources[artwork[selected]])} sizes="90vw" />
          <Link href="/svg-puzzle-editor" className="text-link">{detailLabel}<span aria-hidden="true">→</span></Link>
        </div>
      </dialog>
    </>
  );
}
