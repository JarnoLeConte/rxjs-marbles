import { Model } from "~/components/Model";
import { CombineLatest } from "~/examples/CombineLatest";
import { Concat } from "~/examples/Concat";
import { ConcatAll } from "~/examples/ConcatAll";
import { ConcatMap } from "~/examples/ConcatMap";
import { Interval } from "~/examples/Interval";
import { Map } from "~/examples/Map";
import { Merge } from "~/examples/Merge";
import { MergeAll } from "~/examples/MergeAll";
import { SwitchAll } from "~/examples/SwitchAll";
import { Test } from "~/examples/Test";

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

export function Example({ example }: { example: ExampleEnum }) {
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
