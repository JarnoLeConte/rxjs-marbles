import { useObservable } from "observable-hooks";
import { map, timer } from "rxjs";
import { Run } from "~/components/Run";
import { Part } from "~/components/track/parts";
import { boxed } from "~/observables/boxed";
import type { Boxed, Track, Value } from "~/types";
import { box } from "~/utils";

export function Map() {
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
        part: Part.Map,
        props: {
          project: (value) => box(Number(value) * 2),
          displayText: "map((x) => x * 2),",
        },
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
