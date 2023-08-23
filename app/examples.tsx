import { CombineLatest } from "./components/scenes/CombineLatest";
import { Concat } from "./components/scenes/Concat";
import { ConcatAll } from "./components/scenes/ConcatAll";
import { ConcatMap } from "./components/scenes/ConcatMap";
import { FromEvent } from "./components/scenes/FromEvent";
import { Interval } from "./components/scenes/Interval";
import { Map } from "./components/scenes/Map";
import { Merge } from "./components/scenes/Merge";
import { MergeAll } from "./components/scenes/MergeAll";
import { Partition } from "./components/scenes/Partition";
import { SwitchAll } from "./components/scenes/SwitchAll";
import { Test } from "./components/scenes/Test";

export type Example = (typeof examples)[number]["name"];

const examples = [
  {
    name: "test" as const,
    scene: Test,
  },
  {
    name: "interval" as const,
    scene: Interval,
  },
  {
    name: "map" as const,
    scene: Map,
  },
  {
    name: "merge" as const,
    scene: Merge,
  },
  {
    name: "concat" as const,
    scene: Concat,
  },
  {
    name: "concatAll" as const,
    scene: ConcatAll,
  },
  {
    name: "switchAll" as const,
    scene: SwitchAll,
  },
  {
    name: "mergeAll" as const,
    scene: MergeAll,
  },
  {
    name: "concatMap" as const,
    scene: ConcatMap,
  },
  {
    name: "combineLatest" as const,
    scene: CombineLatest,
  },
  {
    name: "partition" as const,
    scene: Partition,
  },
  {
    name: "fromEvent" as const,
    scene: FromEvent,
  },
];

export default examples;
