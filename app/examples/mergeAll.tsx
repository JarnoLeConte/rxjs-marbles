import { map, of, range } from "rxjs";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { delayInBetween } from "~/observables/delayInBetween";
import { box } from "~/utils";

const source$ = of("A", "B", "C", "D", "E").pipe(
  delayInBetween(3000),
  map((label) =>
    box({
      label,
      value: range(1, 3).pipe(delayInBetween(2300), boxed()),
    })
  )
);

const track: Track = {
  part: Part.Producer,
  props: {
    source$,
    displayText: "(A, B, C, D, E)",
  },
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
};

export default {
  main: track,
};
