import { timer } from "rxjs";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Track } from "~/types";

const source$ = timer(0, 2000).pipe(boxed());

const track: Track = {
  part: Part.Producer,
  props: {
    source$,
    displayText: "interval(2s)",
  },
  tail: {
    part: Part.DownHill,
    tail: {
      part: Part.Subscriber,
    },
  },
};

export default {
  main: track,
};
