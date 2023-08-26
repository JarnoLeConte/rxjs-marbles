import { map, of, range } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { delayInBetween } from "~/observables/delayInBetween";

const source$ = of("A", "B", "C", "D").pipe(
  delayInBetween(3000),
  map((label) => ({ label, value: range(1, 3).pipe(boxed()) }))
);

const track: Track = {
  part: Part.Producer,
  props: {
    source$,
  },
  tail: {
    part: Part.ConcatAll,
    tail: {
      part: Part.DownHill,
      tail: {
        part: Part.Subscriber,
      },
    },
  },
};

export default {
  main: track,
};
