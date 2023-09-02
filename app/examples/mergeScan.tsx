import { map, range } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { box, numberToColor } from "~/utils";

const track: Track = {
  part: Part.Producer,
  props: {
    source$: range(1, 3).pipe(
      map((value) => box({ value, color: numberToColor(value) }))
    ),
    displayText: "(1, 2, 3)",
  },
  tail: {
    part: Part.Ramp,
    tail: {
      part: Part.MergeScan,
      props: {
        accumulator: (boxedAcc, { value, color }, index) => {
          const acc = Number(boxedAcc.value);
          return box({
            value: range(acc + 1, 3).pipe(boxed({ color })),
            label: `(${acc + 1}, ${acc + 2}, ${acc + 3})`,
            color,
          });
        },
        seed: box({ value: 0, color: "white" }),
        accumulatorText: `input —>\n(ā+1, ā+2, ā+3)`,
        displayText: "mergeScan(1)",
        concurrent: 1,
      },
      tail: {
        part: Part.Straight,
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
