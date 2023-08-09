import { Model } from "~/components/Model";
import { ConcatAll } from "~/components/examples/ConcatAll";
import { ConcatMap } from "~/components/examples/ConcatMap";
import { Interval } from "~/components/examples/Interval";
import { Map } from "~/components/examples/Map";
import { Merge } from "~/components/examples/Merge";
import { MergeAll } from "~/components/examples/MergeAll";
import { SwitchAll } from "~/components/examples/SwitchAll";
import { Test } from "~/components/examples/Test";

export enum ExampleEnum {
  None = "-",
  Map = "map",
  Interval = "interval",
  SwitchAll = "switchAll",
  MergeAll = "mergeAll",
  ConcatAll = "concatAll",
  ConcatMap = "concatMap",
  Merge = "merge",
  Test = "test",
}

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
    case "test":
      return <Test />;
  }
}

export const defaultExample = ExampleEnum.Merge;
