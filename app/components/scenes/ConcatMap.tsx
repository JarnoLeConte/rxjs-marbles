import { take } from "rxjs";
import { Run } from "~/components/Run";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import { boxed } from "~/observables/boxed";
import { frameTimer } from "~/observables/frameTimer";
import { box, numberToChar } from "~/utils";

export function ConcatMap() {
  const source$ = useNumberProducer(0, 5);

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
          project: (value) =>
            box(
              frameTimer(0, 1).pipe(take(3), boxed()),
              numberToChar(Number(value))
            ),
          displayText: "map((x) => ...),",
        },
        tail: {
          part: Part.ConcatAll,
          tail: {
            part: Part.Subscriber,
          },
        },
      },
    },
  };

  return <Run track={track} />;
}
