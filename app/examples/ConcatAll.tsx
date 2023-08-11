import { useObservableProducer } from "~/hooks/useObservableProducer";
import { render } from "~/components/track/render";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";

export function ConcatAll() {
  const source$ = useObservableProducer();

  const track: Track = {
    part: Part.Producer,
    props: {
      source$,
    },
    tail: {
      part: Part.Ramp,
      tail: {
        part: Part.ConcatAll,
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
