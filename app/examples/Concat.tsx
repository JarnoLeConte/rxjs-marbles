import { useNumberProducer } from "~/hooks/useNumberProducer";
import { render } from "~/components/track/render";
import { Part } from "~/components/track/parts";
import type { Track } from "~/types";
import { concatWith, ignoreElements } from "rxjs";
import { useMemo } from "react";

export function Concat() {
  const A$ = useNumberProducer(1, 3);
  const B$ = useNumberProducer(1, 3);
  const newB$ = useMemo(
    () => A$.pipe(ignoreElements(), concatWith(B$)),
    [A$, B$]
  );

  const trackA: Track = {
    part: Part.Producer,
    props: {
      source$: A$,
      displayText: "A",
    },
    tail: {
      part: Part.Ramp,
      tail: null,
    },
  };

  const trackB: Track = {
    part: Part.Producer,
    props: {
      source$: newB$,
      displayText: "B",
    },
    tail: {
      part: Part.Ramp,
      tail: {
        part: Part.Straight,
        tail: null,
      },
    },
  };

  const track: Track = {
    part: Part.Concat,
    incoming: [trackA, trackB],
    props: {
      displayText: "concat(A, B)",
    },
    tail: {
      part: Part.Subscriber,
      props: {
        displayText: ".subscribe(...)",
      },
    },
  };

  return render(track);
}
