import { useNumberProducer } from "~/hooks/useNumberProducer";
import { render } from "~/track/render";
import { TrackSegment } from "~/track/segements";
import type { Track } from "~/types";

export function MergeScene() {
  const A$ = useNumberProducer(1);
  const B$ = useNumberProducer(6);

  const trackA: Track = {
    segment: TrackSegment.Producer,
    props: {
      source$: A$,
      displayText: "A",
    },
    next: {
      segment: TrackSegment.Ramp,
      next: null,
    },
  };

  const trackB: Track = {
    segment: TrackSegment.Producer,
    props: {
      source$: B$,
      displayText: "B",
    },
    next: {
      segment: TrackSegment.Ramp,
      next: {
        segment: TrackSegment.Straight,
        next: null,
      },
    },
  };

  const track: Track = {
    segment: TrackSegment.Merge,
    incoming: [trackA, trackB],
    props: {
      displayText: "merge(A, B)",
    },
    next: {
      segment: TrackSegment.Subscriber,
      props: {
        displayText: ".subscribe(...)",
      },
    },
  };

  return render(track);
}
