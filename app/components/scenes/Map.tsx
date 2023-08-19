import { Run } from "~/components/Run";
import { Part } from "~/components/track/parts";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import type { Track } from "~/types";
import { box } from "~/utils";

export function Map() {
  const source$ = useNumberProducer();

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
          project: (value) => box(Number(value) * 2),
          displayText: "map((x) => x * 2),",
        },
        tail: {
          part: Part.DownHill,
          tail: {
            part: Part.Subscriber,
          },
        },
      },
    },
  };

  return <Run track={track} />;
}
