import { Part } from "~/components/track/parts";
import { render } from "~/components/track/render";
import { useObservableProducer } from "~/hooks/useObservableProducer";
import type { Track } from "~/types";

export function Test() {
  // const source$ = useNumberProducer();
  const A$ = useObservableProducer("A");
  const B$ = useObservableProducer("E");

  const trackA: Track = {
    part: Part.Producer,
    props: {
      source$: A$,
    },
    next: {
      part: Part.Ramp,
      next: null,
    },
  };

  const trackB: Track = {
    part: Part.Producer,
    props: {
      source$: B$,
    },
    next: {
      part: Part.Ramp,
      next: null,
    },
  };

  const track: Track = {
    part: Part.Concat,
    incoming: [trackA, trackB],
    next: {
      part: Part.Subscriber,
    },
  };

  return render(track);
}
