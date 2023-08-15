import { take } from "rxjs";
import { Run } from "~/components/Run";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import { frameTimer } from "~/observables/frameTimer";
import type { Value } from "~/types";
import { numberToChar, tag } from "~/utils";

export function Test() {
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

  return <Run track={track} />;
}
