import { useNumberProducer } from "~/hooks/useNumberProducer";
import type { Track, Value } from "~/types";
import { render } from "~/track/render";
import { TrackSegment } from "~/track/segements";

export function MapScene() {
  const source$ = useNumberProducer();

  const track: Track = {
    segment: TrackSegment.Producer,
    props: {
      source$,
    },
    next: {
      segment: TrackSegment.Ramp,
      next: {
        segment: TrackSegment.Map,
        props: {
          project: (value: Value) => Number(value) * 2,
          displayText: "map((x) => x * 2),",
        },
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
