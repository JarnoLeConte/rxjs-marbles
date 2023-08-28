import { timer } from "rxjs";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Track } from "~/types";
import { box } from "~/utils";

const source$ = timer(0, 3000).pipe(boxed());

const track: Track = {
  part: Part.Producer,
  props: {
    source$,
    displayText: "interval(3s)",
  },
  tail: {
    part: Part.Ramp,
    tail: {
      part: Part.Map,
      props: {
        project: (value) => box({ value: Number(value) * 2 }),
        displayText: "map",
        projectionText: "2x",
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
