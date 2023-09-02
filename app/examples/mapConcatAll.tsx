import { of, range } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { delayInBetween } from "~/observables/delayInBetween";
import { store } from "~/store";
import { Color, box, numberToChar } from "~/utils";

const trackA: Track = {
  color: Color.Red,
  part: Part.Producer,
  props: {
    source$: range(1, 3).pipe(boxed({ color: Color.Red })),
    displayText: "(1, 2, 3)",
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
    source$: range(1, 3).pipe(boxed({ color: Color.Green })),
    displayText: "(1, 2, 3)",
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
  },
  tail: {
    part: Part.PreviewObserver,
    props: { displayText: "C" },
  },
};

const track: Track = {
  part: Part.Producer,
  props: {
    source$: of(1, 2, 3).pipe(delayInBetween(3000), boxed({ color: "white" })),
    displayText: "(1, 2, 3)",
  },
  tail: {
    part: Part.Ramp,
    tail: {
      part: Part.Map,
      props: {
        project: ({ value }) => {
          const label = numberToChar(Number(value));
          return box({
            label,
            value: store.getState().getTrackObservable(label), // TODO: distinguish when being used in `build()` or `observable()`
            color: store.getState().getTrackColor(label),
          });
        },
        displayText: "map",
        projectionText: `1 —> A
2 —> B
3 —> C`,
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
  A: trackA,
  B: trackB,
  C: trackC,
};
