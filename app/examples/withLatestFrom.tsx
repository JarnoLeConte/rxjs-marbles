import { map, of, switchMap, timer } from "rxjs";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Track } from "~/types";
import { Color, box } from "~/utils";

const A$ = timer(0, 4000).pipe(
  map((x) => x + 10),
  boxed({ color: Color.Blue })
);

const B$ = timer(2000, 4000).pipe(
  map((x) => x + 1),
  switchMap((x) => of(box({ value: x, color: Color.Red })))
);

const trackB: Track = {
  part: Part.Producer,
  props: {
    source$: B$,
    displayText: "",
  },
  tail: {
    part: Part.Ramp,
    tail: null,
  },
};

const track: Track = {
  part: Part.Producer,
  props: {
    source$: A$,
    displayText: "",
  },
  tail: {
    part: Part.WithLatestFrom,
    other: trackB,
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
