import { useNumberProducer } from "~/hooks/useNumberProducer";
import type { Track } from "~/types";
import { render } from "~/components/track/render";
import { Part } from "~/components/track/parts";

export function Interval() {
  const source$ = useNumberProducer();

  const track: Track = {
    part: Part.Producer,
    props: {
      source$,
      displayText: "interval()",
    },
    tail: {
      part: Part.DownHill,
      tail: {
        part: Part.Subscriber,
        props: {
          displayText: ".subscribe(...)",
        },
      },
    },
  };

  return render(track);
}
