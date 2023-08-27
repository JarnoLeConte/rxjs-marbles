import { range, take, timer } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { box, numberToChar } from "~/utils";

const source$ = timer(0, 3000).pipe(take(4), boxed());

const track: Track = {
  part: Part.Producer,
  props: {
    source$,
    displayText: "(0, 1, 2, 3)",
  },
  tail: {
    part: Part.Ramp,
    tail: {
      part: Part.Map,
      props: {
        project: (value) =>
          box(range(1, 3).pipe(boxed()), numberToChar(Number(value))),
        displayText: `map
0→A, 1→B,
2→C, 3→D`,
      },
      tail: {
        part: Part.ConcatAll,
        tail: {
          part: Part.Subscriber,
        },
      },
    },
  },
};

export default {
  main: track,
};
