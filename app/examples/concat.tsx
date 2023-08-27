import { range } from "rxjs";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Track } from "~/types";

const A$ = range(1, 3).pipe(boxed());
const B$ = range(1, 3).pipe(boxed());

const trackA: Track = {
  part: Part.Producer,
  props: {
    source$: A$,
    displayText: "A (1, 2, 3)",
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
    displayText: "B (1, 2, 3)",
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
  part: Part.Concat,
  incoming: [trackA, trackB],
  props: {
    displayText: "concat(A, B)",
  },
  tail: {
    part: Part.Subscriber,
  },
};

export default {
  main: track,
};
