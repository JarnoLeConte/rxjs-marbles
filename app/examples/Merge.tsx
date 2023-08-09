import { useNumberProducer } from "~/hooks/useNumberProducer";
import { render } from "~/components/track/render";
import { Part } from "~/components/track/parts";
import type { Track } from "~/types";

export function Merge() {
  const A$ = useNumberProducer(1);
  const B$ = useNumberProducer(6);

  const trackA: Track = {
    part: Part.Producer,
    props: {
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

  return render(track);
}
