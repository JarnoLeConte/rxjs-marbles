import { interval } from "rxjs";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Track } from "~/types";

const source$ = interval(2000).pipe(boxed());

const track: Track = {
  part: Part.Producer,
  props: {
    source$,
    displayText: "interval(2000)",
  },
  tail: {
    part: Part.DownHill,
    tail: {
      part: Part.Subscriber,
      props: {
        displayText: ".subscribe(...)",
      },
    },
  },
};

export default {
  main: track,
};
