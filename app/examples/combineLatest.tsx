import { map, of, switchMap, timer } from "rxjs";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Track } from "~/types";
import { Color, box } from "~/utils";

const A$ = timer(0, 9000).pipe(
  map((x) => x + 10),
  boxed({ color: Color.Blue })
);

const B$ = timer(0, 9000).pipe(
  map((x) => x * 2 + 1),
  switchMap((x) =>
    of(
      box({ value: x, color: Color.Red }),
      box({ value: x + 1, color: Color.Green })
    )
  )
);

const trackA: Track = {
  part: Part.Producer,
  props: {
    source$: A$,
    displayText: "",
  },
  tail: null,
};

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
  part: Part.CombineLatest,
  incoming: [trackA, trackB],
  tail: {
    part: Part.DownHill,
    tail: {
      part: Part.Subscriber,
    },
  },
};

export default {
  main: track,
};
