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
      displayText: "interval()",
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
