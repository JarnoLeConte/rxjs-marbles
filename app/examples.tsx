import { CombineLatest } from "./components/scenes/CombineLatest";
import { Concat } from "./components/scenes/Concat";
import { ConcatAll } from "./components/scenes/ConcatAll";
import { ConcatMap } from "./components/scenes/ConcatMap";
import { FromEvent } from "./components/scenes/FromEvent";
import { Interval } from "./components/scenes/Interval";
import { Map } from "./components/scenes/Map";
import { Merge } from "./components/scenes/Merge";
import { MergeAll } from "./components/scenes/MergeAll";
import { SwitchAll } from "./components/scenes/SwitchAll";
import { Test } from "./components/scenes/Test";

export type Example = (typeof examples)[number]["name"];

const examples = [
  {
    name: "test" as const,
    scene: Test,
  },
  {
    name: "map" as const,
    scene: Map,
  },
  {
    name: "interval" as const,
    scene: Interval,
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
    name: "concatAll" as const,
    scene: ConcatAll,
  },
  {
    name: "concatMap" as const,
    scene: ConcatMap,
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
    name: "combineLatest" as const,
    scene: CombineLatest,
  },
  {
    name: "fromEvent" as const,
    scene: FromEvent,
  },
];

export default examples;
