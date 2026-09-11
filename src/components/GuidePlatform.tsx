"use client";

import {useSyncExternalStore, type ReactNode} from "react";
import styles from "./GuidePlatform.module.css";

// Keep in sync with GuidePlatform.module.css. The second clause keeps an
// iPhone in landscape on the phone guide, even when it is wider than 767px.
const phoneQuery = "(max-width: 767px), (max-width: 1023px) and (hover: none) and (pointer: coarse)";
const subscribe = (callback: () => void) => {
  const query = window.matchMedia(phoneQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const getSnapshot = () => window.matchMedia(phoneQuery).matches;
const getServerSnapshot = () => null;

export default function GuidePlatform({platform, children, as: Tag = "div"}: {platform: "desktop" | "iphone"; children: ReactNode; as?: "div" | "li"}) {
  const phone = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // CSS selects the right server-rendered content before hydration and when
  // JavaScript is unavailable. Afterwards, unmount the inactive controls/media.
  if (phone !== null && phone !== (platform === "iphone")) return null;
  return <Tag className={styles[platform]} data-guide-platform={platform}>{children}</Tag>;
}
