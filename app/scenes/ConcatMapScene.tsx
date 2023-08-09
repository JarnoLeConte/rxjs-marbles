import { take } from "rxjs";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import { frameTimer } from "~/rxjs/frameTimer";
import { render } from "~/track/render";
import type { Track } from "~/track/parts";
import { Part } from "~/track/parts";
import type { Value } from "~/types";
import { numberToChar, tag } from "~/utils";

export function ConcatMapScene() {
  const source$ = useNumberProducer(0, 3);

  const track: Track = {
    part: Part.Producer,
    props: {
      source$,
    },
    next: {
      part: Part.Ramp,
      next: {
        part: Part.Map,
        props: {
          project: (value: Value) =>
            tag(numberToChar(Number(value)), frameTimer(0, 1).pipe(take(3))),
          displayText: "map((x) => ...),",
        },
        next: {
          part: Part.DownHill,
          next: {
            part: Part.ConcatAll,
            next: {
              part: Part.Subscriber,
            },
          },
        },
      },
    },
  };

  return render(track);
}
