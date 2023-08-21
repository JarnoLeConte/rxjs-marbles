import { useObservable } from "observable-hooks";
import { useMemo } from "react";
import { range } from "rxjs";
import { Run } from "~/components/Run";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Boxed, Track, Value } from "~/types";

export function Concat() {
  const A$ = useObservable<Boxed<Value>>(() => range(1, 3).pipe(boxed()));
  const B$ = useObservable<Boxed<Value>>(() => range(1, 3).pipe(boxed()));

  const trackA: Track = useMemo(
    () => ({
      part: Part.Producer,
      props: {
        source$: A$,
        displayText: "A (1, 2, 3)",
      },
      tail: {
        part: Part.Ramp,
        tail: null,
      },
    }),
    [A$]
  );

  const trackB: Track = useMemo(
    () => ({
      part: Part.Producer,
      props: {
        source$: B$,
        displayText: "B (1, 2, 3)",
      },
      tail: {
        part: Part.Ramp,
        tail: {
          part: Part.Straight,
          tail: null,
        },
      },
    }),
    [B$]
  );

  const track: Track = useMemo(
    () => ({
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
    }),
    [trackA, trackB]
  );

  return <Run track={track} />;
}
