"use client";

import {useSyncExternalStore} from "react";

import {isAppStoreCountry} from "@/config/product";

const storageKey = "jigsawdesigner.app-store-country";
const changeEvent = "jigsawdesigner:app-store-country";
// Used only by client interactions when browser storage is unavailable.
let memoryPreference: string | null = null;

function getSnapshot() {
  if (memoryPreference !== null) return memoryPreference;
  try {
    const value = window.localStorage.getItem(storageKey) ?? "";
    return isAppStoreCountry(value) ? value : "";
  } catch {
    return "";
  }
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      memoryPreference = null;
      onChange();
    }
  };
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useAppStoreCountry() {
  return useSyncExternalStore(subscribe, getSnapshot, () => "");
}

export function setAppStoreCountry(country: string) {
  const value = isAppStoreCountry(country) ? country : "";
  try {
    if (value) window.localStorage.setItem(storageKey, value);
    else window.localStorage.removeItem(storageKey);
    memoryPreference = null;
  } catch {
    // The current page can still respect the choice in private/restricted modes.
    memoryPreference = value;
  }
  window.dispatchEvent(new Event(changeEvent));
}
