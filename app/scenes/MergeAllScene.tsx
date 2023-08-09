import { useObservableProducer } from "~/hooks/useObservableProducer";
import { render } from "~/track/render";
import type { Track } from "~/track/parts";
import { Part } from "~/track/parts";

export function MergeAllScene() {
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
