import { map, range } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { box, numberToChar, numberToColor } from "~/utils";

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
      part: Part.MergeMap,
      props: {
        project: ({ value, color }, index) =>
          box({
            value: range(index * 3 + 1, 3).pipe(boxed({ color })),
            label: numberToChar(Number(value)),
            color,
          }),
        projectionText: `1 —> A (1, 2, 3)
2 —> B (4, 5, 6)
3 —> C (7, 8, 9)`,
        displayText: "mergeMap(2)",
        concurrent: 2,
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
