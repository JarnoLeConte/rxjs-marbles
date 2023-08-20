import { Run } from "~/components/Run";
import type { Track } from "~/components/track/parts";
import { Part } from "~/components/track/parts";
import { useObservableProducer } from "~/hooks/useObservableProducer";

export function ConcatAll() {
  const source$ = useObservableProducer();

  const track: Track = {
    part: Part.Producer,
    props: {
      source$,
    },
    tail: {
      part: Part.ConcatAll,
      tail: {
        part: Part.DownHill,
        tail: {
          part: Part.Subscriber,
        },
      },
    },
  };

  return <Run track={track} />;
}
