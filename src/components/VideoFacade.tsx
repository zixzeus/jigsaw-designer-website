"use client";

import Image from "next/image";
import {useState} from "react";

type VideoFacadeProps = {
  videoId: string;
  title: string;
  playLabel: string;
  poster?: string;
};

export default function VideoFacade({
  videoId,
  title,
  playLabel,
  poster = "/video-poster-v1-6.webp",
}: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
      {playing ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={playLabel}
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/10" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl text-primary-dark shadow-xl transition-transform group-hover:scale-105">
            <span className="translate-x-0.5" aria-hidden="true">
              ▶
            </span>
          </span>
          <span className="absolute inset-x-6 bottom-6 text-start text-sm font-semibold text-white">
            {playLabel}
          </span>
        </button>
      )}
    </div>
  );
}
