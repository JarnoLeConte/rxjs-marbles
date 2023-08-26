import { map, timer } from "rxjs";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Track } from "~/types";

const A$ = timer(0, 1500).pipe(
  map((x) => 1 + x),
  boxed()
);

const B$ = timer(0, 1500).pipe(
  map((x) => (1 + x) * 10),
  boxed()
);

const trackA: Track = {
  part: Part.Producer,
  props: {
    source$: A$,
    displayText: `A (1, 2, 3, ...)`,
  },
  tail: {
    part: Part.Ramp,
    tail: null,
  },
};

const trackB: Track = {
  part: Part.Producer,
  props: {
    source$: B$,
    displayText: "B (10, 20, 30, ...)",
  },
  tail: {
    part: Part.Ramp,
    tail: {
      part: Part.Straight,
      tail: null,
    },
  },
};

const track: Track = {
  part: Part.Merge,
  incoming: [trackA, trackB],
  props: {
    displayText: "merge(A, B)",
  },
  tail: {
    part: Part.Subscriber,
    props: {
      displayText: ".subscribe(...)",
    },
  },
};

export default {
  main: track,
};
