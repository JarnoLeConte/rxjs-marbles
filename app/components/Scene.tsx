import { Model } from "~/components/Model";
import { CombineLatest } from "~/components/track/scenes/CombineLatest";
import { Concat } from "~/components/track/scenes/Concat";
import { ConcatAll } from "~/components/track/scenes/ConcatAll";
import { ConcatMap } from "~/components/track/scenes/ConcatMap";
import { Interval } from "~/components/track/scenes/Interval";
import { Map } from "~/components/track/scenes/Map";
import { Merge } from "~/components/track/scenes/Merge";
import { MergeAll } from "~/components/track/scenes/MergeAll";
import { SwitchAll } from "~/components/track/scenes/SwitchAll";
import { Test } from "~/components/track/scenes/Test";

export enum ExampleEnum {
  None = "-",
  Map = "map",
  Interval = "interval",
  SwitchAll = "switchAll",
  MergeAll = "mergeAll",
  ConcatAll = "concatAll",
  ConcatMap = "concatMap",
  Merge = "merge",
  Concat = "concat",
  CombineLatest = "combineLatest",
  Test = "test",
}

export const defaultExample = ExampleEnum.Test;

export function Scene({ example }: { example: ExampleEnum }) {
  switch (example) {
    case "-":
      return <Model />;
    case "map":
      return <Map />;
    case "interval":
      return <Interval />;
    case "switchAll":
      return <SwitchAll />;
    case "mergeAll":
      return <MergeAll />;
    case "concatAll":
      return <ConcatAll />;
    case "concatMap":
      return <ConcatMap />;
    case "merge":
      return <Merge />;
    case "concat":
      return <Concat />;
    case "combineLatest":
      return <CombineLatest />;
    case "test":
      return <Test />;
  }
}
