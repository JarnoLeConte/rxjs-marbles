import { map, of, range } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { delayInBetween } from "~/observables/delayInBetween";
import { store } from "~/store";
import { Color, box } from "~/utils";

const source$ = of("A", "B", "C").pipe(
  delayInBetween(2300),
  map((label) =>
    box({
      label,
      value: store.getState().getTrackObservable(label), // TODO: distinguish when being used in `build()` or `observable()`
      color: store.getState().getTrackColor(label),
    })
  )
);

const trackA: Track = {
  color: Color.Red,
  part: Part.Producer,
  props: {
    source$: range(1, 4).pipe(boxed({ color: Color.Red })),
    displayText: "(1, 2, 3, 4)",
    sourceCode: {
      imports: ["range"],
      code: `range(1, 4)`,
    },
  },
  tail: {
    part: Part.PreviewObserver,
    props: { displayText: "A" },
  },
};

const trackB: Track = {
  color: Color.Green,
  part: Part.Producer,
  props: {
    source$: range(1, 7).pipe(boxed({ color: Color.Green })),
    displayText: "(1, 2, 3, 4, 5, 6, 7)",
    sourceCode: {
      imports: ["range"],
      code: `range(1, 7)`,
    },
  },
  tail: {
    part: Part.PreviewObserver,
    props: { displayText: "B" },
  },
};

const trackC: Track = {
  color: Color.Blue,
  part: Part.Producer,
  props: {
    source$: range(1, 3).pipe(boxed({ color: Color.Blue })),
    displayText: "(1, 2, 3)",
    sourceCode: {
      imports: ["range"],
      code: `range(1, 3)`,
    },
  },
  tail: {
    part: Part.PreviewObserver,
    props: { displayText: "C" },
  },
};

const track: Track = {
  part: Part.Producer,
  props: {
    source$,
    displayText: "(A, B, C)",
    sourceCode: {
      imports: ["of", "range"],
      code: [
        `const a$ = range(1, 4)`,
        `const b$ = range(1, 7)`,
        `const c$ = range(1, 3)`,
        `of(a$, b$, c$)`,
      ].join(";\n\n"),
    },
  },
  tail: {
    part: Part.Ramp,
    tail: {
      part: Part.MergeAll,
      props: {
        concurrent: 2,
        displayText: "mergeAll(2)",
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
  A: trackA,
  B: trackB,
  C: trackC,
};
