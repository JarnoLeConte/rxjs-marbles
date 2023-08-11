import { take } from "rxjs";
import { Render } from "~/components/Render";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import { frameTimer } from "~/observables/frameTimer";
import type { Value } from "~/types";
import { numberToChar, tag } from "~/utils";

export function ConcatMap() {
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

  return <Render track={track} />;
}
