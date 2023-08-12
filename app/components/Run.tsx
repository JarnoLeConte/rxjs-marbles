import { useEffect, useMemo } from "react";
import { concatWith } from "rxjs";
import { wait } from "~/observables/wait";
import { useStore } from "~/store";
import type { Track } from "./track/parts";
import { build } from "./track/track-builder";
import { frame$ } from "~/observables/frame$";

export function Run({ track }: { track: Track }) {
  const lastActivity = useStore((state) => state.lastActivity);
  const nextFrame = useStore((state) => state.nextFrame);

  // Build track
  const { observable, content } = useMemo(() => build(track), [track]);

  // Run observable
  useEffect(() => {
    const subscription = wait(0) // wait scene to setup
      .pipe(concatWith(observable))
      .subscribe(console.debug);
    return () => subscription.unsubscribe();
  }, [observable]);

  // Run frame timer
  useEffect(() => {
    const timer = setInterval(() => {
      console.debug("next frame");
      frame$.next();
      nextFrame();
    }, 1500);
    return () => clearInterval(timer);
  }, [lastActivity, nextFrame]);

  return content;
}
