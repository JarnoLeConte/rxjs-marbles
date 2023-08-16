import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import type { ObservableBuilder, OperatorBuilder } from "~/types";
import type { TrackHead, TrackTail } from "./track/parts";
import { Part } from "./track/parts";
import { Empty } from "./track/reactive-track/Empty";
import { Identity } from "./track/reactive-track/Identity";
import { Map } from "./track/reactive-track/Map";
import { Producer } from "./track/reactive-track/Producer";
import { Ramp } from "./track/reactive-track/Ramp";
import { Concat } from "./track/reactive-track/Concat";
import { Straight } from "./track/reactive-track/Straight";
import { Observer } from "./track/reactive-track/Observer";
import { CombineLatest } from "./track/reactive-track/CombineLatest";
import { DownHill } from "./track/reactive-track/DownHill";

export const Build = forwardRef(function Build(
  { track }: { track: TrackHead },
  ref: ForwardedRef<ObservableBuilder>
) {
  switch (track.part) {
    case Part.Producer:
      return <Producer ref={ref} track={track} />;
    case Part.Concat:
      return <Concat ref={ref} track={track} />;
    case Part.CombineLatest:
      return <CombineLatest ref={ref} track={track} />;
    default:
      return <Empty ref={ref} />;
  }
});

export const BuildTail = forwardRef(function BuildTail(
  { track }: { track: TrackTail },
  ref: ForwardedRef<OperatorBuilder>
) {
  switch (track?.part) {
    case Part.Subscriber:
      return <Observer ref={ref} track={track} />;
    case Part.Straight:
      return <Straight ref={ref} track={track} />;
    case Part.Ramp:
      return <Ramp ref={ref} track={track} />;
    case Part.DownHill:
      return <DownHill ref={ref} track={track} />;
    case Part.Map:
      return <Map ref={ref} track={track} />;
    default:
      return <Identity ref={ref} />;
  }
});
