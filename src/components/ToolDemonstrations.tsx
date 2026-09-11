"use client";

import Image from "next/image";
import {useId, useRef, useState, type KeyboardEvent} from "react";
import {Link} from "@/i18n/navigation";
import styles from "./ToolDemonstrations.module.css";

export type ToolId = "select" | "point-edit" | "pencil" | "line" | "rectangle" | "circle" | "polygon" | "bezier";

export type ToolDemonstrationCopy = {
  title: string;
  intro: string;
  toolbarLabel: string;
  beforeLabel: string;
  afterLabel: string;
  zoomLabel: string;
  closeLabel: string;
  tools: Record<ToolId, {name: string; action: string; result: string}>;
};

export type ToolDemonstrationItem = {
  id: ToolId;
  number: number;
  uiLabel: string;
  before: string;
  after: string;
  width: number;
  height: number;
  gesture?: {from: [number, number]; to: [number, number]};
  clickPoints?: [number, number][];
};

type Props = {
  copy: ToolDemonstrationCopy;
  items: ToolDemonstrationItem[];
  toolbar: {src: string; width: number; height: number; positions: number[]};
  importGuide: {title: string; description: string};
};

export default function ToolDemonstrations({copy, items, toolbar, importGuide}: Props) {
  const prefix = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [selection, setSelection] = useState<ToolId>(items[0]?.id ?? "select");
  const [step, setStep] = useState<"before" | "after">("before");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const zoomTrigger = useRef<HTMLButtonElement | null>(null);
  const selected = items.find((item) => item.id === selection) ?? items[0];

  if (!selected) return null;

  const toolCopy = copy.tools[selected.id];
  const stepLabel = step === "before" ? copy.beforeLabel : copy.afterLabel;
  const stepCopy = step === "before" ? toolCopy.action : toolCopy.result;
  const imageSource = step === "before" ? selected.before : selected.after;
  const imageAlt = `${toolCopy.name}: ${stepCopy}`;

  function selectTool(index: number, focus = false) {
    setSelection(items[index].id);
    setStep("before");
    if (focus) tabs.current[index]?.focus();
  }

  function navigateTools(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = (index + (rtl ? -1 : 1) + items.length) % items.length;
        break;
      case "ArrowLeft":
        next = (index + (rtl ? 1 : -1) + items.length) % items.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = items.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectTool(next, true);
  }

  function gestureOverlay(enlarged = false) {
    if (step !== "before" || (!selected.gesture && !selected.clickPoints)) return null;
    const {from, to} = selected.gesture ?? {from: [0, 0], to: [0, 0]};
    const fromX = from[0] * selected.width;
    const fromY = from[1] * selected.height;
    const toX = to[0] * selected.width;
    const toY = to[1] * selected.height;
    const arrowId = `${prefix}-arrow-${enlarged ? "zoom" : "preview"}`;
    return (
      <svg className={styles.gesture} viewBox={`0 0 ${selected.width} ${selected.height}`} aria-hidden="true" focusable="false">
        <defs>
          <marker id={arrowId} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 1 1 L 11 6 L 1 11 Z" fill="#1a66cc" stroke="#fff" strokeWidth="0.8" />
          </marker>
        </defs>
        {selected.gesture && <>
        <path d={`M ${fromX} ${fromY} L ${toX} ${toY}`} fill="none" stroke="#fff" strokeWidth="8" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        <path d={`M ${fromX} ${fromY} L ${toX} ${toY}`} fill="none" stroke="#1a66cc" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" markerEnd={`url(#${arrowId})`} />
        <circle cx={fromX} cy={fromY} r="7" fill="#fff" stroke="#1a66cc" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </>}
        {selected.clickPoints?.map(([x, y], index) => (
          <g key={index} transform={`translate(${x * selected.width}, ${y * selected.height})`}>
            <circle r="22" fill="#1a66cc" stroke="#fff" strokeWidth="3" />
            <text fill="#fff" fontSize="24" fontWeight="600" textAnchor="middle" dominantBaseline="central">{index + 1}</text>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <section className={styles.guide} aria-labelledby={`${prefix}-title`}>
      <header className={styles.intro}>
        <h2 id={`${prefix}-title`}>{copy.title}</h2>
        <p>{copy.intro}</p>
      </header>

      <div className={styles.toolbarCard}>
        <p className={styles.toolbarLabel} id={`${prefix}-toolbar-label`}>{copy.toolbarLabel}</p>
        <div className={styles.toolbarViewport} dir="ltr">
        <div className={styles.toolbarImage}>
          <Image src={toolbar.src} alt={copy.toolbarLabel} width={toolbar.width} height={toolbar.height} sizes="(max-width: 767px) 90vw, 900px" unoptimized />
          <div className={styles.toolbarMarkers} role="group" aria-labelledby={`${prefix}-toolbar-label`}>
            {items.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={styles.toolbarMarker}
                style={{left: `${(toolbar.positions[index] ?? (index + 0.5) / items.length) * 100}%`}}
                aria-label={`${item.number}. ${copy.tools[item.id].name}`}
                aria-pressed={selected.id === item.id}
                aria-controls={`${prefix}-panel-${item.id}`}
                onClick={() => selectTool(index, true)}
              >
                {item.number}
              </button>
            ))}
          </div>
        </div>
        </div>
        <div className={styles.importGuide}>
          <Link href="/help/svg-import-export#import">{importGuide.title}<span aria-hidden="true">→</span></Link>
          <p>{importGuide.description}</p>
        </div>
      </div>

      <div className={styles.tabs} role="tablist" aria-label={copy.title} aria-orientation="horizontal">
        {items.map((item, index) => (
          <button
            type="button"
            role="tab"
            key={item.id}
            id={`${prefix}-tab-${item.id}`}
            aria-selected={selected.id === item.id}
            aria-controls={`${prefix}-panel-${item.id}`}
            tabIndex={selected.id === item.id ? 0 : -1}
            ref={(element) => {tabs.current[index] = element;}}
            onClick={() => selectTool(index)}
            onKeyDown={(event) => navigateTools(event, index)}
            className={styles.tab}
          >
            <span className={styles.tabNumber} aria-hidden="true">{item.number}</span>
            <span>{copy.tools[item.id].name}</span>
          </button>
        ))}
      </div>

      {items.map((item) => (
        <div key={item.id} role="tabpanel" id={`${prefix}-panel-${item.id}`} aria-labelledby={`${prefix}-tab-${item.id}`} hidden={selected.id !== item.id} className={styles.panel}>
          {selected.id === item.id && (
            <>
              <div className={styles.panelHeader}>
                <div className={styles.toolTitle}>
                  <span className={styles.selectedNumber} aria-hidden="true">{item.number}</span>
                  <div>
                    <h3>{toolCopy.name}</h3>
                    {item.uiLabel !== toolCopy.name && <p lang="en" dir="ltr">{item.uiLabel}</p>}
                  </div>
                </div>
                <div className={styles.steps} role="group" aria-label={toolCopy.name}>
                  <button type="button" aria-pressed={step === "before"} onClick={() => setStep("before")}><span aria-hidden="true">1</span><span className={styles.stepText}>{copy.beforeLabel}</span></button>
                  <button type="button" aria-pressed={step === "after"} onClick={() => setStep("after")}><span aria-hidden="true">2</span><span className={styles.stepText}>{copy.afterLabel}</span></button>
                </div>
              </div>
              <p className={styles.instruction} aria-live="polite" aria-atomic="true">{stepCopy}</p>
              <button
                type="button"
                className={styles.screenshot}
                aria-haspopup="dialog"
                aria-label={`${copy.zoomLabel}: ${toolCopy.name} — ${stepLabel}`}
                onClick={(event) => {
                  zoomTrigger.current = event.currentTarget;
                  dialog.current?.showModal();
                }}
              >
                <span className={styles.screenshotImage}>
                  <Image src={imageSource} alt={imageAlt} width={item.width} height={item.height} sizes="(max-width: 767px) 90vw, 1200px" unoptimized />
                  {gestureOverlay()}
                </span>
                <span className={styles.zoomHint}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M8 3H3v5M12 3h5v5M3 12v5h5m9-5v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {copy.zoomLabel}
                </span>
              </button>
            </>
          )}
        </div>
      ))}

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby={`${prefix}-dialog-title`}
        aria-describedby={`${prefix}-dialog-description`}
        onClose={() => zoomTrigger.current?.focus()}
        onClick={(event) => {if (event.target === event.currentTarget) dialog.current?.close();}}
      >
        <div className={styles.dialogContent}>
          <div className={styles.dialogHeader}>
            <h3 id={`${prefix}-dialog-title`}>{toolCopy.name}<span>{stepLabel}</span></h3>
            <button type="button" onClick={() => dialog.current?.close()} aria-label={copy.closeLabel} autoFocus>×</button>
          </div>
          <p id={`${prefix}-dialog-description`}>{stepCopy}</p>
          <div className={styles.enlargedViewport} tabIndex={0} role="region" aria-label={`${copy.zoomLabel}: ${toolCopy.name}`}>
            <div className={styles.enlargedImage} style={{width: selected.width}}>
              <Image src={imageSource} alt={imageAlt} width={selected.width} height={selected.height} unoptimized />
              {gestureOverlay(true)}
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
}
