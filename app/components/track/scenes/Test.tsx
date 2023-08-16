import { useMemo } from "react";
import { Run } from "~/components/Run";
import { Part } from "~/components/track/parts";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import type { Track, Value } from "~/types";

export function Test() {
  const A$ = useNumberProducer(1, 3);
  const B$ = useNumberProducer(1, 3);

  const trackA: Track = useMemo(
    () => ({
      part: Part.Producer,
      props: {
        source$: A$,
        displayText: "A (1, 2, 3)",
      },

      tail: {
        part: Part.Ramp,
        tail: {
          part: Part.Map,
          props: {
            project: (value: Value) => Number(value) * 2,
            displayText: ".map((value) => value * 2)",
          },
          tail: null,
        },
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
