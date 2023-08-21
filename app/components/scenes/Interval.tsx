import { useObservable } from "observable-hooks";
import { interval } from "rxjs";
import { Run } from "~/components/Run";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Boxed, Track, Value } from "~/types";

export function Interval() {
  const source$ = useObservable<Boxed<Value>>(() =>
    interval(2000).pipe(boxed())
  );

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

  return <Run track={track} />;
}
