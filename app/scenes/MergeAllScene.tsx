import { useObservableProducer } from "~/hooks/useObservableProducer";
import { render } from "~/track/render";
import type { Track } from "~/track/segements";
import { TrackSegment } from "~/track/segements";

export function MergeAllScene() {
  const source$ = useObservableProducer();

  const track: Track = {
    segment: TrackSegment.Producer,
    props: {
      source$,
    },
    next: {
      segment: TrackSegment.Ramp,
      next: {
        segment: TrackSegment.MergeAll,
        next: {
          segment: TrackSegment.DownHill,
          next: {
            segment: TrackSegment.Subscriber,
          },
        },
      },
    },
  };

  return render(track);
}
