import { useEffect } from "react";
import { delayWhen } from "rxjs";
import { Part } from "~/components/track/parts";
import { reactive } from "~/components/track/reactive";
import { render } from "~/components/track/render";
import { useNumberProducer } from "~/hooks/useNumberProducer";
import { frame$ } from "~/observables/frame$";
import type { Track } from "~/types";

export function Test() {
  const A$ = useNumberProducer(1);
  const B$ = useNumberProducer(6);

  const trackA: Track = {
    part: Part.Producer,
    props: {
      source$: A$,
      displayText: "A",
    },
    tail: {
      part: Part.Ramp,
      tail: null,
    },
  };

  const trackB: Track = {
    part: Part.Producer,
    props: {
      source$: B$,
      displayText: "B",
    },
    tail: {
      part: Part.Ramp,
      tail: {
        part: Part.Straight,
        tail: null,
      },
    },
  };

  const track: Track = {
    part: Part.Merge,
    incoming: [trackA, trackB],
    props: {
      displayText: "merge(A, B)",
    },
    tail: {
      part: Part.Subscriber,
      props: {
        displayText: ".subscribe(...)",
      },
    },
  };

  useEffect(() => {
    reactive(track)
      .pipe(delayWhen(() => frame$))
      .subscribe(console.log);
  }, [A$, B$]);

  return render(track);
}
