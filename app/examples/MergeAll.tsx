import { useObservableProducer } from "~/hooks/useObservableProducer";
import { render } from "~/components/track/render";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";

export function MergeAll() {
  const source$ = useObservableProducer();

  const track: Track = {
    part: Part.Producer,
    props: {
      source$,
    },
    next: {
      part: Part.Ramp,
      next: {
        part: Part.MergeAll,
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
