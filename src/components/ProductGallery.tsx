"use client";

import Image from "next/image";
import {useState} from "react";

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export default function ProductGallery({items}: {items: GalleryItem[]}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0];

  if (!activeItem) return null;

  return (
    <div className="mt-10">
      <figure className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        <div className="relative aspect-[16/9] bg-[#e9eef4] dark:bg-[#11151a]">
          <Image
            key={activeItem.src}
            src={activeItem.src}
            alt={activeItem.alt}
            fill
            sizes="(max-width: 768px) calc(100vw - 2.5rem), 1152px"
            className="object-contain p-2 sm:p-4"
          />
        </div>
        <figcaption className="flex items-center justify-between gap-4 border-t border-border px-5 py-4 text-sm font-medium sm:px-6">
          <span>{activeItem.caption}</span>
          <span className="shrink-0 tabular-nums text-gray-500" aria-hidden="true">
            {activeIndex + 1} / {items.length}
          </span>
        </figcaption>
      </figure>

      <div className="-mx-5 mt-4 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
        <div className="flex min-w-max gap-3 md:grid md:min-w-0 md:grid-cols-3 lg:grid-cols-5">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.src}
                type="button"
                aria-label={item.caption}
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className={`group w-44 overflow-hidden rounded-2xl border bg-background text-start transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2 md:w-auto dark:focus-visible:ring-primary-light ${
                  isActive
                    ? "border-primary shadow-sm"
                    : "border-border hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                <span className="relative block aspect-[16/10] bg-[#e9eef4] dark:bg-[#11151a]">
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 176px, 25vw"
                    className="object-contain p-2 transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                </span>
                <span className="block border-t border-border px-3 py-3 text-sm font-medium">
                  {item.caption}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
