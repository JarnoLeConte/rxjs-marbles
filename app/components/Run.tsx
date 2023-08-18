import { useEffect, useRef } from "react";
import { concatWith } from "rxjs";
import { frame$ } from "~/observables/frame$";
import { wait } from "~/observables/wait";
import { useStore } from "~/store";
import type { ObservableBuilder } from "~/types";
import { Build } from "./Build";
import type { Track } from "./track/parts";

export function Run({ track }: { track: Track }) {
  const reset = useStore((state) => state.reset);
  const lastActivity = useStore((state) => state.lastActivity);
  const nextFrame = useStore((state) => state.nextFrame);

  // Reset previous runners
  useEffect(() => {
    reset();
  }, [reset]);

  // Run frame timer
  useEffect(() => {
    const timer = setInterval(() => {
      console.debug("next frame");
      frame$.next();
      nextFrame();
    }, 1500);
    return () => clearInterval(timer);
  }, [lastActivity, nextFrame]);

  const ref = useRef<ObservableBuilder>(null!);

  useEffect(() => {
    const subscription = wait(0) // wait scene to setup
      .pipe(concatWith(ref.current.build()))
      .subscribe(console.debug);
    return () => subscription.unsubscribe();
  }, [track]);

  return <Build ref={ref} track={track} />;
}
