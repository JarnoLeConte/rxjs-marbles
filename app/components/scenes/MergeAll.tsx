import { useObservable } from "observable-hooks";
import { map, of, range } from "rxjs";
import { Run } from "~/components/Run";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import { delayInBetween } from "~/observables/delayInBetween";
import type { Boxed, Value } from "~/types";

export function MergeAll() {
  const source$ = useObservable<Boxed<Value>>(() =>
    of("A", "B", "C").pipe(
      delayInBetween(3000),
      map((label) => ({
        label,
        value: range(1, 3).pipe(delayInBetween(2000), boxed()),
      }))
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
        part: Part.MergeAll,
        tail: {
          part: Part.DownHill,
          tail: {
            part: Part.Subscriber,
          },
        },
      },
    },
  };

  return <Run track={track} />;
}
