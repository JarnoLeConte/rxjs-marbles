import { range } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { delayInBetween } from "~/observables/delayInBetween";
import { box, numberToChar } from "~/utils";

const source$ = range(0, 4).pipe(delayInBetween(3000), boxed());

const track: Track = {
  part: Part.Producer,
  props: {
    source$,
  },
  tail: {
    part: Part.Ramp,
    tail: {
      part: Part.Map,
      props: {
        project: (value) =>
          box(range(1, 3).pipe(boxed()), numberToChar(Number(value))),
        displayText: "map((x) => ...),",
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
};
