import { useObservableProducer } from "~/hooks/useObservableProducer";
import { render } from "~/components/track/render";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";

export function SwitchAll() {
  const source$ = useObservableProducer();

  const track: Track = {
    part: Part.Producer,
    props: {
      source$,
    },
    tail: {
      part: Part.Ramp,
      tail: {
        part: Part.SwitchAll,
        tail: {
          part: Part.DownHill,
          tail: {
            part: Part.Subscriber,
          },
        },
      },
    },
  };

  return render(track);
}
