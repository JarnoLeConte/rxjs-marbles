import { useMemo } from "react";
import { from, map, switchMap } from "rxjs";
import { Run } from "~/components/Run";
import { Part } from "~/components/track/parts";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import { frameTimer } from "~/observables/frameTimer";
import type { Track } from "~/types";

export function CombineLatest() {
  const A$ = useNumberProducer(10);
  const B$ = useMemo(
    () =>
      frameTimer(0, 1).pipe(
        map((x) => x * 2 + 1),
        switchMap((x) => from([x, x + 1]))
      ),
    []
  );

  const trackA: Track = {
    part: Part.Producer,
    props: {
      source$: A$,
      displayText: "A",
    },
    tail: null,
  };

  const trackB: Track = {
    part: Part.Producer,
    props: {
      source$: B$,
      displayText: "B",
    },
    tail: {
      part: Part.Ramp,
      tail: null,
    },
  };

  const track: Track = {
    part: Part.CombineLatest,
    incoming: [trackA, trackB],
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

  return <Run track={track} />;
}
