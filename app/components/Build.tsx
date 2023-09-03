import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import type { ObservableBuilder, OperatorBuilder } from "~/types";
import type { TrackHead, TrackTail } from "./track/parts";
import { Part } from "./track/parts";
import { CombineLatest } from "./track/parts/CombineLatest";
import { Concat } from "./track/parts/Concat";
import { ConcatAll } from "./track/parts/ConcatAll";
import { DownHill } from "./track/parts/DownHill";
import { Empty } from "./track/parts/Empty";
import { Identity } from "./track/parts/Identity";
import { Map } from "./track/parts/Map";
import { Merge } from "./track/parts/Merge";
import { MergeAll } from "./track/parts/MergeAll";
import { MergeMap } from "./track/parts/MergeMap";
import { MergeScan } from "./track/parts/MergeScan";
import { Observer } from "./track/parts/Observer";
import { Partition } from "./track/parts/Partition";
import { PreviewObserver } from "./track/parts/PreviewObserver";
import { Producer } from "./track/parts/Producer";
import { Ramp } from "./track/parts/Ramp";
import { Straight } from "./track/parts/Straight";
import { SwitchAll } from "./track/parts/SwitchAll";
import { WithLatestFrom } from "./track/parts/WithLatestFrom";

export const Build = forwardRef(function Build(
  { track }: { track: TrackHead },
  ref: ForwardedRef<ObservableBuilder>
) {
  if (!track) {
    return <Empty ref={ref} />;
  }

  switch (track.part) {
    case Part.Producer:
      return <Producer ref={ref} track={track} />;
    case Part.Concat:
      return <Concat ref={ref} track={track} />;
    case Part.Merge:
      return <Merge ref={ref} track={track} />;
    case Part.CombineLatest:
      return <CombineLatest ref={ref} track={track} />;
    default:
      throw new Error(
        `Unknown how to construct observable from track part ${track}`
      );
  }
});

export const BuildTail = forwardRef(function BuildTail(
  { track }: { track: TrackTail },
  ref: ForwardedRef<OperatorBuilder>
) {
  if (!track) {
    return <Identity ref={ref} />;
  }

  switch (track.part) {
    case Part.Subscriber:
      return <Observer ref={ref} track={track} />;
    case Part.PreviewObserver:
      return <PreviewObserver ref={ref} track={track} />;
    case Part.Straight:
      return <Straight ref={ref} track={track} />;
    case Part.Ramp:
      return <Ramp ref={ref} track={track} />;
    case Part.DownHill:
      return <DownHill ref={ref} track={track} />;
    case Part.Map:
      return <Map ref={ref} track={track} />;
    case Part.MergeAll:
      return <MergeAll ref={ref} track={track} />;
    case Part.MergeMap:
      return <MergeMap ref={ref} track={track} />;
    case Part.MergeScan:
      return <MergeScan ref={ref} track={track} />;
    case Part.SwitchAll:
      return <SwitchAll ref={ref} track={track} />;
    case Part.ConcatAll:
      return <ConcatAll ref={ref} track={track} />;
    case Part.Partition:
      return <Partition ref={ref} track={track} />;
    case Part.WithLatestFrom:
      return <WithLatestFrom ref={ref} track={track} />;
    default:
      throw new Error(
        `Unknown how to construct pipe operator from track ${track}`
      );
  }
});
