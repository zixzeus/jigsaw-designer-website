import Image from "next/image";
import {getMediaDimensions} from "@/config/media";

type Props = {before: string; after: string; beforeLabel: string; afterLabel: string; title: string};

// Native radio controls work with arrows, touch, reduced motion, and without JavaScript.
export default function OutlineComparison({before, after, beforeLabel, afterLabel, title}: Props) {
  return (
    <fieldset className="outline-comparison">
      <legend className="sr-only">{title}</legend>
      <div className="comparison-controls">
        <input className="sr-only" type="radio" name="outline-preview" id="outline-before" value="before" />
        <label htmlFor="outline-before">{beforeLabel}</label>
        <input className="sr-only" type="radio" name="outline-preview" id="outline-after" value="after" defaultChecked />
        <label htmlFor="outline-after">{afterLabel}</label>
      </div>
      <div className="comparison-visual">
        <Image src={before} alt={beforeLabel} {...getMediaDimensions(before)} sizes="(max-width: 900px) 100vw, 744px" className="comparison-before" />
        <Image src={after} alt={afterLabel} {...getMediaDimensions(after)} sizes="(max-width: 900px) 100vw, 744px" className="comparison-after" />
      </div>
    </fieldset>
  );
}
