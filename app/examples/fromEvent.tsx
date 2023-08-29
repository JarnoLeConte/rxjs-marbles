import { defer, fromEvent, map } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { box } from "~/utils";

const click$ = defer(() => fromEvent<MouseEvent>(document, "click")).pipe(
  map(() => box({ value: "{click}" }))
);

const keyboard$ = defer(() => fromEvent<KeyboardEvent>(window, "keyup")).pipe(
  map((event) => box({ value: event.key }))
);

const trackA: Track = {
  part: Part.Producer,
  props: {
    source$: click$,
    displayText: "click",
    sourceCode: {
      imports: ["fromEvent", "map"],
      code: `fromEvent(document, "click").pipe(map(() => "{click}"))`,
    },
  },
  tail: {
    part: Part.Ramp,
    tail: {
      part: Part.Map,
      props: {
        project: ({ color }, index) => box({ value: index, color }),
        projectionCode: `(value, index) => index`,
        displayText: `index`,
      },
      tail: null,
    },
  },
};

const trackB: Track = {
  part: Part.Producer,
  props: {
    source$: keyboard$,
    displayText: "keyup",
    sourceCode: {
      imports: ["fromEvent"],
      code: `fromEvent(document, "keyup").pipe(map((event) => event.key))`,
    },
  },
  tail: {
    part: Part.Ramp,
    tail: {
      part: Part.DownHill,
      tail: null,
    },
  },
};

const track: Track = {
  part: Part.Merge,
  incoming: [trackA, trackB],
  tail: {
    part: Part.Subscriber,
  },
};

export default {
  main: track,
};
