import { Run } from "~/components/Run";
import type { Track } from "~/types";
import { Part } from "~/components/track/parts";
import { useObservableProducer } from "~/hooks/useObservableProducer";

export function ConcatAll() {
  const A$ = useObservableProducer();

  const track: Track = {
    part: Part.Producer,
    props: {
      name: "A",
      source$: A$,
    },
    next: {
      part: Part.Ramp,
      next: {
        part: Part.ConcatAll,
        props: {
          name: "concatAll",
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

  return <Run track={track} />;
}
