import { useObservableProducer } from "~/hooks/useObservableProducer";
import type { Track } from "~/types";
import { render } from "~/track/render";
import { TrackSegment } from "~/track/segements";

export function TestScene() {
  // const source$ = useNumberProducer();
  const A$ = useObservableProducer("A");
  const B$ = useObservableProducer("E");

  const trackA: Track = {
    segment: TrackSegment.Producer,
    props: {
      source$: A$,
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
    },
    next: {
      segment: TrackSegment.Ramp,
      next: null,
    },
  };

  const track: Track = {
    segment: TrackSegment.Merge,
    incoming: [trackA, trackB],
    next: {
      segment: TrackSegment.Subscriber,
    },
  };

  return render(track);
}
