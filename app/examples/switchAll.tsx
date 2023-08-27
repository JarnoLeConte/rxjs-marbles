import { map, of, range } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { delayInBetween } from "~/observables/delayInBetween";
import { box } from "~/utils";

const source$ = of("A", "B", "C").pipe(
  delayInBetween(3200),
  map((label) =>
    box({
      label,
      value: range(0, 4).pipe(delayInBetween(2200), boxed()),
    })
  )
);

const track: Track = {
  part: Part.Producer,
  props: {
    source$,
    displayText: "(A, B, C)",
  },
  tail: {
    part: Part.Ramp,
    tail: {
      part: Part.SwitchAll,
      tail: {
        part: Part.DownHill,
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
