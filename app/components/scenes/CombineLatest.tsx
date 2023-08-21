import { useObservable } from "observable-hooks";
import { from, map, switchMap, timer } from "rxjs";
import { Run } from "~/components/Run";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Boxed, Track, Value } from "~/types";

export function CombineLatest() {
  const A$ = useObservable<Boxed<Value>>(() =>
    timer(0, 9000).pipe(
      map((x) => x + 10),
      boxed()
    )
  );
  const B$ = useObservable<Boxed<Value>>(() =>
    timer(0, 9000).pipe(
      map((x) => x * 2 + 1),
      switchMap((x) => from([x, x + 1]).pipe(boxed()))
    )
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
