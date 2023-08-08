import { take } from "rxjs";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import { frameTimer } from "~/rxjs/frameTimer";
import { render } from "~/track/render";
import type { Track } from "~/track/segements";
import { TrackSegment } from "~/track/segements";
import type { Value } from "~/types";
import { numberToChar, tag } from "~/utils";

export function ConcatMapScene() {
  const source$ = useNumberProducer(0, 3);

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
          project: (value: Value) =>
            tag(numberToChar(Number(value)), frameTimer(0, 1).pipe(take(3))),
          displayText: "map((x) => ...),",
        },
        next: {
          segment: TrackSegment.DownHill,
          next: {
            segment: TrackSegment.ConcatAll,
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
