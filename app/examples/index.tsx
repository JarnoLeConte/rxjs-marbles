import combineLatest from "./combineLatest";
import concat from "./concat";
import concatAll from "./concatAll";
import concatMap from "./concatMap";
import fromEvent from "./fromEvent";
import interval from "./interval";
import map from "./map";
import mapConcatAll from "./mapConcatAll";
import merge from "./merge";
import mergeAll from "./mergeAll";
import mergeMap from "./mergeMap";
import mergeScan from "./mergeScan";
import partition from "./partition";
import switchAll from "./switchAll";
import test from "./test";

export type Example = (typeof examples)[number]["name"];

const examples = [
  {
    name: "test" as const,
    trackRecord: test,
  },
  {
    name: "interval" as const,
    trackRecord: interval,
  },
  {
    name: "map" as const,
    trackRecord: map,
  },
  {
    name: "merge" as const,
    trackRecord: merge,
  },
  {
    name: "concat" as const,
    trackRecord: concat,
  },
  {
    name: "concatAll" as const,
    trackRecord: concatAll,
  },
  {
    name: "mapConcatAll" as const,
    trackRecord: mapConcatAll,
  },
  {
    name: "concatMap" as const,
    trackRecord: concatMap,
  },
  {
    name: "switchAll" as const,
    trackRecord: switchAll,
  },
  {
    name: "mergeAll" as const,
    trackRecord: mergeAll,
  },
  {
    name: "mergeMap" as const,
    trackRecord: mergeMap,
  },
  {
    name: "mergeScan" as const,
    trackRecord: mergeScan,
  },
  {
    name: "combineLatest" as const,
    trackRecord: combineLatest,
  },
  {
    name: "partition" as const,
    trackRecord: partition,
  },
  {
    name: "fromEvent" as const,
    trackRecord: fromEvent,
  },
];

export default examples;
