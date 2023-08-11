import { take } from "rxjs";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import { frameTimer } from "~/observables/frameTimer";
import { render } from "~/components/track/render";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import type { Value } from "~/types";
import { numberToChar, tag } from "~/utils";

export function ConcatMap() {
  const source$ = useNumberProducer(0, 3);

  const track: Track = {
    part: Part.Producer,
    props: {
      source$,
    },
    tail: {
      part: Part.Ramp,
      tail: {
        part: Part.Map,
        props: {
          project: (value: Value) =>
            tag(numberToChar(Number(value)), frameTimer(0, 1).pipe(take(3))),
          displayText: "map((x) => ...),",
        },
        tail: {
          part: Part.DownHill,
          tail: {
            part: Part.ConcatAll,
            tail: {
              part: Part.Subscriber,
            },
          },
        },
      },
    },
  };

  return render(track);
}
