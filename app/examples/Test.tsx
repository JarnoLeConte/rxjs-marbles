import { useEffect } from "react";
import { delayWhen } from "rxjs";
import { Render } from "~/components/Render";
import { Part } from "~/components/track/parts";
import { reactive } from "~/components/track/reactive";
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
    next: {
      part: Part.Ramp,
      next: null,
    },
  };

  const trackB: Track = {
    part: Part.Producer,
    props: {
      source$: B$,
      displayText: "B",
    },
    next: {
      part: Part.Ramp,
      next: {
        part: Part.Straight,
        next: null,
      },
    },
  };

  const track: Track = {
    part: Part.Merge,
    incoming: [trackA, trackB],
    props: {
      displayText: "merge(A, B)",
    },
    next: {
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

  return <Render track={track} />;
}
