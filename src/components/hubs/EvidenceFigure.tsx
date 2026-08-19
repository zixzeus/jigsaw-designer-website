import Image from "next/image";

import {getMediaDimensions} from "@/config/media";
import type {MediaEvidence} from "@/content/types";

export default function EvidenceFigure({
  evidence,
  label,
  sourcePrefix,
  priority = false,
  sizes = "(max-width: 768px) calc(100vw - 3rem), 50vw",
  className = "",
}: {
  evidence: MediaEvidence;
  label?: string;
  sourcePrefix: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const {width, height} = getMediaDimensions(evidence.src);
  const isConcept = evidence.source.kind === "ai-concept";

  return (
    <figure
      data-media-evidence="true"
      data-media-source={evidence.source.kind}
      data-media-source-label={evidence.source.label}
      className={`overflow-hidden rounded-3xl border border-border bg-background shadow-sm ${className}`}
    >
      <div className="relative bg-background-secondary">
        {label ? (
          <span className="absolute start-4 top-4 z-10 rounded-full border border-white/20 bg-black/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {label}
          </span>
        ) : null}
        {isConcept ? (
          <span
            data-concept-label="true"
            className="absolute end-4 top-4 z-10 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-950"
          >
            {evidence.conceptLabel}
          </span>
        ) : null}
        <Image
          src={evidence.src}
          alt={evidence.alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      <figcaption className="space-y-2 border-t border-border px-5 py-4 text-sm leading-6">
        {evidence.caption ? <p className="text-foreground">{evidence.caption}</p> : null}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {sourcePrefix}: {evidence.source.label}
        </p>
      </figcaption>
    </figure>
  );
}
