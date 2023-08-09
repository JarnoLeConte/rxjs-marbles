import { useNumberProducer } from "~/hooks/useNumberProducer";
import type { Track } from "~/types";
import { render } from "~/components/track/render";
import { Part } from "~/components/track/parts";

export function IntervalScene() {
  const source$ = useNumberProducer();

  const track: Track = {
    part: Part.Producer,
    props: {
      source$,
      displayText: "interval()",
    },
    next: {
      part: Part.Subscriber,
      props: {
        displayText: ".subscribe(...)",
      },
    },
  };

  return render(track);
}
