import { useObservable } from "observable-hooks";
import { fromEvent, map } from "rxjs";
import { Run } from "~/components/Run";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { box } from "~/utils";

export function FromEvent() {
  const click$ = useObservable(() =>
    fromEvent<MouseEvent>(document, "click").pipe(map(() => box("{click}")))
  );

  const keyboard$ = useObservable(() =>
    fromEvent<KeyboardEvent>(window, "keyup").pipe(
      map((event) => box(event.key))
    )
  );

  const trackA: Track = {
    part: Part.Producer,
    props: {
      source$: click$,
      displayText: "click$.pipe(",
    },
    tail: {
      part: Part.Ramp,
      tail: {
        part: Part.Map,
        props: {
          project: (boxedValue, index) => box(index),
          displayText: `map((x, i) => i),`,
        },
        tail: null,
      },
    },
  };

  const trackB: Track = {
    part: Part.Producer,
    props: {
      source$: keyboard$,
      displayText: "keyboard$.pipe(",
    },
    tail: {
      part: Part.Ramp,
      tail: {
        part: Part.DownHill,
        tail: null,
      },
    },
  };

  const track: Track = {
    part: Part.Merge,
    incoming: [trackA, trackB],
    tail: {
      part: Part.Subscriber,
    },
  };

  return <Run track={track} />;
}
