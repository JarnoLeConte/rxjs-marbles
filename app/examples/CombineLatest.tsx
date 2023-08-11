import { Run } from "~/components/Run";
import { Part } from "~/components/track/parts";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import type { Track } from "~/types";

export function CombineLatest() {
  const A$ = useNumberProducer(1);
  const B$ = useNumberProducer(10);

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
      tail: {
        part: Part.Straight,
        tail: {
          part: Part.Straight,
          tail: null,
        },
      },
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
