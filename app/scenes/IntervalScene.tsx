import { useNumberProducer } from "~/hooks/useNumberProducer";
import type { Track } from "~/types";
import { render } from "~/track/render";
import { TrackSegment } from "~/track/segements";

export function IntervalScene() {
  const source$ = useNumberProducer();

  const track: Track = {
    segment: TrackSegment.Producer,
    props: {
      source$,
    },
    next: {
      segment: TrackSegment.Subscriber,
    },
  };

  return render(track);
}
