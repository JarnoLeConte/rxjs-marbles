import { interval, of } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { box } from "~/utils";

const track: Track = {
  part: Part.Producer,
  props: {
    source$: of(1, 2, 3).pipe(boxed()),
    displayText: "(1, 2, 3)",
  },
  tail: {
    part: Part.Ramp,
    tail: {
      part: Part.DelayWhen,
      props: {
        displayText: "delayWhen",
        durationSelector: () => box({ value: interval(2000).pipe(boxed()) }),
        durationSelectorText: "interval(2s)",
      },
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
