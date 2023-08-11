import { Render } from "~/components/Render";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { useObservableProducer } from "~/hooks/useObservableProducer";

export function SwitchAll() {
  const source$ = useObservableProducer();

  const track: Track = {
    part: Part.Producer,
    props: {
      source$,
    },
    next: {
      part: Part.Ramp,
      next: {
        part: Part.SwitchAll,
        next: {
          part: Part.DownHill,
          next: {
            part: Part.Subscriber,
          },
        },
      },
    },
  };

  return <Render track={track} />;
}
