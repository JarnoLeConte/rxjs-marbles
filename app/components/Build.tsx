import type { ForwardedRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import type { ObservableBuilder, OperatorBuilder } from "~/types";
import type { TrackHead, TrackTail } from "./track/parts";
import { Part } from "./track/parts";
import { Map } from "./track/reactive-track/Map";
import { Producer } from "./track/reactive-track/Producer";
import { Ramp } from "./track/reactive-track/Ramp";
import { EMPTY, pipe } from "rxjs";

export const Build = forwardRef(function Build(
  { track }: { track: TrackHead },
  ref: ForwardedRef<ObservableBuilder>
) {
  useImperativeHandle(ref, () => ({ build: () => EMPTY }), []);

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
  ref: ForwardedRef<OperatorBuilder>
) {
  useImperativeHandle(ref, () => ({ build: () => pipe() }), []);

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
