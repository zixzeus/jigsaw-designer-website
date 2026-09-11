"use client";

import Image from "next/image";
import {useState} from "react";

type VideoFacadeProps = {
  title: string;
  playLabel: string;
  poster?: string;
} & ({src: string; videoId?: never} | {videoId: string; src?: never});

export default function VideoFacade({videoId, src, title, playLabel, poster = "/video-poster-v1-6.webp"}: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="video-facade" data-video-src={src} data-youtube-id={videoId}>
      {playing && !failed ? src ? (
        <video ref={(element) => {element?.focus();}} className="h-full w-full" src={src} controls autoPlay playsInline muted tabIndex={0} aria-label={title} onError={() => setFailed(true)} />
      ) : (
        <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`} title={title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <button type="button" onClick={() => {setFailed(false); setPlaying(true);}} className="video-play-button" aria-label={playLabel}>
          <Image src={poster} alt="" fill sizes="(max-width: 900px) 90vw, 1280px" className="object-contain" />
          <span className="video-play-icon" aria-hidden="true">▶</span>
          <span className="video-play-caption">{playLabel}</span>
        </button>
      )}
      {failed && src ? <a className="video-fallback" href={src}>{title} ↗</a> : null}
    </div>
  );
}
