import { CombineLatest } from "./components/track/scenes/CombineLatest";
import { Concat } from "./components/track/scenes/Concat";
import { ConcatAll } from "./components/track/scenes/ConcatAll";
import { ConcatMap } from "./components/track/scenes/ConcatMap";
import { FromEvent } from "./components/track/scenes/FromEvent";
import { Interval } from "./components/track/scenes/Interval";
import { Map } from "./components/track/scenes/Map";
import { Merge } from "./components/track/scenes/Merge";
import { MergeAll } from "./components/track/scenes/MergeAll";
import { SwitchAll } from "./components/track/scenes/SwitchAll";
import { Test } from "./components/track/scenes/Test";

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
