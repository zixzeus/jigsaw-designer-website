import {useId} from "react";

import type {HomePageContent} from "@/content/home-pages";

export default function CutlineDiagram({content}: {content: HomePageContent["primer"]}) {
  const diagramId = useId();
  const titleId = `${diagramId}-title`;
  const descriptionId = `${diagramId}-description`;
  const markerPositions = {
    perimeter: {x: 154, y: 82},
    "piece-boundaries": {x: 385, y: 112},
    interlock: {x: 278, y: 267},
    whimsy: {x: 385, y: 218},
  } as const;

  return (
    <figure data-cutline-diagram="true" className="overflow-hidden rounded-[1.6rem] border border-border bg-background">
      <div dir="ltr" className="technical-grid p-2 sm:p-4 md:p-6">
        <svg role="img" aria-labelledby={`${titleId} ${descriptionId}`} viewBox="86 28 565 378" className="h-auto w-full text-foreground">
          <title id={titleId}>{content.title}</title>
          <desc id={descriptionId}>{content.intro}</desc>

          <path d="M154 82C220 42 310 69 370 53C440 34 548 54 598 111C650 171 631 267 589 331C546 397 445 378 373 389C291 402 177 384 139 311C98 232 89 122 154 82Z" fill="var(--background)" stroke="currentColor" strokeWidth="4" />

          <g fill="none" stroke="var(--primary)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
            <path d="M385 51C383 91 376 119 385 165" />
            <path d="M118 205C177 207 206 199 232 215C264 235 243 267 278 267C307 267 290 232 330 205" />
            <path d="M440 205C475 202 487 185 511 194C535 203 518 228 546 235C572 241 601 224 626 207" />
            <path d="M352 268C330 292 307 291 295 317C282 344 275 365 247 380" />
            <path d="M418 268C438 292 436 319 425 343C418 357 414 371 410 383" />
          </g>

          <path d="M385 165L399 203L440 205L407 229L418 268L385 246L352 268L363 229L330 205L371 203Z" fill="var(--primary-ultra-light)" stroke="var(--primary)" strokeLinejoin="round" strokeWidth="4" />

          <circle cx="278" cy="267" r="28" fill="none" stroke="var(--primary)" strokeDasharray="5 7" strokeWidth="2" />

          {content.parts.map((part) => {
            const {x, y} = markerPositions[part.id];
            return (
              <g key={part.id} transform={`translate(${x} ${y})`} aria-hidden="true">
                <circle r="22" fill="var(--primary-dark)" stroke="var(--background)" strokeWidth="4" />
                <text y="0" dominantBaseline="central" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" className="text-[26px] sm:text-base">{part.number.replace(/^0/, "")}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="border-t border-border p-5 md:p-6">
        <ol className="grid gap-x-7 gap-y-5 sm:grid-cols-2">
          {content.parts.map((part) => (
            <li key={part.id} data-cutline-part={part.id} className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-dark text-xs font-bold tabular-nums text-white" aria-hidden="true">{part.number.replace(/^0/, "")}</span>
              <div>
                <h3 className="font-semibold leading-6">{part.title}</h3>
                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{part.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-primary-dark dark:text-primary-light">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none">
            <path d="M7 3.5h7l4 4V20.5H7zM14 3.5v4h4M10 13h5M10 16h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
          </svg>
          <span>{content.svgLabel}</span>
        </p>
      </figcaption>
    </figure>
  );
}
