import { useMemo } from "react";
import { fromEvent, map } from "rxjs";
import { Run } from "~/components/Run";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import type { Value } from "~/types";

export function FromEvent() {
  const source$ = useMemo(
    () => fromEvent(document, "click").pipe(map(() => "{click}")),
    []
  );

  const track: Track = {
    part: Part.Producer,
    props: {
      source$,
      displayText: "click$.pipe(",
    },
    tail: {
      part: Part.Ramp,
      tail: {
        part: Part.Map,
        props: {
          project: (value: Value, index: number) => index,
          displayText: `map((x, i) => i),`,
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
