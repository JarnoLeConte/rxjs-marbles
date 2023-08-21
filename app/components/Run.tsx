import { useEffect, useRef } from "react";
import { concatWith } from "rxjs";
import { wait } from "~/observables/wait";
import { useStore } from "~/store";
import type { ObservableBuilder } from "~/types";
import { Build } from "./Build";
import type { Track } from "./track/parts";

export function Run({ track }: { track: Track }) {
  const reset = useStore((state) => state.reset);

  // Reset previous runners
  useEffect(() => {
    reset();
  }, [reset]);

  const ref = useRef<ObservableBuilder>(null!);

  useEffect(() => {
    const subscription = wait(0) // wait scene to setup
      .pipe(concatWith(ref.current.build()))
      .subscribe(console.debug);
    return () => subscription.unsubscribe();
  }, [track]);

  return <Build ref={ref} track={track} />;
}
