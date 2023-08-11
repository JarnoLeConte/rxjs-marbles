import type { Track } from "~/types";
import { Run } from "~/components/Run";
import { Part } from "~/components/track/parts";
import { useNumberProducer } from "~/hooks/useNumberProducer";

export function Test() {
  const A$ = useNumberProducer(1);
  const B$ = useNumberProducer(6);

  const trackA: Track = {
    part: Part.Producer,
    props: {
      name: "A",
      source$: A$,
      displayText: "A",
    },
    next: {
      part: Part.Ramp,
      next: null,
    },
  };

  const trackB: Track = {
    part: Part.Producer,
    props: {
      name: "B",
      source$: B$,
      displayText: "B",
    },
    next: {
      part: Part.Ramp,
      next: {
        part: Part.Straight,
        next: null,
      },
    },
  };

  const track: Track = {
    part: Part.Merge,
    incoming: [trackA, trackB],
    props: {
      displayText: "merge(A, B)",
    },
    next: {
      part: Part.Subscriber,
      props: {
        displayText: ".subscribe(...)",
      },
    },
  };

  return <Run track={track} />;
}
