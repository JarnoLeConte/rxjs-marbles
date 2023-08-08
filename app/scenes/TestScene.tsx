import { useObservableProducer } from "~/hooks/useObservableProducer";
import type { Track } from "~/types";
import { render } from "~/track/render";
import { TrackSegment } from "~/track/segements";

export function TestScene() {
  // const source$ = useNumberProducer();
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
            segment: TrackSegment.LeftShift,
            next: {
              segment: TrackSegment.Subscriber,
            },
          },
        },
      },
    },
  };

  return render(track);
}
