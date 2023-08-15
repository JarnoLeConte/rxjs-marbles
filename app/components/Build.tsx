import { forwardRef } from "react";
import type { Observable, OperatorFunction } from "rxjs";
import type { Value } from "~/types";
import type { TrackHead, TrackTail } from "./track/parts";
import { Part } from "./track/parts";
import { Map } from "./track/track-parts/Map";
import { Producer } from "./track/track-parts/Producer";
import { Ramp } from "./track/track-parts/Ramp";

export const Build = forwardRef(function Build(
  { track }: { track: TrackHead },
  ref: React.ForwardedRef<Observable<Value>>
) {
  if (!track) return null;

  switch (track.part) {
    case Part.Producer:
      return <Producer ref={ref} track={track} />;
    default:
      return null;
  }
});

export const BuildTail = forwardRef(function BuildTail(
  { track }: { track: TrackTail },
  ref: React.ForwardedRef<OperatorFunction<Value, Value>>
) {
  if (!track) return null;

  switch (track.part) {
    case Part.Ramp:
      return <Ramp ref={ref} track={track} />;
    case Part.Map:
      return <Map ref={ref} track={track} />;
    default:
      return null;
  }
});
