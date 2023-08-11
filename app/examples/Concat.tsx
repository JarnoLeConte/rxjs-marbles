import { useMemo } from "react";
import { concatWith, ignoreElements } from "rxjs";
import { Render } from "~/components/Render";
import { Part } from "~/components/track/parts";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import type { Track } from "~/types";

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
    next: {
      part: Part.Ramp,
      next: null,
    },
  };

  const trackB: Track = {
    part: Part.Producer,
    props: {
      source$: newB$,
      displayText: "B",
    },
    next: {
      part: Part.Ramp,
      next: {
        part: Part.Straight,
        next: null,
      },
    },
  };

  const track: Track = {
    part: Part.Concat,
    incoming: [trackA, trackB],
    props: {
      displayText: "concat(A, B)",
    },
    next: {
      part: Part.Subscriber,
      props: {
        displayText: ".subscribe(...)",
      },
    },
  };

  return <Render track={track} />;
}
