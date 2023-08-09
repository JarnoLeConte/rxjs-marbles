import { useNumberProducer } from "~/hooks/useNumberProducer";
import type { Track, Value } from "~/types";
import { render } from "~/components/track/render";
import { Part } from "~/components/track/parts";

export function Map() {
  const source$ = useNumberProducer();

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
          project: (value: Value) => Number(value) * 2,
          displayText: "map((x) => x * 2),",
        },
        next: {
          part: Part.DownHill,
          next: {
            part: Part.Subscriber,
          },
        },
      },
    },
  };

  return render(track);
}