import { useObservable } from "observable-hooks";
import { map, timer } from "rxjs";
import { Run } from "~/components/Run";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Boxed, Track, Value } from "~/types";

export function Partition() {
  const source$ = useObservable<Boxed<Value>>(() =>
    timer(0, 3000).pipe(
      map((x) => x + 1),
      boxed()
    )
  );

  const track: Track = {
    part: Part.Producer,
    props: {
      source$,
    },
    tail: {
      part: Part.Ramp,
      tail: {
        part: Part.Partition,
        props: {
          predicate: (value) => Number(value) % 2 === 0,
          displayText: "isEven?",
          trueLabel: "true",
          falseLabel: "false",
        },
        trueTail: {
          part: Part.DownHill,
          tail: {
            part: Part.Subscriber,
          },
        },
        falseTail: {
          part: Part.Ramp,
          tail: {
            part: Part.Subscriber,
          },
        },
      },
    },
  };

  return <Run track={track} />;
}
