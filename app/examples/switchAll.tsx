import { map, of, range } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { delayInBetween } from "~/observables/delayInBetween";
import { store } from "~/store";
import { Color, box } from "~/utils";

const source$ = of("A", "B", "C").pipe(
  delayInBetween(4800),
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
      imports: ["range", "delayWhen", "interval"],
      code: `range(1, 4).pipe(delayWhen((_, i) => interval(i * 1000)))`,
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
    source$: range(1, 4).pipe(boxed({ color: Color.Green })),
    displayText: "(1, 2, 3, 4)",
    sourceCode: {
      imports: ["range", "delayWhen", "interval"],
      code: `range(1, 4).pipe(delayWhen((_, i) => interval(i * 1000)))`,
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
    source$: range(1, 4).pipe(boxed({ color: Color.Blue })),
    displayText: "(1, 2, 3, 4)",
    sourceCode: {
      imports: ["range", "delayWhen", "interval"],
      code: `range(1, 4).pipe(delayWhen((_, i) => interval(i * 1000)))`,
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
      imports: ["of", "range", "delayWhen", "interval"],
      code: [
        `const a$ = range(1, 4).pipe(delayWhen((_, i) => interval(i * 1000)))`,
        `const b$ = range(1, 4).pipe(delayWhen((_, i) => interval(i * 1000)))`,
        `const c$ = range(1, 4).pipe(delayWhen((_, i) => interval(i * 1000)))`,
        `of(a$, b$, c$).pipe(delayWhen((_, i) => interval(i * 2500)))`,
      ].join(";\n\n"),
    },
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
  A: trackA,
  B: trackB,
  C: trackC,
};
